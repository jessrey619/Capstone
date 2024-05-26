package com.test.test.Entity;

import com.fasterxml.jackson.databind.JsonNode;

public class DecodedJwt {
	    private JsonNode payload;

	    public DecodedJwt(JsonNode payload) {
	        this.payload = payload;
	    }

	    public JsonNode getPayload() {
	        return payload;
	    }

	    public void setPayload(JsonNode payload) {
	        this.payload = payload;
	    }

}
