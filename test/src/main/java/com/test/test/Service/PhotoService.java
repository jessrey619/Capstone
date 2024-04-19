package com.test.test.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.test.test.Entity.Photo;

@Service
public interface PhotoService {
    List<Photo> getAllPhotos();

    void savePhoto(Photo photo);
    
    Photo getPhotoById(Long id);
}
