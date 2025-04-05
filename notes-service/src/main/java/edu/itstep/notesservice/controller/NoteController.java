package edu.itstep.notesservice.controller;

import edu.itstep.notesservice.dto.NoteDTO;
import edu.itstep.notesservice.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getMyNotes() {
        return ResponseEntity.ok(noteService.getNotesForCurrentUser());
    }

    @PostMapping
    public ResponseEntity<NoteDTO> create(@RequestBody NoteDTO dto) {
        return ResponseEntity.ok(noteService.createNote(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> update(@PathVariable("id") String id, @RequestBody NoteDTO dto) {
        return ResponseEntity.ok(noteService.updateNote(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getById(@PathVariable("id") String id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<NoteDTO>> searchByUserIdAndKeyword(@RequestParam("query") String query) {
        return ResponseEntity.ok(noteService.searchByUserIdAndKeyword(query));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<List<NoteDTO>> getAll() {
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<List<NoteDTO>> getByUser(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(noteService.getNotesByUser(userId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/search")
    public ResponseEntity<List<NoteDTO>> searchByKeyword(@RequestParam("query") String query) {
        List<NoteDTO> results = noteService.searchByKeyword(query);
        return ResponseEntity.ok(results);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteNoteAsAdmin(@PathVariable("id") String id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
