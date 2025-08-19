package com.appbank.common

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

@Configuration
class DataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource")
    fun dataSourceProperties(): DataSourceProperties = DataSourceProperties()

    @Bean
    fun dataSource(props: DataSourceProperties): DataSource = props.initializeDataSourceBuilder().build()

    @Bean
    fun namedParameterJdbcTemplate(dataSource: DataSource): NamedParameterJdbcTemplate = NamedParameterJdbcTemplate(dataSource)
}

