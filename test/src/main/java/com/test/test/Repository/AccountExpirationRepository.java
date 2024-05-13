package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.AccountExpirationEntity;

@Repository
public interface AccountExpirationRepository extends JpaRepository<AccountExpirationEntity, Integer> {
}
