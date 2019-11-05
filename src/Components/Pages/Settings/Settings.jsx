import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Selector from '../../Selector/Selector';
import General from './General/General';
import Shopify from './Shopify/Shopify';
import Supreme from './Supreme/Supreme';
import Stripe from './Stripe/Stripe';
import './settings.css';

function Settings(props) {
  let history = useHistory();
  const routes = ['General', 'Shopify', 'Supreme', 'Stripe'];

  const updateUI = route => {
    history.push(`/settings/${route.toLowerCase()}`);
  };

  return (
    <div className='page'>
      <Selector
        text='Modify'
        selection={value => updateUI(value)}
        items={routes}
      />
      <Switch>
        <Route path='/settings/shopify' exact component={Shopify} />
        <Route path='/settings/stripe' exact component={Stripe} />
        <Route path='/settings/supreme' exact component={Supreme} />
        <Route path='/settings' component={General} />
      </Switch>
    </div>
  );
}

export default Settings;
