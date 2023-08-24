package com.example.storage.service;

import com.example.storage.User;
import com.example.storage.UserRegistrationRequest;
import com.example.storage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUser() {
       return userRepository.findAll();


    }

    @Override
    public User getTodoById(Long id) {
        return null;
    }


    @Override
    public User insert(UserRegistrationRequest request) {
        if(userRepository.findByEmail(request.getEmail()) != null){
            throw new IllegalArgumentException("User already exist");
        }
        User newUser = new User();
        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setPhone(request.getPhone());
        newUser.setPassword(request.getPassword());

        return userRepository.save(newUser);
    }

    @Override
    public void updateUser(Long userId, UserRegistrationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        userRepository.delete(user);
    }
}
