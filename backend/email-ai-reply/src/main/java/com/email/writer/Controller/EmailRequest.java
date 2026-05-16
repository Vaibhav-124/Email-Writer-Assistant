package com.email.writer.Controller;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
