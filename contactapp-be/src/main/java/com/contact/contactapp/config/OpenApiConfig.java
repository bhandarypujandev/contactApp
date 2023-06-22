package com.contact.contactapp.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String SCHEME_NAME = "JWT_Token";

    @Bean
    public GroupedOpenApi authenticatedApi() {
        return GroupedOpenApi.builder()
            .group("Public")
            .packagesToScan("com.contact.contactapp.controller")
            .pathsToMatch("/api/**")
            .build();
    }

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
            .addSecurityItem(new SecurityRequirement().addList(SCHEME_NAME))
            .components(
                new Components()
                    .addSecuritySchemes(SCHEME_NAME,
                        new SecurityScheme()
                            .name(SCHEME_NAME)
                            .type(SecurityScheme.Type.HTTP)
                            .scheme("Bearer")
                            .bearerFormat("JWT")
                    )
            ).info(new Info().title("Contact").version("1.0"));
    }


}
