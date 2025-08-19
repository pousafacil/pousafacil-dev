rootProject.name = "appbank"

include(
    ":libs:common",
    ":libs:idempotency",
    ":libs:outbox",
    ":services:ledger",
    ":services:payments",
    ":services:pix",
)

