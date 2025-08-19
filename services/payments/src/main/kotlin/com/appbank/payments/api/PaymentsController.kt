package com.appbank.payments.api

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/payments")
@Validated
class PaymentsController {

    data class TransferRequest(
        @field:NotBlank val from_account_id: String,
        @field:NotBlank val to_account_id: String,
        @field:NotBlank @field:Pattern(regexp = "^\\d+\\.\\d{2}$") val amount: String,
        @field:NotBlank val currency: String,
        val description: String? = null
    )

    @PostMapping("/transfer")
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun transfer(
        @RequestHeader("Idempotency-Key") idempotencyKey: String,
        @RequestHeader("X-Tenant-Id") tenantId: String,
        @RequestBody request: TransferRequest
    ) {
        // Stub para orquestração futura via Saga
    }
}

