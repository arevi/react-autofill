import React from 'react';
import './general.css';

function General() {
  return (
    <div className='settings-wrapper'>
      <div className='row'>
        <input
          id='autoFillCheckbox'
          class='checkbox-custom'
          name='autoFillCheckbox'
          type='checkbox'
        />
        <label for='autoFillCheckbox' class='checkbox-custom-label'>
          Automatic Fill
        </label>
        <input
          id='simTypingCheckbox'
          class='checkbox-custom'
          name='simTypingCheckbox'
          type='checkbox'
        />
        <label for='simTypingCheckbox' class='checkbox-custom-label'>
          Simulate Typing
        </label>
      </div>
    </div>
  );
}

export default General;
