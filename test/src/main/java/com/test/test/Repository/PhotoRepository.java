package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test.test.Entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
