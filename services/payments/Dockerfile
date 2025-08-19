# syntax=docker/dockerfile:1.6

FROM gradle:8.7.0-jdk21 AS builder
WORKDIR /workspace
COPY . .
RUN gradle --no-daemon clean :services:payments:bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75"
COPY --from=builder /workspace/services/payments/build/libs/payments-*.jar /app/app.jar
EXPOSE 8082
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]

