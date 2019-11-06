import React from 'react';

function Supreme(props) {
  const handleOptionUpdate = (setting, value) => {
    props.modifyOption(setting, value);
  };

  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='accTermsCheckbox'
          className='checkbox-custom'
          name='accTermsCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['checkTerms']}
          onChange={e => handleOptionUpdate('checkTerms', e.target.checked)}
        />
        <label htmlFor='accTermsCheckbox' className='checkbox-custom-label'>
          Accept Terms
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
    </div>
  );
}

export default Supreme;
