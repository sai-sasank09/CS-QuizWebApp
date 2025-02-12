package com.quizapp.user.controller;

import com.quizapp.user.dto.LoginDto;
import com.quizapp.user.dto.UserRegistrationDto;
import com.quizapp.user.model.User;
import com.quizapp.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        return ResponseEntity.ok(userService.registerUser(registrationDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {
        String token = userService.authenticateUser(loginDto);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        // Extract user ID from JWT token and get profile
        UUID userId = UUID.fromString("user-id-from-token");
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }
}