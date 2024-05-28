import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/Main/main.css';
import StickerPricingCard from '../../components/Card/StickerPricingCard';
import Swal from 'sweetalert2';

function StickerPricing() {
  const [prices, setPrices] = useState({
    student_two_wheel_pickup: '',
    student_four_wheel_pickup: '',
    student_two_wheel_parking: '',
    student_four_wheel_parking: '',
    staff_two_wheel_pickup: '',
    staff_four_wheel_pickup: '',
    staff_two_wheel_parking: '',
    staff_four_wheel_parking: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prices/get-prices');
      setPrices(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceChange = (userType, field, value) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [`${userType}_${field}`]: value
    }));
  };

  const handleSave = async userType => {
    const endpoint = userType === 'student' ? '/update-student-prices' : '/update-staff-prices';
    const payload = {
      studentTwoWheelPickup: parseFloat(prices.student_two_wheel_pickup),
      studentFourWheelPickup: parseFloat(prices.student_four_wheel_pickup),
      studentTwoWheelParking: parseFloat(prices.student_two_wheel_parking),
      studentFourWheelParking: parseFloat(prices.student_four_wheel_parking),
      staffTwoWheelPickup: parseFloat(prices.staff_two_wheel_pickup),
      staffFourWheelPickup: parseFloat(prices.staff_four_wheel_pickup),
      staffTwoWheelParking: parseFloat(prices.staff_two_wheel_parking),
      staffFourWheelParking: parseFloat(prices.staff_four_wheel_parking)
    };

    console.log("Sending payload:", payload);

    try {
      await axios.put(`http://localhost:8080/prices${endpoint}`, payload);
      Swal.fire({
        title: 'Success',
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} prices saved successfully!`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Clear the input fields
        setPrices({
          student_two_wheel_pickup: '',
          student_four_wheel_pickup: '',
          student_two_wheel_parking: '',
          student_four_wheel_parking: '',
          staff_two_wheel_pickup: '',
          staff_four_wheel_pickup: '',
          staff_two_wheel_parking: '',
          staff_four_wheel_parking: ''
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Error saving ${userType} prices: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      <StickerPricingCard
        title="Faculty"
        prices={prices}
        userType="staff"
        onPriceChange={handlePriceChange}
        onSave={handleSave}
      />
      <StickerPricingCard
        title="Student"
        prices={prices}
        userType="student"
        onPriceChange={handlePriceChange}
        onSave={handleSave}
      />
    </div>
  );
}

export default StickerPricing;
