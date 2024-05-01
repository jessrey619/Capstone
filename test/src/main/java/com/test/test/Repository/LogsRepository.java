package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.LogsEntity;

@Repository
public interface LogsRepository extends JpaRepository<LogsEntity,Integer> {

}
