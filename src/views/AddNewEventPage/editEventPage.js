import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useHistory} from 'react-router-dom';
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

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';
import baseUrl from '../../api/baseUrl';

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  formControl: {
    minWidth: 120,
  },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
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

export default function AddNewEventPage({match}) {
  const id = match.params.id;
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles);
    setUploadedUrl(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [ckEditor, setCkEditor] = useState(null);

  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('');
  const [balance, setBalance] = useState();
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [challenges, setChallenges] = useState('');

  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('info');
  const [message, setMessage] = React.useState('This is a success message!');
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(async () => {
    let result = await fetch(baseUrl + 'events/' + id);
    result = await result.json();

    setName(result.data.name);
    setType(result.data.type);
    setBalance(result.data.balance);
    setSummary(result.data.summary);
    setDescription(result.data.description);
    setCountry(result.data.country);
    setState(result.data.state);
    setCity(result.data.city);
    setStreet(result.data.street_address);
    setDifficulties(result.data.difficulties);
    setChallenges(result.data.challenges);
    setUploadedUrl(result.data.photos);
  }, []);

  useEffect(async () => {
    const event_types = await axios.get(baseUrl + 'event_type');

    setEventTypes(event_types.data.data);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const [imageKeys, setImageKeys] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const history = useHistory();

  const handleEventUpdate = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    selectedFile?.map((file) => formData.append('photos', file));
    formData.append('balance', balance);
    formData.append('summary', summary);
    formData.append('description', description);
    formData.append('challenges', challenges);
    formData.append('difficulties', difficulties);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('street_address', street);

    axios({
      method: 'PUT',
      url: baseUrl + 'events/' + id,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success

        alert('Event updated successfully');
        setSubmissionLoading(false);
        history.push('/admin/events');
      })
      .catch(function (response) {
        //handle error

        setError(response.message);
        setSubmissionLoading(false);
      });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Edit Event Screen</h4>
          <p className={classes.cardCategoryWhite}>
            For updating images for events
          </p>
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before submitting .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEventUpdate}>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Event Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4rem',
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
                    value={type}
                    onChange={handleTypeChange}>
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
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Fund Amount"
                type="number"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
                // required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">Summary</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short summary about the event not exceeding 250 character"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
                // required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">Description</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short description about the event"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                // required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{width: '50%'}}
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}>
                  <MenuItem value={'Province 1'}>Province 1</MenuItem>
                  <MenuItem value={'Province 2'}>Province 2</MenuItem>
                  <MenuItem value={'Bagmati'}>Bagmati</MenuItem>
                  <MenuItem value={'Gandaki'}>Gandaki</MenuItem>
                  <MenuItem value={'Lumbini'}>Lumbini</MenuItem>
                  <MenuItem value={'Karnali'}>Karnali</MenuItem>
                  <MenuItem value={'Sudurpashchim'}>Sudurpaschim</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                // required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">
                Difficulties
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter the difficulties about the event not exceeding 250 character"
                value={difficulties}
                onChange={(e) => {
                  setDifficulties(e.target.value);
                }}
                // required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">Challenges</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter the challenges about the event not exceeding 250 character"
                value={summary}
                onChange={(e) => {
                  setChallenges(e.target.value);
                }}
                // required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem>
            <div></div>
            <GridItem xs={12} sm={12} md={12}>
              <h5>Please upload an Event Photo</h5>
              <div
                {...getRootProps()}
                required
                style={{
                  cursor: 'pointer',
                  border: '1px solid gray',
                  padding: '20px',
                  marginBottom: '20px',
                }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the event photo here or...</p>
                ) : (
                  <p>
                    Drag 'n' drop a event picture here, or click to select
                    events photo
                  </p>
                )}
                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                  {uploadedUrl.length &&
                    uploadedUrl.map((url) => (
                      <img src={url} style={{height: '50px'}} />
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
            <GridItem xs={12} sm={12} md={12}>
              {submissionLoading ? (
                <CircularProgress />
              ) : (
                <Button color="danger" type="submit">
                  Update
                </Button>
              )}
            </GridItem>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
