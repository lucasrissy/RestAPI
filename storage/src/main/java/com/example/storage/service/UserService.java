package com.example.storage.service;

import com.example.storage.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();

    User getUserId(Long id);

    void saveUser(User user);

    User updateUser(Long id,  User user);

    void deleteUser(Long id);

    User authenticate(String name, String password);

}

// The interface above defines the base CRUD operations that we will implement in
// our UserServiceImpl class. In the services package
// create a class with the name UserServiceImp and implements the UserService interface we created above.