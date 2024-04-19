package com.test.test.Util;

import java.util.UUID;

public class SessionUtil {
    public static String generateSessionToken() {
        return UUID.randomUUID().toString();
    }
}
