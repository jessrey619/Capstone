package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.List;

@RestController
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @PostMapping("/photos/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file,
                                         @RequestParam("name") String name, //The name should be username+:+type like ORCR
                                         @RequestParam("type") int type,
                                         @RequestParam("username") String username) {
        return photoService.savePhoto(file, name, type, username);
    }

//    @CrossOrigin
//    @GetMapping("/photos")
//    public ResponseEntity<List<Photo>> getAllPhotos() {
//        return photoService.getAllPhotos();
//    }
    
    @GetMapping("/photos/{id}")
    public ResponseEntity<byte[]> getPhotoById(@PathVariable Long id) {
        return photoService.getPhotoById(id);
    }
    
    //in the axios you get the name of the file sa applicantEntity
    @CrossOrigin
    @GetMapping("/photos/get-photo-by-name/{name}")
    public ResponseEntity<byte[]> getPhotoByName(@PathVariable String name) {
    	return photoService.getPhotoByName(name);
    }
    
    @CrossOrigin
    @GetMapping("/photos/get-photo-by-username/{username}")
    public ResponseEntity<List<Photo>> getPhotosByUsername(@PathVariable String username) {
        return photoService.getPhotosByUsername(username);
    }
}


