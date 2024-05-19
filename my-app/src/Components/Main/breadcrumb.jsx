// Breadcrumb.jsx
import React from 'react';

function Breadcrumb({ page }) {
  return (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <a href='/'>
          <i className='bi bi-house-door'></i>
        </a>
      </li>
      <li className='breadcrumb-item active'>{page}</li>
    </ol>
  );
}

export default Breadcrumb;
