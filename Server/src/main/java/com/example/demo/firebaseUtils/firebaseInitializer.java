package com.example.demo.firebaseUtils;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
@Service
public class firebaseInitializer {
    private final String firebaseConfigPath = "googleConfigFile/notificationapplication-c30aacf05191.json";


    @PostConstruct
    public void initialize() {
        try {
            FirebaseOptions options;
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())).build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase Application is initialised!!");
            }
        } catch (IOException e) {
           System.out.println(e.getMessage());
        }
    }
}
