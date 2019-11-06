import React from 'react';
import './general.css';

function General(props) {
  const handleOptionUpdate = (setting, value) => {
    props.modifyOption(setting, value);
  };

  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='autoFillCheckbox'
          className='checkbox-custom'
          name='autoFillCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['automatic']}
          onChange={e => handleOptionUpdate('automatic', e.target.checked)}
        />
        <label htmlFor='autoFillCheckbox' className='checkbox-custom-label'>
          Automatic Fill
        </label>
        <input
          id='simTypingCheckbox'
          className='checkbox-custom'
          name='simTypingCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['simulateTyping']}
          onChange={e => handleOptionUpdate('simulateTyping', e.target.checked)}
        />
        <label htmlFor='simTypingCheckbox' className='checkbox-custom-label'>
          Simulate Typing
        </label>
      </div>
    </div>
  );
}

export default General;
