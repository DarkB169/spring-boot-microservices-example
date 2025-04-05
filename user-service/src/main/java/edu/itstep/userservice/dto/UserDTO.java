package edu.itstep.userservice.dto;

import edu.itstep.userservice.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String password;
    private Role role;
}