package com.appbank.ledger.api

import com.appbank.idempotency.IdempotencyConflictException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class RestExceptionHandler {

    data class ErrorResponse(val error: String)

    @ExceptionHandler(IdempotencyConflictException::class)
    fun handleIdempotency(e: IdempotencyConflictException): ResponseEntity<ErrorResponse> =
        ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorResponse(e.message ?: "conflict"))

    @ExceptionHandler(MethodArgumentNotValidException::class, IllegalArgumentException::class)
    fun handleBadRequest(e: Exception): ResponseEntity<ErrorResponse> =
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse(e.message ?: "bad_request"))
}

