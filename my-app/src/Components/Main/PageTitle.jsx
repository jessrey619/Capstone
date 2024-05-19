// PageTitle.jsx
import React from 'react';
import './pageTitle.css';
import Breadcrumb from './breadcrumb';

function PageTitle({ page }) {
  return (
    <div className='pagetitle'>
      <h1>{page}</h1>
      <nav>
        <Breadcrumb page={page} />
      </nav>
    </div>
  );
}

export default PageTitle;
