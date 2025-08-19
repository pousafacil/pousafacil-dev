package com.appbank.outbox

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Component
import java.util.*

@Component
class OutboxService(
    private val jdbc: NamedParameterJdbcTemplate
) {
    fun enqueue(
        tenantId: UUID,
        aggregateType: String,
        aggregateId: String,
        eventType: String,
        payloadJson: String
    ) {
        val sql = """
            insert into outbox_events (id, tenant_id, aggregate_type, aggregate_id, event_type, payload)
            values (:id, :tenant_id, :aggregate_type, :aggregate_id, :event_type, cast(:payload as jsonb))
        """.trimIndent()
        val params = MapSqlParameterSource()
            .addValue("id", UUID.randomUUID())
            .addValue("tenant_id", tenantId)
            .addValue("aggregate_type", aggregateType)
            .addValue("aggregate_id", aggregateId)
            .addValue("event_type", eventType)
            .addValue("payload", payloadJson)

        jdbc.update(sql, params)
    }
}

