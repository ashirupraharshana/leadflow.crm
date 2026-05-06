package com.leadflow.backend.controller;

import com.leadflow.backend.dto.AuthResponse;
import com.leadflow.backend.dto.LoginRequest;
import com.leadflow.backend.dto.RegisterRequest;
import com.leadflow.backend.dto.UserResponse;
import com.leadflow.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private static final String SESSION_USER_ID = "USER_ID";

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request, HttpServletRequest servletRequest) {
        AuthResponse response = authService.login(request);

        HttpSession session = servletRequest.getSession(true);
        session.setAttribute(SESSION_USER_ID, response.getUser().getId());

        return response;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(HttpServletRequest request) {
        Long userId = (Long) request.getSession(false).getAttribute(SESSION_USER_ID);
        return authService.getUserById(userId);
    }

    @PostMapping("/logout")
    public AuthResponse logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return new AuthResponse(null, "Logout successful");
    }
}