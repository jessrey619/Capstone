import React from 'react';
import PriceInput from '../Price/PriceInput';
import './stickerPricingCard.css';

function NestedCard({ title, fields, prices, userType, onPriceChange }) {
    return (
      <div className="nested-card">
        <h5>{title}</h5>
        <div className="indentation">
          {fields.map((field) => (
            <PriceInput
              key={`${userType}_${field}`}
              label={field.replace(/_/g, ' ')}
              id={`${userType}_${field}`}
              value={prices[`${userType}_${field}`] || ''}
              onChange={(e) => onPriceChange(e, userType, field)}
            />
          ))}
        </div>
      </div>
    );
  }

function StickerPricingCard({ title, prices, userType, onPriceChange, onStartDateChange, onEndDateChange, onSave }) {
  const fourWheelFields = ['four_wheel_parking', 'four_wheel_pickup'];
  const twoWheelFields = ['two_wheel_parking', 'two_wheel_pickup'];

  return (
    <form className="sticker-pricing-card">
      <h3>{title} Pricing</h3>
      <div className="indentation">
        <NestedCard
          title="Four Wheel Vehicle"
          fields={fourWheelFields}
          prices={prices}
          userType={userType}
          onPriceChange={onPriceChange}
        />
        <NestedCard
          title="Two Wheel Vehicle"
          fields={twoWheelFields}
          prices={prices}
          userType={userType}
          onPriceChange={onPriceChange}
        />
        <div>
          <label htmlFor={`${userType}_startDate`}>Start Date (annual):</label>
          <input
            type="date"
            id={`${userType}_startDate`}
            value={prices.startDate || ''}
            onChange={(e) => onStartDateChange(e, userType, 'startDate')}
          />
        </div>
        <div>
          <label htmlFor={`${userType}_endDate`}>End Date (annual):</label>
          <input
            type="date"
            id={`${userType}_endDate`}
            value={prices.endDate || ''}
            onChange={(e) => onEndDateChange(e, userType, 'endDate')}
          />
        </div>
        <div className="button-container">
            <button type="button" onClick={() => onSave(userType)}>Save</button>
            <button type="button" disabled>Cancel</button>
        </div>

      </div>
    </form>
  );
}

export default StickerPricingCard;
