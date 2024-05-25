import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link to='/'>
          <i className='bi bi-house-door'></i>
        </Link>
      </li>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // Convert the value to a more readable format if necessary
        const readableValue = value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

        return isLast ? (
          <li key={to} className='breadcrumb-item active'>
            {readableValue}
          </li>
        ) : (
          <li key={to} className='breadcrumb-item'>
            <Link to={to}>{readableValue}</Link>
          </li>
        );
      })}
    </ol>
  );
}

export default Breadcrumb;
