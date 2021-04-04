package com.example.demo.firebaseService;

import com.example.demo.firebaseUtils.fcmService;
import com.example.demo.model.PushNotificationRequest;
import com.google.api.client.util.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ExecutionException;
@Service
public class PushNotificationService {

    private fcmService NotificationService;

    public PushNotificationService() {
    }

    public PushNotificationService(fcmService NotificationService) {
        this.NotificationService = NotificationService;
    }
    public void sendPushNotificationToToken(PushNotificationRequest request) {
        try {
            fcmService.sendMessageToToken(request);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println(e.getMessage());
        }
    }
}
