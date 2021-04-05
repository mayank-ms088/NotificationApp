package com.example.demo.firebaseUtils;
import com.example.demo.model.PushNotificationRequest;
import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ExecutionException;
@Service
public class fcmService {
    public static void sendMessageToToken(PushNotificationRequest request)
            throws InterruptedException, ExecutionException {
        Message message = getPreconfiguredMessageToToken(request);
        String response = sendAndGetResponse(message);
        System.out.println("Sent message to token. Device token: " + request.getToken() + ", " + response);
    }

    private static String sendAndGetResponse(Message message) throws ExecutionException, InterruptedException {
        return FirebaseMessaging.getInstance().sendAsync(message).get();
    }

    private static Message getPreconfiguredMessageToToken(PushNotificationRequest request) {
        return getPreconfiguredMessageBuilder(request).setToken(request.getToken()).build();
    }

    private static Message.Builder getPreconfiguredMessageBuilder(PushNotificationRequest request) {
        WebpushConfig webConfig = getWebConfig(request.getTitle(),request.getMessage());
        return Message.builder().setWebpushConfig(webConfig).setNotification(Notification.builder().setTitle(request.getTitle()).setBody(request.getMessage()).build());
    }

    private static WebpushConfig getWebConfig(String title, String messageBody) {
        return WebpushConfig.builder()
                .setNotification(WebpushNotification.builder()
                        .setBadge(NotificationParameter.getUrl())
                        .setTitle(title)
                        .setBody(messageBody)
                        .build()).build();
    }


}
