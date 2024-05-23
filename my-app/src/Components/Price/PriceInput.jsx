function PriceInput({ label, id, value, onChange }) {
    return (
      <div>
        <label htmlFor={id}>{label}:</label>
        <input type="number" id={id} value={value || ''} onChange={onChange} />
      </div>
    );
  }
  
  export default PriceInput;
  