package com.parking.backend.service;

import com.parking.backend.dto.AuthRequest;
import com.parking.backend.dto.response.AuthResponse;
import com.parking.backend.entity.User;
import com.parking.backend.repository.UserRepository;
import com.parking.backend.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(AuthRequest request) {

        // 1. find user
        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. check password
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 3. generate JWT
        String token = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(token);
    }
}