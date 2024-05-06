package com.test.test.Entity;

public class VehicleTypeCountResponse {

    private int fourWheelCount;
    private int otherCount;

    public VehicleTypeCountResponse(int fourWheelCount, int otherCount) {
        this.fourWheelCount = fourWheelCount;
        this.otherCount = otherCount;
    }

    public int getFourWheelCount() {
        return fourWheelCount;
    }

    public void setFourWheelCount(int fourWheelCount) {
        this.fourWheelCount = fourWheelCount;
    }

    public int getOtherCount() {
        return otherCount;
    }

    public void setOtherCount(int otherCount) {
        this.otherCount = otherCount;
    }
}

