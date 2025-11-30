package com.nullptrexc.slideshow.controller.websocket;

import com.nullptrexc.slideshow.controller.LoggableEndpoint;
import io.micronaut.websocket.WebSocketBroadcaster;

public abstract class GenericWebsocket extends LoggableEndpoint {
    protected final WebSocketBroadcaster broadcaster;
    protected GenericWebsocket(WebSocketBroadcaster broadcaster) {
        this.broadcaster = broadcaster;
    }
}

