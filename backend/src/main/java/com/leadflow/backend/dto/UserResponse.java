package com.leadflow.backend.dto;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Integer role;
    private String roleName;

    public UserResponse() {
    }

    public UserResponse(Long id, String name, String email, Integer role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.roleName = role != null && role == 1 ? "ADMIN" : "USER";
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Integer getRole() {
        return role;
    }

    public String getRoleName() {
        return roleName;
    }
}