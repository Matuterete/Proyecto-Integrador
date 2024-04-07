package com.ctdg4.ProThechnics.auth;

import com.ctdg4.ProThechnics.dto.UserDTO;
import com.ctdg4.ProThechnics.entity.Role;
import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.entity.UserRole;
import com.ctdg4.ProThechnics.entity.UserRoleId;
import com.ctdg4.ProThechnics.exception.BadCredentialsException;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.exception.ValidationException;
import com.ctdg4.ProThechnics.jwt.JwtService;
import com.ctdg4.ProThechnics.repository.RoleRepository;
import com.ctdg4.ProThechnics.repository.UserRepository;
import com.ctdg4.ProThechnics.repository.UserRoleRepository;
import com.ctdg4.ProThechnics.service.MailService;
import jakarta.mail.MessagingException;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MailService mailService;

    public AuthResponse login(LoginRequest request) throws BadCredentialsException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        String token = jwtService.getToken(user);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        return AuthResponse.builder()
                .user(userDTO)
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) throws DuplicateException, MessagingException, UnsupportedEncodingException {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new DuplicateException("User already exists");
        }

        Integer validationCode = generateValidationCode();

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .lastName(request.getLastName())
                .isActive(false)
                .validationCode(validationCode)
                .build();

        Role role = roleRepository.findByRole("USER");

        UserRoleId userRoleId = new UserRoleId();
        userRoleId.setUserId(user.getId());
        userRoleId.setRoleId(role.getId());

        UserRole userRole = new UserRole();
        userRole.setId(userRoleId);
        userRole.setUser(user);
        userRole.setRole(role);

        userRepository.save(user);
        userRoleRepository.save(userRole);

        mailService.registerEmail(user.getName(), user.getEmail(), validationCode);

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setRole("USER");


        return AuthResponse.builder()
                .user(userDTO)
                .token(jwtService.getToken(user))
                .build();
    }

    public void enableUser(String email, Integer validationCode) throws ResourceNotFoundException, ValidationException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getValidationCode().equals(validationCode)) {
                user.setIsActive(true);
                userRepository.save(user);
            } else {
                throw new ValidationException("Invalid validation code");
            }
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    public void resendVerificationCode(String email) throws ResourceNotFoundException, MessagingException, UnsupportedEncodingException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Integer newValidationCode = generateValidationCode();
            user.setValidationCode(newValidationCode);
            userRepository.save(user);
            mailService.registerEmail(user.getName(), user.getEmail(), newValidationCode);
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }
    private Integer generateValidationCode() {
        Random random = new Random();
        int min = 100000;
        int max = 999999;
        return random.nextInt(max - min + 1) + min;
    }
}
