package com.test.test.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class TestController {

	@CrossOrigin
	@GetMapping("/")
	public String home() {
		return "Test";
	}
}
