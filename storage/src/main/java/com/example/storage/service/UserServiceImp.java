package com.example.storage.service;

import com.example.storage.User;
import com.example.storage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
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
    public User getUserId(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public void saveUser(User user) {
        this.userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null ){
            try {
                throw new UserPrincipalNotFoundException("User not Found");
            } catch (UserPrincipalNotFoundException e) {
                throw new RuntimeException(e);
            }
        }

        existingUser.setEmail(user.getEmail());
        existingUser.setFullName(user.getFullName());
        existingUser.setPassword(user.getPassword());
        existingUser.setPhone(user.getPhone());

        return userRepository.save(existingUser);
    }



    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                userRepository.delete(user);
    }




}
