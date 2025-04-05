package edu.itstep.userservice.dto;

import lombok.Data;

@Data
public class UpdateUser {
    private String username;
    private String email;
    private String currentPassword;
    private String newPassword;
}

