package com.quizapp.quiz.service;

import com.quizapp.quiz.model.Question;
import com.quizapp.quiz.model.QuizAttempt;
import com.quizapp.quiz.model.Topic;
import com.quizapp.quiz.repository.QuestionRepository;
import com.quizapp.quiz.repository.QuizAttemptRepository;
import com.quizapp.quiz.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    @Cacheable(value = "topics")
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @Cacheable(value = "questions", key = "#topicId")
    public List<Question> getQuestionsByTopic(UUID topicId) {
        return questionRepository.findByTopicId(topicId);
    }

    @Transactional
    public QuizAttempt startQuiz(UUID userId, UUID topicId) {
        Topic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new IllegalArgumentException("Topic not found"));

        // Check for existing incomplete attempt
        return quizAttemptRepository
            .findByUserIdAndTopicIdAndCompletedFalse(userId, topicId)
            .orElseGet(() -> {
                QuizAttempt attempt = new QuizAttempt();
                attempt.setUserId(userId);
                attempt.setTopic(topic);
                return quizAttemptRepository.save(attempt);
            });
    }

    @Transactional
    public QuizAttempt submitQuiz(UUID attemptId, Map<UUID, Integer> answers) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
            .orElseThrow(() -> new IllegalArgumentException("Quiz attempt not found"));

        if (attempt.isCompleted()) {
            throw new IllegalStateException("Quiz already completed");
        }

        attempt.setAnswers(answers);
        attempt.setCompleted(true);
        attempt.setCompletedAt(LocalDateTime.now());

        // Calculate score
        List<Question> questions = questionRepository.findByTopicId(attempt.getTopic().getId());
        int score = calculateScore(questions, answers);
        attempt.setScore(score);

        return quizAttemptRepository.save(attempt);
    }

    private int calculateScore(List<Question> questions, Map<UUID, Integer> answers) {
        return (int) questions.stream()
            .filter(q -> answers.containsKey(q.getId()) && 
                        answers.get(q.getId()) == q.getCorrectOptionIndex())
            .count();
    }
}