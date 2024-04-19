package com.test.test.Service;

import org.springframework.stereotype.Service;

import com.test.test.Entity.Image;

import java.util.List;

@Service
public interface ImageService {
    public Image create(Image image);
    public List<Image> viewAll();
    public Image viewById(long id);
}