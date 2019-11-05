import React from 'react';

function Stripe() {
  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='compFillCheckbox'
          class='checkbox-custom'
          name='compFillCheckbox'
          type='checkbox'
        />
        <label for='compFillCheckbox' class='checkbox-custom-label'>
          Comprehensive Fill
        </label>
        <input
          id='procPaymentCheckbox'
          class='checkbox-custom'
          name='procPaymentCheckbox'
          type='checkbox'
        />
        <label for='procPaymentCheckbox' class='checkbox-custom-label'>
          Process Payment
        </label>
      </div>
    </div>
  );
}

export default Stripe;
