package com.leadflow.backend.dto;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;

    // 0 = USER, 1 = ADMIN
    // Default role is USER
    private Integer role = 0;

    public RegisterRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role == null ? 0 : role;
    }
}