import React from 'react';

function Stripe(props) {
  const handleOptionUpdate = (setting, value) => {
    props.modifyOption(setting, value);
  };

  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='compFillCheckbox'
          class='checkbox-custom'
          name='compFillCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['comprehensiveFill']}
          onChange={e =>
            handleOptionUpdate('comprehensiveFill', e.target.checked)
          }
        />
        <label for='compFillCheckbox' class='checkbox-custom-label'>
          Comprehensive Fill
        </label>
        <input
          id='procPaymentCheckbox'
          class='checkbox-custom'
          name='procPaymentCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['processPayment']}
          onChange={e => handleOptionUpdate('processPayment', e.target.checked)}
        />
        <label for='procPaymentCheckbox' class='checkbox-custom-label'>
          Process Payment
        </label>
      </div>
    </div>
  );
}

export default Stripe;
