package com.leadflow.backend.service;

import com.leadflow.backend.dto.AuthResponse;
import com.leadflow.backend.dto.LoginRequest;
import com.leadflow.backend.dto.RegisterRequest;
import com.leadflow.backend.dto.UserResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserResponse getUserById(Long userId);
}