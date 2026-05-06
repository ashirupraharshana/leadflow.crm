package com.leadflow.backend.config;

import com.leadflow.backend.entity.User;
import com.leadflow.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@example.com";

        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User(
                    "Admin User",
                    adminEmail,
                    passwordEncoder.encode("password123"),
                    User.ROLE_ADMIN
            );

            userRepository.save(admin);

            System.out.println("Default admin user created successfully.");
        }
    }
}