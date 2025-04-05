package edu.itstep.notesservice.repository;

import edu.itstep.notesservice.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.regex.Pattern;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId);
    @org.springframework.data.mongodb.repository.Query(
            "{ 'userId': ?0, '$or': [ { 'title': { $regex: ?1, $options: 'i' } }, { 'content': { $regex: ?1, $options: 'i' } } ] }"
    )
    List<Note> searchByUserIdAndKeyword(String userId, String keyword);
    List<Note> searchByTitle(Pattern title, Pattern content);
}