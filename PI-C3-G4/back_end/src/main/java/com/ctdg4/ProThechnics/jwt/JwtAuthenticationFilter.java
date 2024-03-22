package com.ctdg4.ProThechnics.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String token = getTokenFromRequest(request);
        final String username;

        logger.debug("Processing request with token: {}" + token);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }
        username = jwtService.getUsernameFromToken(token);
        logger.debug("Extracted username from token: {}" + username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication()==null) {

            logger.debug("Username found and no existing authentication");

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails))
            {

                logger.debug("Token is valid for user: {}" + username);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.debug("Authentication set in SecurityContext");
            }

        }
        filterChain.doFilter(request, response);

    }

    private String getTokenFromRequest(HttpServletRequest request) {
        final String authHeader=request.getHeader(HttpHeaders.AUTHORIZATION);
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer "))
        {
            return authHeader.substring(7);
        }
        return null;
    }
}
