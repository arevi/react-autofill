import React from 'react';

function Shopify() {
  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='navStepsCheckbox'
          className='checkbox-custom'
          name='navStepsCheckbox'
          type='checkbox'
        />
        <label for='navStepsCheckbox' className='checkbox-custom-label'>
          Navigate Steps
        </label>
        <input
          id='procPaymentCheckbox'
          className='checkbox-custom'
          name='procPaymentCheckbox'
          type='checkbox'
        />
        <label for='procPaymentCheckbox' className='checkbox-custom-label'>
          Process Payment
        </label>
      </div>
      <div className='row'>
        <input
          id='skipShipCheckbox'
          className='checkbox-custom'
          name='skipShipCheckbox'
          type='checkbox'
        />
        <label for='skipShipCheckbox' className='checkbox-custom-label'>
          Skip Shipping
        </label>
      </div>
    </div>
  );
}

export default Shopify;
