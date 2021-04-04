package com.example.demo.Controller;

import com.example.demo.firebaseService.PushNotificationService;
import com.example.demo.model.PushNotificationRequest;
import com.example.demo.model.PushNotificationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    private PushNotificationService pushNotificationService;

    public Controller(PushNotificationService pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }
    @PostMapping(value="/push_notification",consumes = "application/json", produces = "application/json")
    public ResponseEntity sendTokenNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotificationToToken(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }


}
