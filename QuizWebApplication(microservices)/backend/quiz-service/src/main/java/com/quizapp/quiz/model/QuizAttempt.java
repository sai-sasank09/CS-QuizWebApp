package com.quizapp.quiz.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
@Entity
@Table(name = "quiz_attempts")
@EntityListeners(AuditingEntityListener.class)
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @ElementCollection
    @CollectionTable(name = "quiz_answers", 
        joinColumns = @JoinColumn(name = "attempt_id"))
    @MapKeyColumn(name = "question_id")
    @Column(name = "selected_option")
    private Map<UUID, Integer> answers = new HashMap<>();

    private int score;

    private boolean completed;

    @CreatedDate
    private LocalDateTime startedAt;

    private LocalDateTime completedAt;
}