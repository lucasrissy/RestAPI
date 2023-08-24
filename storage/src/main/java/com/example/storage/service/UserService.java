package com.example.storage.service;

import com.example.storage.User;
import com.example.storage.UserRegistrationRequest;

import java.util.List;

public interface UserService {
    List<User> getAllUser();

    User getTodoById(Long id);

    User insert(UserRegistrationRequest request);

    void updateUser(Long id, UserRegistrationRequest request);

    void deleteUser(Long id);
}

// The interface above defines the base CRUD operations that we will implement in
// our UserServiceImpl class. In the services package
// create a class with the name UserServiceImp and implements the UserService interface we created above.