import React from 'react';

function Supreme() {
  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='accTermsCheckbox'
          class='checkbox-custom'
          name='accTermsCheckbox'
          type='checkbox'
        />
        <label for='accTermsCheckbox' class='checkbox-custom-label'>
          Accept Terms
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

export default Supreme;
