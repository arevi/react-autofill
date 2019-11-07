import React, { useEffect, useState } from 'react';
import './profiledetail.css';

function ProfileDetail(props) {
  const [profile, setProfile] = useState({
    name: '',
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
      setProfile(JSON.parse(JSON.stringify(props.activeEdit)));
    }
  }, [props.activeEdit]);

  const modifyProfile = (e, field, type) => {
    let updatedProfile = { ...profile };
    if (type) {
      updatedProfile[type][field] = e.target.value;
    } else {
      updatedProfile[field] = e.target.value;
    }

    setProfile(updatedProfile);
  };

  const addUpdateProfile = () => {
    props.updateProfile(profile);
  };

  const removeProfile = () => {
    props.deleteProfile(profile);
  };

  return (
    <div id='profile-detail'>
      <h2 className='border-label'>billing Details</h2>
      <div className='wrapper'>
        <div className='col-1'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            autoComplete='email'
            value={profile ? profile.billing.email : ''}
            onChange={e => modifyProfile(e, 'email', 'billing')}
          />
          <label htmlFor='phoneNumber'>Phone</label>
          <input
            type='text'
            name='phoneNumber'
            autoComplete='tel'
            value={profile ? profile.billing.phone : ''}
            onChange={e => modifyProfile(e, 'phone', 'billing')}
          />
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            autoComplete='given-name'
            value={profile ? profile.billing.first_name : ''}
            onChange={e => modifyProfile(e, 'first_name', 'billing')}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            autoComplete='family-name'
            value={profile ? profile.billing.last_name : ''}
            onChange={e => modifyProfile(e, 'last_name', 'billing')}
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            autoComplete='country-name'
            value={profile ? profile.billing.country : ''}
            onChange={e => modifyProfile(e, 'country', 'billing')}
          />
        </div>
        <div className='col-2'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            autoComplete='street-address'
            value={profile ? profile.billing.address : ''}
            onChange={e => modifyProfile(e, 'address', 'billing')}
          />
          <label htmlFor='apartment'>Apartment</label>
          <input
            type='text'
            name='apartment'
            autoComplete='address-line1'
            value={profile ? profile.billing.apartment : ''}
            onChange={e => modifyProfile(e, 'apartment', 'billing')}
          />
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            autoComplete='address-level2'
            value={profile ? profile.billing.city : ''}
            onChange={e => modifyProfile(e, 'city', 'billing')}
          />
          <label htmlFor='state'>State</label>
          <input
            type='text'
            name='state'
            autoComplete='address-level1'
            value={profile ? profile.billing.state : ''}
            onChange={e => modifyProfile(e, 'state', 'billing')}
          />
          <label htmlFor='zipcode'>Zip Code</label>
          <input
            type='text'
            name='zipcode'
            autoComplete='postal-code'
            value={profile ? profile.billing.zipcode : ''}
            onChange={e => modifyProfile(e, 'zipcode', 'billing')}
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
            onChange={e => modifyProfile(e, 'cardType', 'billing')}
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
          <button className='btn save' onClick={() => addUpdateProfile()}>
            Save
          </button>
          <button className='btn delete' onClick={() => removeProfile()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
