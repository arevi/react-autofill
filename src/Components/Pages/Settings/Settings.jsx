import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOptions } from '../../../actions/optionActions';
import { saveOptions } from '../../../Utils/storageHandler';
import Selector from '../../Selector/Selector';
import General from './General/General';
import Shopify from './Shopify/Shopify';
import Supreme from './Supreme/Supreme';
import Stripe from './Stripe/Stripe';
import './settings.css';

function Settings(props) {
  let dispatch = useDispatch();
  const options = useSelector(state => state.options);

  let history = useHistory();
  const routes = ['General', 'Shopify', 'Supreme', 'Stripe'];

  const updateUI = route => {
    history.push(`/settings/${route.toLowerCase()}`);
  };

  const updateSetting = (site, field, value) => {
    let newOptions = options;
    newOptions[site][field] = value;
    dispatch(setOptions(newOptions));
    saveOptions(newOptions);
  };

  return (
    <div className='page'>
      <Selector
        text='Modify'
        selection={value => updateUI(value)}
        items={routes}
      />
      <Switch>
        <Route
          path='/settings/shopify'
          exact
          component={() => (
            <Shopify
              modifyOption={(field, value) =>
                updateSetting('shopify', field, value)
              }
              initialValues={options.shopify}
            />
          )}
        />
        <Route
          path='/settings/stripe'
          exact
          component={() => (
            <Stripe
              modifyOption={(field, value) =>
                updateSetting('stripe', field, value)
              }
              initialValues={options.stripe}
            />
          )}
        />
        <Route
          path='/settings/supreme'
          exact
          component={() => (
            <Supreme
              modifyOption={(field, value) =>
                updateSetting('supreme', field, value)
              }
              initialValues={options.supreme}
            />
          )}
        />
        <Route
          path='/settings'
          component={() => (
            <General
              modifyOption={(field, value) =>
                updateSetting('general', field, value)
              }
              initialValues={options.general}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default Settings;
