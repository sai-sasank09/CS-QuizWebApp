package com.quizapp.quiz.repository;

import com.quizapp.quiz.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, UUID> {
    List<QuizAttempt> findByUserIdOrderByStartedAtDesc(UUID userId);
    Optional<QuizAttempt> findByUserIdAndTopicIdAndCompletedFalse(UUID userId, UUID topicId);
}