import React, {useEffect, useState} from 'react';
import './style.css';
import {useHistory} from 'react-router-dom';

import Switch from '@mui/material/Switch';

import Logo from '../../assets/img/payment_types/logo.png';
import {Button} from '@mui/material';
import axios from 'axios';
import baseURL from 'api/baseUrl';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const label = {inputProps: {'aria-label': 'Switch demo'}};

export default function Donate() {
  const [anonymousDonation, setAnonymousDonation] = React.useState(false);
  const [donationFor, setDonationFor] = React.useState('cause');
  const [list, setList] = React.useState([]);
  const [currentDonation, setCurrentDonation] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (donationFor === 'cause') {
      axios
        .get(baseURL + 'causes?limit=100000')
        .then(({data}) => setList(data.data));
    } else if (donationFor === 'event') {
      axios
        .get(baseURL + 'events?limit=100000')
        .then(({data}) => setList(data.data));
    } else if (donationFor === 'kindness') {
      axios
        .get(baseURL + 'kindness?limit=100000')
        .then(({data}) => setList(data.data));
    } else if (donationFor === 'volunteer') {
      axios
        .get(baseURL + 'volunteers?limit=100000')
        .then(({data}) => setList(data.data));
    }
  }, [donationFor]);

  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: 0,
    country: '',
    donation_amount: 0,
    payment_type: 'cash',
    donation_message: '',
    isVerified: true,
  });

  const onFieldChange = (field) => (event) =>
    setFields((prev) => ({...prev, [field]: event.target.value}));

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);

    let type =
      donationFor === 'cause'
        ? 'cause'
        : donationFor === 'event'
        ? 'event'
        : donationFor === 'kindness'
        ? 'kindness'
        : donationFor === 'volunteer'
        ? 'volunteer'
        : '';

    const data = {
      ...fields,
      [type]: currentDonation,
      category: donationFor,
      is_anonymous: anonymousDonation,
    };

    if (anonymousDonation) {
      data.first_name = undefined;
      data.last_name = undefined;
      data.email = undefined;
      data.phone_number = undefined;
      data.street_address = undefined;
      data.city = undefined;
      data.state = undefined;
      data.zip_code = undefined;
      data.country = undefined;
    }

    console.log(data);

    axios({
      method: 'POST',
      url: baseURL + 'donations',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        //handle success
        alert('Donation added successfully');
        setLoading(false);
      })
      .catch(function (response) {
        setError(response.message);
        setLoading(false);
      });
  };

  return (
    <div className="donate__container">
      <div className="donate__container__topbar">
        <img src={Logo} alt="logo" />
        <h3>Cash Donation Form</h3>
      </div>

      <div className="donate__container__form">
        <div className="donate__container__form__switch">
          <Switch
            checked={anonymousDonation}
            onClick={() => setAnonymousDonation(!anonymousDonation)}
            {...label}
          />{' '}
          Donate Anonymously
        </div>
        {!anonymousDonation && (
          <>
            <h4>User Details</h4>

            <div className="input__field">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={fields.first_name}
                  onChange={onFieldChange('first_name')}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={fields.last_name}
                  onChange={onFieldChange('last_name')}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={fields.email}
                  onChange={onFieldChange('email')}
                  required
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={fields.phone_number}
                  onChange={onFieldChange('phone_number')}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                value={fields.street_address}
                onChange={onFieldChange('street_address')}
                required
              />
              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={fields.city}
                  onChange={onFieldChange('city')}
                  required
                />
                <input
                  type="text"
                  placeholder="State/Province/Region"
                  value={fields.state}
                  onChange={onFieldChange('state')}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Zip Postal Code"
                  value={fields.zip_code}
                  onChange={onFieldChange('zip_code')}
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={fields.country}
                  onChange={onFieldChange('country')}
                  required
                />
              </div>
            </div>
          </>
        )}

        <h4>Donation Details</h4>
        <div className="donation-details-ko-section">
          <label className="donation__type">
            <h3>
              Donation for{' '}
              <select
                name="Type"
                id="donation for"
                value={donationFor}
                onChange={(e) => setDonationFor(e.target.value)}>
                <option value="cause">Cause</option>
                <option value="event">Event</option>
                <option value="kindness">Act of Kindness</option>
                <option value="administration">Administration</option>
                <option value="volunteer">Volunteers</option>
              </select>
            </h3>
            {donationFor !== 'administration' ? (
              <select
                name="Type"
                id="donation for"
                value={currentDonation}
                onChange={(e) => setCurrentDonation(e.target.value)}>
                {donationFor === 'cause' || donationFor === 'event'
                  ? list.map((data) => (
                      <option value={data._id}>{data.name}</option>
                    ))
                  : donationFor === 'kindness'
                  ? list.map((data) => (
                      <option value={data._id}>{data.title}</option>
                    ))
                  : donationFor === 'volunteer'
                  ? list.map((data) => (
                      <option
                        value={
                          data._id
                        }>{`${data.first_name} ${data.last_name}`}</option>
                    ))
                  : ''}
              </select>
            ) : (
              ''
            )}
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={fields.donation_amount}
            onChange={onFieldChange('donation_amount')}
          />
        </div>
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder="Message"
          value={fields.donation_message}
          onChange={onFieldChange('donation_message')}
          required
          style={{
            width: '90%',
            padding: '25px',
            border: 'none',
            fontSize: '0.9',
            outline: 'none',
            fontFamily: 'Roboto',
            color: 'black',
          }}
        />
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something bad happened — <strong>{error}</strong>
            <br></br>
          </Alert>
        ) : (
          ''
        )}
        <Button type="submit" onClick={handleUpload}>
          {loading ? 'Loading...' : 'Donate'}
        </Button>
      </div>
    </div>
  );
}
