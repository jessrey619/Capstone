//package com.test.test.Service;
//
//import org.apache.http.HttpStatus;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.test.test.Entity.Photo;
//import com.test.test.Repository.PhotoRepository;
//
//import java.io.IOException;
//import java.util.List;
//
//@Service
//public class PhotoServiceImpl implements PhotoService {
//    @Autowired
//    private PhotoRepository photoRepository;
//
//    @Override
//    public List<Photo> getAllPhotos() {
//        return photoRepository.findAll();
//    }
//
//    @Override
//    public ResponseEntity<?> savePhoto(MultipartFile file, String name, int type, String username) {
//    	try {
//            Photo existingPhoto = photoService.getPhotoByName(name);
//            if (existingPhoto != null) {
//                // Update the existing photo
//                existingPhoto.setName(name);
//                existingPhoto.setImage(file.getBytes());
//                existingPhoto.setType(type); //1 = license, 2 = OR/CR, 3 = proofofpayment, 0 =default
//                existingPhoto.setUsername(username);
//                photoService.savePhoto(file, name, type, username);
//                return ResponseEntity.ok("Photo updated successfully!");
//            } else {
//                // Create a new photo
//                Photo newPhoto = new Photo();
//                newPhoto.setName(name);
//                newPhoto.setImage(file.getBytes());
//                newPhoto.setType(type); //1 = license, 2 = OR/CR, 3 = proofofpayment, 0 =default
//                newPhoto.setUsername(username);
//                photoService.savePhoto(file, name, type, username);
//                return ResponseEntity.ok("Photo uploaded successfully!");
//            }
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to upload photo: " + e.getMessage());
//        }
//    }
//
//    @Override
//    public Photo getPhotoById(Long id) {
//        return photoRepository.findById(id).orElse(null);
//    }
//    
//    @Override
//    public Photo getPhotoByName(String name) {
//        return photoRepository.findByName(name);
//    }
//}
