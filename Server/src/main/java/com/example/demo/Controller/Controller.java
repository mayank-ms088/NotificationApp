package com.example.demo.Controller;

import com.example.demo.firebaseService.PushNotificationService;
import com.example.demo.model.PushNotificationRequest;
import com.example.demo.model.PushNotificationResponse;
import com.example.demo.model.SMSRequest;
import com.plivo.api.Plivo;
import com.plivo.api.exceptions.PlivoRestException;
import com.plivo.api.models.message.Message;
import com.plivo.api.models.message.MessageCreateResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collections;

@RestController
public class Controller {
    private PushNotificationService pushNotificationService;

    public Controller(PushNotificationService pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }
    @PostMapping(value="/push_notification",consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity sendTokenNotification(@RequestBody PushNotificationRequest request) {
        pushNotificationService.sendPushNotificationToToken(request);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "Notification has been sent."), HttpStatus.OK);
    }
    @PostMapping(value="/SMS",consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity sendSMS(@RequestBody SMSRequest request) throws IOException, PlivoRestException {
        Plivo.init("MANGRIY2E0OWMZMDEXOT", "MjYwNjAxOGQ2YmNiNTkzYmMyNDQ3ZGFiNWExMTQ5");
        MessageCreateResponse response = Message.creator(
               "+919027350941",
                Collections.singletonList(request.getMobile()),
                request.getSmsBody()).create();
        System.out.println("SMS Sent Successfully => " + response);
        return new ResponseEntity<>(new PushNotificationResponse(HttpStatus.OK.value(), "SMS has been sent."), HttpStatus.OK);
    }

}
