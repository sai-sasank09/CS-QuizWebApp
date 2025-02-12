package com.quizapp.quiz.controller;

import com.quizapp.quiz.model.Question;
import com.quizapp.quiz.model.QuizAttempt;
import com.quizapp.quiz.model.Topic;
import com.quizapp.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(quizService.getAllTopics());
    }

    @GetMapping("/topics/{topicId}/questions")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable UUID topicId) {
        return ResponseEntity.ok(quizService.getQuestionsByTopic(topicId));
    }

    @PostMapping("/start/{topicId}")
    public ResponseEntity<QuizAttempt> startQuiz(
            @PathVariable UUID topicId,
            @RequestHeader("X-User-ID") UUID userId) {
        return ResponseEntity.ok(quizService.startQuiz(userId, topicId));
    }

    @PostMapping("/submit/{attemptId}")
    public ResponseEntity<QuizAttempt> submitQuiz(
            @PathVariable UUID attemptId,
            @RequestBody Map<UUID, Integer> answers) {
        return ResponseEntity.ok(quizService.submitQuiz(attemptId, answers));
    }
}