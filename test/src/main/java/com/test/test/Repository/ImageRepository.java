package com.test.test.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.Image;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {
	
}
