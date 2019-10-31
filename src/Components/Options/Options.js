import React from 'react';
import './Options.css';

const Options = props => {
  let options = props.options;

  // Function is bound to the selection prop which allows passing of data from child to parent
  const changeSetting = (setting, option) => {
    props.selection(setting, option);
  };

  // Returns the options area of the DOM
  // ClassNames are bound to the options prop, so we can dynamically change styles
  return (
    <div className='options-area'>
      <div className='options-titles'>
        <p className='options-title'>Trigger</p>
        <p className='options-title'>Entry</p>
        <p className='options-title'>Mode</p>
      </div>

      <div className='options-buttons'>
        <div className='button-group'>
          <button
            id={'hotkey-btn'}
            className={options.trigger === 'hotkey' ? 'selected' : ''}
            onClick={() => changeSetting('trigger', 'hotkey')}
          >
            Hotkey
          </button>
          <button
            id={'auto-btn'}
            className={options.trigger === 'auto' ? 'selected' : ''}
            onClick={() => changeSetting('trigger', 'auto')}
          >
            Auto
          </button>
        </div>

        <div className='button-group'>
          <button
            id={'instant-btn'}
            className={options.entry === 'instant' ? 'selected' : ''}
            onClick={() => changeSetting('entry', 'instant')}
          >
            Instant
          </button>
          <button
            id={'typing-btn'}
            className={options.entry === 'typing' ? 'selected' : ''}
            onClick={() => changeSetting('entry', 'typing')}
          >
            Typing
          </button>
        </div>

        <div className='button-group'>
          <button
            id={'normal-btn'}
            className={options.mode === 'normal' ? 'selected' : ''}
            onClick={() => changeSetting('mode', 'normal')}
          >
            Normal
          </button>
          <button
            id={'intercept-btn'}
            className={options.mode === 'intercept' ? 'selected' : ''}
            onClick={() => changeSetting('mode', 'intercept')}
            disabled
          >
            Intercept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
