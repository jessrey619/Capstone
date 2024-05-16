package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.LogsEntity;

@Repository
public interface LogsRepository extends JpaRepository<LogsEntity,Integer> {
	List<LogsEntity> findByStickerId(int stickerId);
}
