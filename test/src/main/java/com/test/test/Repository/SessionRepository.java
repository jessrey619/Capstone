package com.test.test.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.SessionTokenEntity;

@Repository
public interface SessionRepository extends JpaRepository<SessionTokenEntity, Long> {
    Optional<SessionTokenEntity> findBySessionToken(String sessionToken);
    void deleteByExpirationTimeBefore(LocalDateTime expirationTime);
}