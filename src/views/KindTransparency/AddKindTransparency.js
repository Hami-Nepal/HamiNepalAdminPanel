import React, {useState, useEffect, useCallback} from 'react';
// @material-ui/core components
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
  formControl: {
    minWidth: 120,
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

export default function TransparencyPage() {
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

  const [name, setName] = useState('');

  const [type, setType] = useState('');
  const [cause, setCause] = useState('');
  const [event, setEvent] = useState('');
  const [currentName, setCurrentName] = useState('');

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [causeTypes, setCauseTypes] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  // const [causeNames, setCauseNames] = useState([]);
  // const [eventNames, setEventNames] = useState([]);
  const [causeEventsNames, setCauseEventsNames] = useState([]);

  useEffect(async () => {
    const cause_types = await axios.get(baseURL + 'cause_type');

    setCauseTypes(cause_types.data.data);
  }, []);

  useEffect(async () => {
    const event_types = await axios.get(baseURL + 'event_type');

    setEventTypes(event_types.data.data);
  }, []);

  useEffect(async () => {
    if (type === 'cause') {
      const {data} = await axios.get(baseURL + 'causes?cause_type=' + cause);
      setCauseEventsNames(data.data);
    } else if (type === 'event') {
      const {data} = await axios.get(baseURL + 'events?type=' + event);
      setCauseEventsNames(data.data);
    }
  }, [type, cause, event]);

  // const handleFile = (e)=>{
  //   console.log(e.target.files)
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   setSelectedFile(file)
  // }

  const history = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    selectedFile?.map((file) => formData.append('photos', file));
    formData.append('type', type);
    formData.append('amount', amount);
    formData.append('description', description);
    formData.append('quantity', quantity);

    type === 'event'
      ? formData.append('event', event)
      : formData.append('cause', cause);

    currentName && type === 'event'
      ? formData.append('event_name', currentName)
      : formData.append('cause_name', currentName);

    axios({
      method: 'POST',
      url: baseURL + 'kindtransparency',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        // console.log(response);
        alert('file uploaded successfully');
        setSubmissionLoading(false);
        history.push('/admin/kindtransparency');
      })
      .catch(function (response) {
        //handle error
        setError(response.message);
        setSubmissionLoading(false);
      });
  };

  return (
    <Card>
      <CardHeader color="danger">
        <h4 className={classes.cardTitleWhite}>Transparency CMS Screen</h4>
        <p className={classes.cardCategoryWhite}>
          For billing and files upload for transparency page
        </p>
        <p className={classes.cardCategoryWhite}>
          Please check the information properly before submitting as it cannot
          be manipulated again for security reasons !
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleUpload}>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl style={{width: '50%'}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Bill Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCauseEventsNames([]);
                }}>
                <MenuItem value={'cause'}>Cause</MenuItem>
                <MenuItem value={'event'}>Events</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          {type === 'cause' ? (
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
          ) : (
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
                    {type[0].toUpperCase()}
                    {type.slice(1)} names
                  </InputLabel>
                  <Select
                    style={{width: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentName}
                    onChange={(e) => {
                      setCurrentName(e.target.value);
                    }}>
                    {causeEventsNames.map((obj) => (
                      <MenuItem
                        key={obj._id}
                        value={obj.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        {obj.name}
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
              label="Balance"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Quantity Provided"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={5}
              placeholder="Enter the description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
              style={{
                width: '500px',
                margin: '30px 0',
                padding: '20px',
                fontSize: '16px',
                fontFamily: 'Roboto',
                color: '#c0c1c2',
                fontWeight: '390',
              }}
            />
          </GridItem>

          <div>
            {/* <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              onInputChange={handleInputChange}
            /> */}
          </div>
          <GridItem xs={12} sm={12} md={12}>
            <h5>Please upload the bill photos</h5>
            <div
              {...getRootProps()}
              // required
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                padding: '20px',
                marginBottom: '20px',
              }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the bills here or...</p>
              ) : (
                <p>Drag 'n' drop bills here, or click to select photos</p>
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
                Uplaod
              </Button>
            )}
          </GridItem>
        </form>
      </CardBody>
    </Card>
  );
}
