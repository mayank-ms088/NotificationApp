package com.example.demo.Controller;

import com.example.demo.firebaseService.PushNotificationService;
import com.example.demo.model.PushNotificationRequest;
import com.example.demo.model.PushNotificationResponse;
import com.example.demo.model.SMSRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @CrossOrigin(origins = "http://localhost:3001")
    public ResponseEntity sendTokenNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotificationToToken(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }
    @PostMapping(value="/SMS",consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3001")
    public ResponseEntity sendSMS(@RequestBody SMSRequest request) {

        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "SMS has been sent."), HttpStatus.OK);
    }

}
