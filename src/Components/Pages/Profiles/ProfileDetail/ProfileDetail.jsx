import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addProfile,
  removeProfile,
  editProfile
} from '../../../../actions/profileActions';

import './profiledetail.css';

function ProfileDetail(props) {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: '',
    shipping: {
      email: '',
      first_name: '',
      last_name: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      state: '',
      zipcode: '',
      phone: ''
    },
    billing: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipcode: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      country: '',
      cardType: ''
    }
  });

  useEffect(() => {
    if (props.activeEdit) {
      setProfile(props.activeEdit);
    }
  }, [props.activeEdit]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const modifyProfile = (e, field, type) => {
    let updatedProfile = { ...profile };
    if (type) {
      updatedProfile[type][field] = e.target.value;
    } else {
      updatedProfile[field] = e.target.value;
    }
    setProfile(updatedProfile);
  };

  const addOrUpdateProfile = () => {
    let matches = props.allProfiles.filter(item => item.name === profile.name);

    if (matches.length === 0) {
      dispatch(addProfile(profile));
    } else {
      dispatch(editProfile(profile));
    }
  };

  return (
    <div id='profile-detail'>
      <h2 className='border-label'>Shipping Details</h2>
      <div className='wrapper'>
        <div className='col-1'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            autoComplete='email'
            value={profile ? profile.shipping.email : ''}
            onChange={e => modifyProfile(e, 'email', 'shipping')}
          />
          <label htmlFor='phoneNumber'>Phone</label>
          <input
            type='text'
            name='phoneNumber'
            autoComplete='tel'
            value={profile ? profile.shipping.phone : ''}
            onChange={e => modifyProfile(e, 'phone', 'shipping')}
          />
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            autoComplete='given-name'
            value={profile ? profile.shipping.first_name : ''}
            onChange={e => modifyProfile(e, 'first_name', 'shipping')}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            autoComplete='family-name'
            value={profile ? profile.shipping.last_name : ''}
            onChange={e => modifyProfile(e, 'last_name', 'shipping')}
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            autoComplete='country-name'
            value={profile ? profile.shipping.country : ''}
            onChange={e => modifyProfile(e, 'country', 'shipping')}
          />
        </div>
        <div className='col-2'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            autoComplete='street-address'
            value={profile ? profile.shipping.address : ''}
            onChange={e => modifyProfile(e, 'address', 'shipping')}
          />
          <label htmlFor='apartment'>Apartment</label>
          <input
            type='text'
            name='apartment'
            autoComplete='address-line1'
            value={profile ? profile.shipping.apartment : ''}
            onChange={e => modifyProfile(e, 'apartment', 'shipping')}
          />
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            autoComplete='address-level2'
            value={profile ? profile.shipping.city : ''}
            onChange={e => modifyProfile(e, 'city', 'shipping')}
          />
          <label htmlFor='state'>State</label>
          <input
            type='text'
            name='state'
            autoComplete='address-level1'
            value={profile ? profile.shipping.state : ''}
            onChange={e => modifyProfile(e, 'state', 'shipping')}
          />
          <label htmlFor='zipcode'>Zip Code</label>
          <input
            type='text'
            name='zipcode'
            autoComplete='postal-code'
            value={profile ? profile.shipping.zipcode : ''}
            onChange={e => modifyProfile(e, 'zipcode', 'shipping')}
          />
        </div>
      </div>
      <h2 className='border-label'>Billing Details</h2>
      <div className='wrapper'>
        <div className='col-1'>
          <label htmlFor='cardNumber'>Card Number</label>
          <input
            type='text'
            name='cardNumber'
            autoComplete='cc-number'
            value={profile ? profile.billing.cardNumber : ''}
            onChange={e => modifyProfile(e, 'cardNumber', 'billing')}
          />
          <label htmlFor='cardType'>Card Type</label>
          <select
            name='cardType'
            id='cardTypeSelect'
            autoComplete='cc-type'
            value={profile ? profile.billing.cardType : 'Visa'}
            onChange={e => modifyProfile(e, 'billing', 'cardType')}
          >
            <option value='AMEX'>American Express</option>
            <option value='Discover'>Discover</option>
            <option value='Mastercard'>Mastercard</option>
            <option value='Visa'>Visa</option>
          </select>
        </div>
        <div className='split-col'>
          <div className='col-1'>
            <label htmlFor='cardZip'>Billing Zip</label>
            <input
              type='text'
              name='cardZip'
              autoComplete='postal-code'
              value={profile ? profile.billing.zipcode : ''}
              onChange={e => modifyProfile(e, 'zipcode', 'billing')}
            />
            <label htmlFor='expMonth'>Exp. Month</label>
            <select
              name='expMonth'
              id='expMonthSelect'
              autoComplete='cc-exp-month'
              value={profile ? profile.billing.expMonth : '01'}
              onChange={e => modifyProfile(e, 'expMonth', 'billing')}
            >
              <option value='01'>01</option>
              <option value='02'>02</option>
              <option value='03'>03</option>
              <option value='04'>04</option>
              <option value='05'>05</option>
              <option value='06'>06</option>
              <option value='07'>07</option>
              <option value='08'>08</option>
              <option value='09'>09</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </select>
          </div>
          <div className='col-2'>
            <label htmlFor='cardCVV'>CVV</label>
            <input
              type='text'
              name='cardCVV'
              autoComplete='cc-csc'
              value={profile ? profile.billing.cvv : ''}
              onChange={e => modifyProfile(e, 'cvv', 'billing')}
            />
            <label htmlFor='expYear'>Exp. Year</label>
            <select
              name='expYear'
              id='expYearSelect'
              autoComplete='cc-exp-year'
              value={profile ? profile.billing.expYear : '2019'}
              onChange={e => modifyProfile(e, 'expYear', 'billing')}
            >
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>
            </select>
          </div>
        </div>
      </div>
      <h2 className='border-label'>Controls</h2>
      <div className='wrapper'>
        <div className='col-1'>
          <label htmlFor='profileName'>Profile Name</label>
          <input
            type='text'
            name='profileName'
            value={profile ? profile.name : ''}
            onChange={e => modifyProfile(e, 'name')}
          />
        </div>
        <div className='col-2' id='profileControls'>
          <button className='btn save' onClick={addOrUpdateProfile}>
            Save
          </button>
          <button
            className='btn delete'
            onClick={() => dispatch(removeProfile(profile))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
