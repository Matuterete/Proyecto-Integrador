package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.dto.UserDTO;
import com.ctdg4.ProThechnics.dto.UserFavDTO;
import com.ctdg4.ProThechnics.dto.UserFullDTO;
import com.ctdg4.ProThechnics.entity.Role;
import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.repository.RoleRepository;
import com.ctdg4.ProThechnics.repository.UserFavRepository;
import com.ctdg4.ProThechnics.repository.UserRepository;
import com.ctdg4.ProThechnics.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserFavRepository userFavRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long user_id) {
        userRepository.deleteById(user_id);
    }

    public List<User> listAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long user_id) {
        return userRepository.findById(user_id);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void addFavorite(Long userId, Long productId) {
        userFavRepository.addFavorite(userId, productId);
    }

    public void removeFavorite(Long userId, Long productId) {
        userFavRepository.removeFavorite(userId, productId);
    }
    //DTOs

    public List<UserDTO> listAllUsersDTO() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<UserFullDTO> findUserByIdDTO(Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);
//        return userOptional.map(user -> modelMapper.map(user, UserDTO.class));
        return userOptional.map(this::convertToDto);
    }

    public Optional<UserFullDTO> findUserByEmailDTO(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
//        return userOptional.map(user -> modelMapper.map(user, UserDTO.class));
          return userOptional.map(this::convertToDto);
    }

    private UserFullDTO convertToDto(User user) {
        UserFullDTO userFullDTO = modelMapper.map(user, UserFullDTO.class);
        List<UserFavDTO> favoritesDto = user.getFav().stream()
                .map(fav -> {
                    UserFavDTO favDto = new UserFavDTO();
                    favDto.setProductId(fav.getProduct().getId());
                    return favDto;
                })
                .collect(Collectors.toList());
        userFullDTO.setFavorites(favoritesDto);
        return userFullDTO;
    }

    @Transactional
    public UserDTO updateUserDTO(UserDTO userDTO) throws ResourceNotFoundException {
        User existingUser = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        existingUser.setIsActive(userDTO.getIsActive());
        existingUser.setName(userDTO.getName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setEmail(userDTO.getEmail());

        Role newRole = roleRepository.findByRole(userDTO.getRole());
        userRoleRepository.updateUserRole(userDTO.getId(), newRole);

        userRepository.save(existingUser);

        return modelMapper.map(existingUser, UserDTO.class);
    }
}
