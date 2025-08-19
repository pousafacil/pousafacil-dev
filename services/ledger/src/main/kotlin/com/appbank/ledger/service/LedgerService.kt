package com.appbank.ledger.service

import com.appbank.idempotency.IdempotencyConflictException
import com.appbank.outbox.OutboxService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.util.*

@Service
class LedgerService(
    private val jdbc: NamedParameterJdbcTemplate,
    private val outbox: OutboxService,
    private val objectMapper: ObjectMapper
) {

    data class Posting(
        val id: UUID,
        val debitAccountId: UUID,
        val creditAccountId: UUID,
        val amount: BigDecimal,
        val currency: String,
        val referenceId: String,
        val idempotencyKey: String
    )

    @Transactional(isolation = Isolation.SERIALIZABLE)
    fun createPosting(
        tenantId: UUID,
        idempotencyKey: String,
        debitAccountId: UUID,
        creditAccountId: UUID,
        amount: BigDecimal,
        currency: String,
        referenceId: String,
        metadata: Map<String, Any>?
    ): UUID {
        require(amount > BigDecimal.ZERO) { "amount must be > 0" }
        require(currency == "BRL") { "currency must be BRL" }

        // Set tenant context for RLS
        jdbc.update("set local app.tenant_id = :tenant_id", MapSqlParameterSource().addValue("tenant_id", tenantId))

        val postingId = UUID.randomUUID()
        val params = MapSqlParameterSource()
            .addValue("id", postingId)
            .addValue("tenant_id", tenantId)
            .addValue("debit_account_id", debitAccountId)
            .addValue("credit_account_id", creditAccountId)
            .addValue("amount", amount)
            .addValue("currency", currency)
            .addValue("reference_id", referenceId)
            .addValue("event_type", "posting.recorded")
            .addValue("idempotency_key", idempotencyKey)

        try {
            val sql = """
                insert into postings (
                  id, tenant_id, debit_account_id, credit_account_id, amount, currency, reference_id, event_type, idempotency_key
                ) values (
                  :id, :tenant_id, :debit_account_id, :credit_account_id, :amount, :currency, :reference_id, :event_type, :idempotency_key
                )
            """.trimIndent()
            jdbc.update(sql, params)
        } catch (e: DataIntegrityViolationException) {
            throw IdempotencyConflictException("Duplicate idempotency key for tenant")
        }

        // Enqueue outbox event
        val payload = mapOf(
            "tenant_id" to tenantId.toString(),
            "posting_id" to postingId.toString(),
            "debit_account_id" to debitAccountId.toString(),
            "credit_account_id" to creditAccountId.toString(),
            "amount" to amount.toPlainString(),
            "currency" to currency,
            "reference_id" to referenceId,
            "metadata" to (metadata ?: emptyMap<String, Any>())
        )
        outbox.enqueue(
            tenantId = tenantId,
            aggregateType = "posting",
            aggregateId = postingId.toString(),
            eventType = "posting.recorded",
            payloadJson = objectMapper.writeValueAsString(payload)
        )

        return postingId
    }
}

