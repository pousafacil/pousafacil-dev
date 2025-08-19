package com.appbank.pix.api

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/pix")
@Validated
class PixController {
    data class PixPaymentRequest(
        @field:NotBlank val source_account_id: String,
        val e2e_id: String? = null,
        val pix_key: String? = null,
        @field:NotBlank @field:Pattern(regexp = "^\\d+\\.\\d{2}$") val amount: String,
    )

    @PostMapping("/payments")
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun createPix(
        @RequestHeader("Idempotency-Key") idempotencyKey: String,
        @RequestHeader("X-Tenant-Id") tenantId: String,
        @RequestBody request: PixPaymentRequest
    ) {
        // Stub para orquestração PIX/SPI
    }
}

