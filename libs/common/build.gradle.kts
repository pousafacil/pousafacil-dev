plugins {
    kotlin("jvm") version "1.9.24"
}

dependencies {
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.3.3"))
    api("org.springframework.boot:spring-boot-starter")
    api("org.springframework.boot:spring-boot-starter-validation")
    api("io.micrometer:micrometer-tracing-bridge-otel")
    api("io.opentelemetry:opentelemetry-exporter-otlp")
}

