package edu.itstep.userservice.sercice.impl;

import edu.itstep.userservice.dto.LoginRequest;
import edu.itstep.userservice.dto.RegisterRequest;
import edu.itstep.userservice.dto.UpdateUser;
import edu.itstep.userservice.dto.UserDTO;
import edu.itstep.userservice.exeption.UserNotFoundException;
import edu.itstep.userservice.model.Role;
import edu.itstep.userservice.model.User;
import edu.itstep.userservice.repository.UserRepository;
import edu.itstep.userservice.security.JwtUtil;
import edu.itstep.userservice.sercice.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(), user.getId(), String.valueOf(user.getRole()));
    }

    @Override
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getEmail(), user.getId(), String.valueOf(user.getRole()));
    }

    @Override
    public UserDTO getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Override
    public UpdateUser updateCurrentUser(UpdateUser updateUser) {
        User user = getCurrentAuthenticatedUser();

        user.setUsername(updateUser.getUsername());
        user.setEmail(updateUser.getEmail());

        if (updateUser.getNewPassword() != null && !updateUser.getNewPassword().isEmpty()) {
            if (!passwordEncoder.matches(updateUser.getCurrentPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(updateUser.getNewPassword()));
        }

        userRepository.save(user);
        return mapToUpdateUser(user);
    }

    @Override
    public void deleteCurrentUser() {
        User user = getCurrentAuthenticatedUser();
        userRepository.delete(user);
    }

    public User getCurrentAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Override
    public UserDTO updateUserById(String id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        return mapToDTO(userRepository.save(user));
    }

    @Override
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRole(Role.USER);
        return dto;
    }

    private UpdateUser mapToUpdateUser(User user) {
        UpdateUser updateUser = new UpdateUser();
        updateUser.setUsername(user.getUsername());
        updateUser.setEmail(user.getEmail());
        return updateUser;
    }
}
