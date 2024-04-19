package com.test.test.Controller;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.test.Entity.Photo;
import com.test.test.Service.PhotoService;

import java.io.IOException;
import java.util.List;

@RestController
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @PostMapping("/photos/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file,
                                         @RequestParam("name") String name,
                                         @RequestParam("type") int type) {
        try {
            Photo photo = new Photo();
            photo.setName(name);
            photo.setImage(file.getBytes());
            photo.setType(type); //0 = proofOfPayment, 1 = OR/CR, 2 = license

            photoService.savePhoto(photo);

            return ResponseEntity.ok("Photo uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to upload photo: " + e.getMessage());
        }
    }

    @CrossOrigin
    @GetMapping("/photos")
    public ResponseEntity<List<Photo>> getAllPhotos() {
        List<Photo> photos = photoService.getAllPhotos();
        return ResponseEntity.ok(photos);
    }
    
    @GetMapping("/photos/{id}")
    public ResponseEntity<byte[]> getPhotoById(@PathVariable Long id) {
        Photo photo = photoService.getPhotoById(id);
        if (photo != null && photo.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Set the content type to image/jpeg
                    .body(photo.getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


