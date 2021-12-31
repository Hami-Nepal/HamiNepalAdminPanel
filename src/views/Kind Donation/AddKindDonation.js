import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
// @material-ui/core components

import {useDropzone} from 'react-dropzone';
import {makeStyles} from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import baseURL from 'api/baseUrl';

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function KindDonation() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    // const reader = new FileReader();
    // reader.readAsArrayBuffer(acceptedFiles[0])
    // console.log(reader,acceptedFiles[0]);
    setSelectedFile(acceptedFiles);
    setUploadedUrl(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [donerType, setDonerType] = useState('');

  const [donerFullName, setDonerFullName] = useState('');
  const [donerEmail, setDonerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  const [cause, setCause] = useState('');
  const [event, setEvent] = useState('');
  const [causeTypes, setCauseTypes] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [causeEventsNames, setCauseEventsNames] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [donatedItem, setDonatedItem] = useState('');
  const [itemWorth, setItemWorth] = useState();
  const [quantity, setQuantity] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState([]);

  useEffect(async () => {
    const cause_types = await axios.get(baseURL + 'cause_type' + '?limit=1000');

    setCauseTypes(cause_types.data.data);
  }, []);

  useEffect(async () => {
    const event_types = await axios.get(baseURL + 'event_type' + '?limit=1000');

    setEventTypes(event_types.data.data);
  }, []);

  useEffect(async () => {
    if (category === 'cause') {
      const {data} = await axios.get(
        baseURL + 'causes?cause_type=' + cause + '&limit=10000',
      );
      setCauseEventsNames(data.data);
    } else if (category === 'event') {
      const {data} = await axios.get(
        baseURL + 'events?type=' + event + '&limit=10000',
      );
      setCauseEventsNames(data.data);
    } else if (category === 'kindness') {
      const {data} = await axios.get(baseURL + 'kindness?limit=10000');
      setCauseEventsNames(data.data);
    }
  }, [category, cause, event]);

  const history = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('donerType', donerType);
    selectedFile?.map((file) => formData.append('photos', file));
    formData.append('donerFullName', donerFullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('donatedItem', donatedItem);
    formData.append('itemWorth', itemWorth);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('donerEmail', donerEmail);
    category === 'event'
      ? formData.append('event', event)
      : category === 'cause'
      ? formData.append('cause', cause)
      : '';

    currentName && category === 'event'
      ? formData.append('event_name', currentName)
      : category === 'cause'
      ? formData.append('cause_name', currentName)
      : formData.append('kindness', currentName);

    axios({
      method: 'POST',
      url: baseURL + 'kinddonation',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        alert('Kind Donation added successfully');
        setSubmissionLoading(false);
        history.push('/admin/kinddonations');
      })
      .catch(function (response) {
        setError(response.message);
        setSubmissionLoading(false);
      });
  };

  return (
    <Card>
      <CardHeader color="danger">
        <h4 className={classes.cardTitleWhite}>Add Kind Donation</h4>
        <p className={classes.cardCategoryWhite}>
          For adding the kind Donation to Hami Nepal
        </p>
        <p className={classes.cardCategoryWhite}>
          Please check the information properly before submitting as it cannot
          be manipulated again for security reasons !
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleUpload}>
          <GridItem xs={12} sm={12} md={6} style={{marginBottom: '1rem'}}>
            <FormControl style={{width: '50%'}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Donor Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={donerType}
                onChange={(e) => {
                  setDonerType(e.target.value);
                }}>
                <MenuItem value={'Organization'}>Organization</MenuItem>
                <MenuItem value={'Individual'}>Individual</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <FormControl style={{width: '50%'}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Donation Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCauseEventsNames([]);
                }}>
                <MenuItem value={'cause'}>Cause</MenuItem>
                <MenuItem value={'event'}>Event</MenuItem>
                <MenuItem value={'kindness'}>Act of Kindness</MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          {category === 'cause' ? (
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4rem',
                  margin: '30px 0',
                }}
                className={classes.formControl}>
                <div style={{width: '100%'}}>
                  <InputLabel id="demo-simple-select-label">
                    Cause Type
                  </InputLabel>
                  <Select
                    style={{width: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cause}
                    onChange={(e) => {
                      setCause(e.target.value);
                    }}>
                    {causeTypes.map((obj) => (
                      <MenuItem
                        key={obj.cause_type}
                        value={obj.cause_type}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        {obj.cause_type}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}></div>
              </FormControl>
            </GridItem>
          ) : category === 'event' ? (
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4rem',
                  margin: '30px 0',
                }}
                className={classes.formControl}>
                <div style={{width: '100%'}}>
                  <InputLabel id="demo-simple-select-label">
                    Event Type
                  </InputLabel>
                  <Select
                    style={{width: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={event}
                    onChange={(e) => {
                      setEvent(e.target.value);
                    }}>
                    {eventTypes.map((obj) => (
                      <MenuItem
                        key={obj.event_type}
                        value={obj.event_type}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        {obj.event_type}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}></div>
              </FormControl>
            </GridItem>
          ) : (
            ''
          )}
          {causeEventsNames.length && (
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4rem',
                  margin: '30px 0',
                }}
                className={classes.formControl}>
                <div style={{width: '100%'}}>
                  <InputLabel id="demo-simple-select-label">
                    {category[0].toUpperCase()}
                    {category.slice(1)} names
                  </InputLabel>
                  <Select
                    style={{width: '500px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentName}
                    onChange={(e) => {
                      setCurrentName(e.target.value);
                    }}>
                    {causeEventsNames.map((obj) => (
                      <MenuItem
                        key={obj._id}
                        value={category === 'kindness' ? obj.title : obj.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        {category === 'kindness' ? obj.title : obj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}></div>
              </FormControl>
            </GridItem>
          )}
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Donor Full Name"
              value={donerFullName}
              onChange={(e) => {
                setDonerFullName(e.target.value);
              }}
              required
              style={{width: '500px'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Donor Email"
              value={donerEmail}
              onChange={(e) => {
                setDonerEmail(e.target.value);
              }}
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Donor Phone Number"
              type="number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              style={{width: '500px', margin: '10px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="City Name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Donated Item Name"
              value={donatedItem}
              onChange={(e) => {
                setDonatedItem(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Item Worth Amount"
              type="number"
              value={itemWorth}
              onChange={(e) => {
                setItemWorth(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Items Quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <h5>Please upload the the Donation item photos</h5>
            <div
              {...getRootProps()}
              // required
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '12px',
                minHeight: '200px',
              }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the photos here or...</p>
              ) : (
                <p>Drag 'n' drop here, or click to select photos</p>
              )}
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                {uploadedUrl.length &&
                  uploadedUrl.map((url) => (
                    <img src={url} style={{height: '40px'}} />
                  ))}
              </div>
            </div>
          </GridItem>
          {error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something bad happened — <strong>{error}</strong>
              <br></br>
            </Alert>
          ) : (
            ''
          )}
          <GridItem xs={12} sm={12} md={4}>
            {submissionLoading ? (
              <CircularProgress />
            ) : (
              <Button color="danger" type="submit">
                Upload
              </Button>
            )}
          </GridItem>
        </form>
      </CardBody>
    </Card>
  );
}
