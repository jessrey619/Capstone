package com.test.test.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class MessagesController {

	@CrossOrigin
    @GetMapping("/messages")
    public ResponseEntity<List<String>> messages() {
        return ResponseEntity.ok(Arrays.asList("first", "second"));
    }
}