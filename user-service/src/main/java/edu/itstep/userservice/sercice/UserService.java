package edu.itstep.userservice.sercice;

import edu.itstep.userservice.dto.LoginRequest;
import edu.itstep.userservice.dto.UpdateUser;
import edu.itstep.userservice.dto.UserDTO;
import edu.itstep.userservice.dto.RegisterRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    String register(RegisterRequest request);
    String login(LoginRequest request);
    UserDTO getCurrentUser();
    UpdateUser updateCurrentUser(UpdateUser updateUser);
    void deleteCurrentUser();

    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO updateUserById(String id, UserDTO userDTO);
    void deleteUserById(String id);
}
