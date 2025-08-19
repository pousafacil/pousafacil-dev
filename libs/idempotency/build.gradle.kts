plugins {
    kotlin("jvm") version "1.9.24"
}

dependencies {
    implementation(project(":libs:common"))
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.3.3"))
    api("org.springframework.boot:spring-boot-starter-data-jdbc")
}

