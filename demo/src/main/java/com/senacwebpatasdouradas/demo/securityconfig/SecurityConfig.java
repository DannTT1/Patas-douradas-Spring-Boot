package com.senacwebpatasdouradas.demo.securityconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**","/usuarios",  "/swagger-ui/index.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**").permitAll() // 1. Permite o H2
                        .anyRequest().permitAll()
                )
                .formLogin(formLogin -> formLogin.disable())
                .csrf(csrf -> csrf.disable()
                )
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable) // 4. Permite iFrames
                )
                .httpBasic(Customizer.withDefaults()); // 5. Mantém o login pop-up

        return http.build();
    }
}