package com.senacwebpatasdouradas.demo.securityconfig; // (ou o pacote que você usou)

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String projectPath = System.getProperty("user.dir");

        String imagePath = projectPath + "/../imagens-projeto/";

        registry.addResourceHandler("/imagens/**")

                .addResourceLocations("file:" + imagePath);
    }
}