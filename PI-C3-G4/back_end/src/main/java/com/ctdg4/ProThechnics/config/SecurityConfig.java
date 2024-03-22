package com.ctdg4.ProThechnics.config;

import com.ctdg4.ProThechnics.auth.CustomAuthenticationEntryPoint;
import com.ctdg4.ProThechnics.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authRequests ->
                        authRequests
                                  .requestMatchers("/**").permitAll()
//                                //Endpoints authentication
//                                .requestMatchers("/api/products/**").permitAll()
//                                .requestMatchers("/api/features/**").permitAll()
//                                .requestMatchers("/api/categories/**").permitAll()
//                                .requestMatchers("/api/auth/**").permitAll()
//                                .requestMatchers("/api/storage/**").hasAnyRole("ADMIN","SUPERADMIN")
//                                .requestMatchers("/api/users/**").hasAnyRole("ADMIN","SUPERADMIN")
//
//                                //URLs authentication
//                                .requestMatchers("/home").permitAll()
//                                .requestMatchers("/login").permitAll()
//                                .requestMatchers("/detail*").permitAll()
//                                .requestMatchers("/FormLogin").permitAll()
//                                .requestMatchers("/registroUsuario").permitAll()
//                                .requestMatchers("/emailRegister").permitAll()
//                                .requestMatchers("/adminUsers*").hasRole("SUPERADMIN")
//                                .requestMatchers("/administracion").hasAnyRole("ADMIN","SUPERADMIN")
//                                .requestMatchers("/adminProducts").hasAnyRole("ADMIN","SUPERADMIN")
//                                .requestMatchers("/adminFeatures").hasAnyRole("ADMIN","SUPERADMIN")
//                                .requestMatchers("/adminCategories").hasAnyRole("ADMIN","SUPERADMIN")
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
