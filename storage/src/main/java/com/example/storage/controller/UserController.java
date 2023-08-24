package com.example.storage.controller;

import com.example.storage.UserRegistrationRequest;
import com.example.storage.User;
import com.example.storage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/login")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping
    public List<User> findAll(){
       return userService.getAllUser();
    }

    @PostMapping(name = "/login/register")
    public ResponseEntity<String> register(@RequestBody UserRegistrationRequest request){
       try{
           User newUser = userService.insert(request);
           if(request != null){
               return ResponseEntity.ok("ok");
           }else{
               return ResponseEntity.badRequest().body("Registration Failed");
           }
       }
       catch (IllegalArgumentException e){
           return ResponseEntity.badRequest().body("user already exist");
       }
       catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("registration Failed");
       }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserRegistrationRequest request) {
        try {
            userService.updateUser(id, request);
            return ResponseEntity.ok("User data updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User data update failed");
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCurrentUserProfile() {

                @AuthenticationPrincipal(expression = "id") Long userId
    {
            try {
                userService.deleteUser(userId);
                return ResponseEntity.ok("User account deleted successfully");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("User not found");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User account deletion failed");
            }
    }

}
