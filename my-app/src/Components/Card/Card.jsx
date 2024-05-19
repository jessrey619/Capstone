// src/components/Card.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';

const Card = () => {
    const [vehicleCounts, setVehicleCounts] = useState({
        totalVehicles: 0,
        fourWheelers: 0,
        twoWheelers: 0,
    });

    useEffect(() => {
        axios.get('http://localhost:8080/logs/vehicle-types/count')
            .then(response => {
                const fourWheel = response.data.fourWheelCount;
                const twoWheel = response.data.otherCount;
                const total = fourWheel + twoWheel;
                setVehicleCounts({
                    totalVehicles: total,
                    fourWheelers: fourWheel,
                    twoWheelers: twoWheel,
                });
            })
            .catch(error => {
                console.error('Error fetching vehicle counts:', error);
            });
    }, []);

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <div>
                        <h5>Total Vehicles</h5>
                        <p>{vehicleCounts.totalVehicles}</p>
                    </div>
                    <i className="bi bi-car-front card-icon"></i>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div>
                        <h5>Total 4 Wheelers</h5>
                        <p>{vehicleCounts.fourWheelers}</p>
                    </div>
                    <i className="bi bi-truck card-icon"></i>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div>
                        <h5>Total 2 Wheelers</h5>
                        <p>{vehicleCounts.twoWheelers}</p>
                    </div>
                    <i className="bi bi-bicycle card-icon"></i>
                </div>
            </div>
        </div>
    );
};

export default Card;
