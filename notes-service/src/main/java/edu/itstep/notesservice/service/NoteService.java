package edu.itstep.notesservice.service;

import edu.itstep.notesservice.dto.NoteDTO;

import java.util.List;

public interface NoteService {
    //NoteDTO getNotes
    NoteDTO createNote(NoteDTO dto);
    NoteDTO updateNote(String id, NoteDTO dto);
    void deleteNote(String id);
    NoteDTO getNoteById(String id);
    List<NoteDTO> getNotesForCurrentUser();
    List<NoteDTO> getNotesByUser(String userId);
    List<NoteDTO> getAllNotes();
    List<NoteDTO> searchByKeyword(String query);
    List<NoteDTO> searchByUserIdAndKeyword(String query);
}
