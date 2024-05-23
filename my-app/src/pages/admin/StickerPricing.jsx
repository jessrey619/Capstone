import React, { useState, useEffect } from 'react';
import '../../Components/Main/main.css';
import StickerPricingCard from '../../Components/Card/StickerPricingCard'; // Import StickerPricingCard component

function StickerPricing() {
  const [prices, setPrices] = useState({}); // State to store pricing data
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state

  // Function to fetch initial pricing data from the database (replace with your API endpoint)
  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/prices');
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle changes in price input fields
  const handlePriceChange = (event, userType, field) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [`${userType}_${field}`]: event.target.value,
    }));
  };

  // Function to handle changes in start and end date pickers
  const handleDateChange = (event, userType, field) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [field]: event.target.value,
    }));
  };

  // Function to handle saving pricing changes (implementation depends on backend)
  const handleSave = async (userType) => {
    try {
      const response = await fetch('/api/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [userType]: prices[userType] }),
      });
      if (response.ok) {
        console.log('Prices saved successfully!');
      } else {
        console.error('Error saving prices:', await response.text());
      }
    } catch (error) {
      console.error('Error saving prices:', error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []); // Fetch data on component mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      <StickerPricingCard
        title="Faculty"
        prices={prices} 
        userType="faculty"
        onPriceChange={handlePriceChange}
        onStartDateChange={handleDateChange}
        onEndDateChange={handleDateChange}
        onSave={handleSave}
      />
      <StickerPricingCard
        title="Student"
        prices={prices} 
        userType="student"
        onPriceChange={handlePriceChange}
        onStartDateChange={handleDateChange}
        onEndDateChange={handleDateChange}
        onSave={handleSave}
      />
    </div>
  );
}

export default StickerPricing;
