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
          class='checkbox-custom'
          name='accTermsCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['checkTerms']}
          onChange={e => handleOptionUpdate('checkTerms', e.target.checked)}
        />
        <label for='accTermsCheckbox' class='checkbox-custom-label'>
          Accept Terms
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

export default Supreme;
