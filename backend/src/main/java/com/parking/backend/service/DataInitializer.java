package com.parking.backend.service;

import com.parking.backend.entity.User;
import com.parking.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.findByUsername("user1").isEmpty()) {
                User user = new User();
                user.setUsername("user1");
                user.setPassword(encoder.encode("password123"));
                user.setRole("USER");
                userRepository.save(user);
            }

            if (userRepository.findByUsername("admin1").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin1");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }
        };
    }
}
