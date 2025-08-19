package com.appbank.ledger

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.appbank"]) 
class LedgerApplication

fun main(args: Array<String>) {
    runApplication<LedgerApplication>(*args)
}

