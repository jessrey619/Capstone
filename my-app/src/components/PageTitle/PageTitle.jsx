import React from 'react';
import './pageTitle.css';
import Breadcrumb from '../Main/breadcrumb';

function PageTitle({ page }) {
  return (
    <div className='pagetitle'>
      <h1>{page}</h1>
      <nav>
        <Breadcrumb />
      </nav>
    </div>
  );
}

export default PageTitle;