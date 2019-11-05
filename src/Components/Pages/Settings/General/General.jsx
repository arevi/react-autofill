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
          class='checkbox-custom'
          name='autoFillCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['automatic']}
          onChange={e => handleOptionUpdate('automatic', e.target.checked)}
        />
        <label for='autoFillCheckbox' class='checkbox-custom-label'>
          Automatic Fill
        </label>
        <input
          id='simTypingCheckbox'
          class='checkbox-custom'
          name='simTypingCheckbox'
          type='checkbox'
          defaultChecked={props.initialValues['simulateTyping']}
          onChange={e => handleOptionUpdate('simulateTyping', e.target.checked)}
        />
        <label for='simTypingCheckbox' class='checkbox-custom-label'>
          Simulate Typing
        </label>
      </div>
    </div>
  );
}

export default General;
