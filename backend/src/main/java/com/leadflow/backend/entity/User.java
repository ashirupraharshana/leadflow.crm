package com.leadflow.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    public static final int ROLE_USER = 0;
    public static final int ROLE_ADMIN = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false)
    private String password;

    // 0 = USER, 1 = ADMIN
    // Default role is USER
    @Column(nullable = false)
    private Integer role = ROLE_USER;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public User() {
    }

    public User(String name, String email, String password, Integer role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role == null ? ROLE_USER : role;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();

        if (this.role == null) {
            this.role = ROLE_USER;
        }
    }

    public Long getId() {
        return id;
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
        this.role = role == null ? ROLE_USER : role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}