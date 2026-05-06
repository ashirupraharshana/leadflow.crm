package com.leadflow.backend.security;

import com.leadflow.backend.entity.User;
import com.leadflow.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class SessionAuthenticationFilter extends OncePerRequestFilter {

    private static final String SESSION_USER_ID = "USER_ID";

    private final UserRepository userRepository;

    public SessionAuthenticationFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        if (!path.startsWith("/api/")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (
                path.equals("/api/auth/login") ||
                        path.equals("/api/auth/register") ||
                        request.getMethod().equalsIgnoreCase("OPTIONS")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute(SESSION_USER_ID) == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Unauthorized. Please login first.\"}");
            return;
        }

        Long userId = (Long) session.getAttribute(SESSION_USER_ID);

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"User session is invalid.\"}");
            return;
        }

        String roleName = user.getRole() == 1 ? "ROLE_ADMIN" : "ROLE_USER";

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null,
                        List.of(new SimpleGrantedAuthority(roleName))
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}