package edu.itstep.notesservice.dto;

import lombok.Data;

@Data
public class NoteDTO {
    private String id;
    private String title;
    private String content;
    private String userId;
}
