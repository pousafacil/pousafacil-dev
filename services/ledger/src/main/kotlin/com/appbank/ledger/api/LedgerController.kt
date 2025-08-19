package com.appbank.ledger.api

import com.appbank.ledger.service.LedgerService
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal
import java.util.*

@RestController
@RequestMapping("/v1/ledger")
@Validated
class LedgerController(
    private val ledgerService: LedgerService
) {

    data class PostingRequest(
        @field:NotBlank val debit_account_id: String,
        @field:NotBlank val credit_account_id: String,
        @field:NotBlank @field:Pattern(regexp = "^\\d+\\.\\d{2}$") val amount: String,
        @field:NotBlank val currency: String,
        @field:NotBlank val reference_id: String,
        val metadata: Map<String, Any>? = null,
    )

    data class PostingResponse(val posting_id: String)

    @PostMapping("/postings")
    @ResponseStatus(HttpStatus.CREATED)
    fun createPosting(
        @RequestHeader("Idempotency-Key") idempotencyKey: String,
        @RequestHeader("X-Tenant-Id") tenantId: String,
        @RequestBody request: PostingRequest
    ): PostingResponse {
        val postingId = ledgerService.createPosting(
            tenantId = UUID.fromString(tenantId),
            idempotencyKey = idempotencyKey,
            debitAccountId = UUID.fromString(request.debit_account_id),
            creditAccountId = UUID.fromString(request.credit_account_id),
            amount = BigDecimal(request.amount),
            currency = request.currency,
            referenceId = request.reference_id,
            metadata = request.metadata
        )
        return PostingResponse(postingId.toString())
    }
}

