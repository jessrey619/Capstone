package com.test.test.Service;

import java.io.IOException;
import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.test.test.Entity.Photo;
import com.test.test.Repository.PhotoRepository;

@Service
public class PhotoService {
	@Autowired
	private PhotoRepository photoRepository;
	
//	public ResponseEntity<List<Photo>> getAllPhotos() {
//        List<Photo> photos = photoRepository.getAllPhotos();
//        return ResponseEntity.ok(photos);
//    }

    public ResponseEntity<?> savePhoto(MultipartFile file, String name, int type, String username) {
    	try {
            Photo existingPhoto = photoRepository.getPhotoByName(name);
            if (existingPhoto != null) {
                // Update the existing photo
                existingPhoto.setName(name);
                existingPhoto.setImage(file.getBytes());
                existingPhoto.setType(type); //1 = license, 2 = OR/CR, 3 = proofofpayment, 0 =default
                existingPhoto.setUsername(username);
                photoRepository.save(existingPhoto);
                return ResponseEntity.ok(existingPhoto.getName());
            } else {
                // Create a new photo
                Photo newPhoto = new Photo();
                newPhoto.setName(name);
                newPhoto.setImage(file.getBytes());
                newPhoto.setType(type); //1 = license, 2 = OR/CR, 3 = proofofpayment, 0 =default
                newPhoto.setUsername(username);
                photoRepository.save(existingPhoto);
                return ResponseEntity.ok(newPhoto.getName());
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to upload photo: " + e.getMessage());
        }
    }
    
    public ResponseEntity<byte[]> getPhotoById(@PathVariable Long id) {
        Photo photo = photoRepository.getPhotoById(id);
        if (photo != null && photo.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Set the content type to image/jpeg
                    .body(photo.getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    public ResponseEntity<byte[]> getPhotoByName(@PathVariable String name) {
    	Photo photo = photoRepository.getPhotoByName(name);
    	System.out.print(name);
    	
        if (photo != null && photo.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Set the content type to image/jpeg
                    .body(photo.getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    public ResponseEntity<List<Photo>> getPhotosByUsername(String username) {
        List<Photo> photos = photoRepository.findByUsername(username);
        if (photos != null && !photos.isEmpty()) {
            return ResponseEntity.ok(photos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
