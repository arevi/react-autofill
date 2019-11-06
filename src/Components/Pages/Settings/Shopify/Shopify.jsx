import React from 'react';

function Shopify(props) {
  const handleOptionUpdate = (setting, value) => {
    props.modifyOption(setting, value);
  };

  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='navStepsCheckbox'
          className='checkbox-custom'
          name='navStepsCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['navigateSteps']}
          onChange={e => handleOptionUpdate('navigateSteps', e.target.checked)}
        />
        <label htmlFor='navStepsCheckbox' className='checkbox-custom-label'>
          Navigate Steps
        </label>
        <input
          id='procPaymentCheckbox'
          className='checkbox-custom'
          name='procPaymentCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['processPayment']}
          onChange={e => handleOptionUpdate('processPayment', e.target.checked)}
        />
        <label htmlFor='procPaymentCheckbox' className='checkbox-custom-label'>
          Process Payment
        </label>
      </div>
      <div className='row'>
        <input
          id='skipShipCheckbox'
          className='checkbox-custom'
          name='skipShipCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['skipShipping']}
          onChange={e => handleOptionUpdate('skipShipping', e.target.checked)}
        />
        <label htmlFor='skipShipCheckbox' className='checkbox-custom-label'>
          Skip Shipping
        </label>
      </div>
    </div>
  );
}

export default Shopify;
