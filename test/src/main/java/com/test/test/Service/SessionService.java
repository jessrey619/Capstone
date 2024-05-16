package com.test.test.Service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.test.test.Entity.SessionTokenEntity;
import com.test.test.Repository.SessionRepository;
import com.test.test.Util.SessionUtil;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public String createSession(int userId) {
        String sessionToken = SessionUtil.generateSessionToken();
        LocalDateTime expirationTime = LocalDateTime.now().plusHours(1); // Expires in 1 hour
        SessionTokenEntity sessionTokenEntity = new SessionTokenEntity(userId, sessionToken, expirationTime);
        sessionRepository.save(sessionTokenEntity);
        return sessionToken;
    }
    
    @Scheduled(fixedDelay = 3600000) // Run every hour
    public void deleteExpiredSessions() {
        sessionRepository.deleteByExpirationTimeBefore(LocalDateTime.now());
    }
}
