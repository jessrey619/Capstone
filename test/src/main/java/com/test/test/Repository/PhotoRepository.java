package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Photo findByName(String name);
    
    Photo getPhotoById(Long id);
    
    Photo getPhotoByName(String name);
    
    List<Photo> findByUsername(String username);
}
