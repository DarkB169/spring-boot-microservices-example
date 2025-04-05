package edu.itstep.notesservice.service.impl;

import edu.itstep.notesservice.dto.NoteDTO;
import edu.itstep.notesservice.exeption.NoteNotFoundException;
import edu.itstep.notesservice.model.Note;
import edu.itstep.notesservice.repository.NoteRepository;
import edu.itstep.notesservice.service.NoteService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public NoteDTO createNote(NoteDTO dto) {
        Note note = mapToEntity(dto);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        note.setUserId(getCurrentUserId());
        return mapToDTO(noteRepository.save(note));
    }

    @Override
    public NoteDTO updateNote(String id, NoteDTO dto) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException("Note not found"));
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        note.setUpdatedAt(LocalDateTime.now());
        return mapToDTO(noteRepository.save(note));
    }

    @Override
    public void deleteNote(String id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteDTO getNoteById(String id) {
        return noteRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new NoteNotFoundException("Note not found"));
    }

    @Override
    public List<NoteDTO> getNotesForCurrentUser() {
        String userId = getCurrentUserId();
        return noteRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> getNotesByUser(String userId) {
        return noteRepository.findByUserId(userId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> getAllNotes() {
        return noteRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> searchByUserIdAndKeyword(String query) {
        return noteRepository
                .searchByUserIdAndKeyword(getCurrentUserId(), query)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> searchByKeyword(String query){
        Pattern pattern = Pattern.compile(".*" + Pattern.quote(query) + ".*", Pattern.CASE_INSENSITIVE);
        return noteRepository.searchByTitle(pattern, pattern)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private String getCurrentUserId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private NoteDTO mapToDTO(Note note) {
        NoteDTO dto = new NoteDTO();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        dto.setUserId(note.getUserId());
        return dto;
    }

    private Note mapToEntity(NoteDTO dto) {
        Note note = new Note();
        note.setId(dto.getId());
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        note.setUserId(dto.getUserId());
        return note;
    }
}
