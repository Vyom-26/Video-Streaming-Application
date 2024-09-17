package com.stream.app.spring_stream_backend.payload;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CustomeMessage {

    private String message;

    private boolean success = false;
}
