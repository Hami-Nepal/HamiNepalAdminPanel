import React, {useState, useEffect, useCallback} from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from 'utils/UploadAdapter';
import {isEmail} from 'validator';

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

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

export default function AddNewEventPage() {
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setUploadedUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [uploadedUrl, setUploadedUrl] = useState('');
  const [ckEditor, setCkEditor] = useState(null);

  const [first_name, setfirstName] = useState('');
  const [last_name, setlastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [field_of_expertise, setExpertise] = useState('');
  const [country, setCountry] = useState('');
  const [stat, setStat] = useState('');
  const [city, setCity] = useState('');
  const [street_address, setStreet] = useState('');
  const [motivation, setMotivation] = useState('');
  const [bio, setBio] = useState('');
  const [project_worked, setProject_worked] = useState('');
  const [description, setDescription] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const [inputValue, setInputValue] = useState();

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('info');
  const [message, setMessage] = React.useState('This is a success message!');

  const handleClose = () => {
    setOpen(false);
  };
  const handleState = (e) => {
    setStat(e.target.value);
  };

  const handleBlood = (event) => {
    setBloodGroup(event.target.value);
  };

  const [imageKeys, setImageKeys] = useState([]);

  useEffect(() => {
    if (ckEditor) {
      let currentImageKeys = Array.from(
        new DOMParser()
          .parseFromString(ckEditor.getData(), 'text/html')
          .querySelectorAll('img'),
      ).map((img) => img.getAttribute('src'));

      if (currentImageKeys.length < imageKeys.length) {
        // find the missing key
        let difference = imageKeys.filter((x) => !currentImageKeys.includes(x));

        console.log('image delete detected, image key: ', difference);
        if (difference[0]) {
          const key = difference[0].substring(
            difference[0].indexOf('/images/') + 8,
          );
          console.log(key);
          axios
            .get(
              `https://haminepal.herokuapp.com/api/v1/uploads/image/delete`,
              {
                params: {
                  key,
                },
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('userInfo')).token
                  }`,
                },
              },
            )
            .then((resp) => {
              setSeverity('success');
              setMessage('Successfully deleted the image to the server.');
              setOpen(true);
              console.log(resp);
            })
            .catch((err) => {
              setSeverity('error');

              setMessage('Could not delete the file from the server.');

              setOpen(true);

              ckEditor.execute('undo');
              console.error(err);
            });
          // push to /uploads/delete?key=key
        }
      }
      setImageKeys(currentImageKeys);
    }
  }, [description]);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('phone', phone);
    formData.append('photo', selectedFile);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('field_of_expertise', field_of_expertise);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('state', stat);
    formData.append('street_address', street_address);
    formData.append('motivation', motivation);
    formData.append('bio', bio);
    formData.append('project_worked', project_worked);
    formData.append('bloodGroup', bloodGroup);

    axios({
      method: 'POST',
      url: baseUrl + 'volunteers',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert('file uploaded successfully');
        setSubmissionLoading(false);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log(response.message);
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
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Add a New Volunteer Screen</h4>
          <p className={classes.cardCategoryWhite}>
            For creating and uploading images for new volunteer
          </p>
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before submitting .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEventSubmit}>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="First Name"
                value={first_name}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Last Name"
                value={last_name}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Phone Number"
                value={phone}
                type="number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Email"
                value={email}
                validations={vemail}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Age"
                value={age}
                type="number"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Field of Expertise"
                value={field_of_expertise}
                onChange={(e) => {
                  setExpertise(e.target.value);
                }}
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short summary about the motivation to join 250 character"
                value={motivation}
                onChange={(e) => {
                  setMotivation(e.target.value);
                }}
                required
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
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short bio about yourself not exceeding 250 character"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                required
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
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter the names of project worked"
                value={project_worked}
                onChange={(e) => {
                  setProject_worked(e.target.value);
                }}
                required
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
              <FormControl
                style={{width: '50%'}}
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Blood Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bloodGroup}
                  onChange={handleBlood}>
                  <MenuItem value={'A +ve'}>A +ve</MenuItem>
                  <MenuItem value={'A -ve'}>A -ve</MenuItem>
                  <MenuItem value={'B +ve'}>B +ve</MenuItem>
                  <MenuItem value={'B -ve'}>B -ve</MenuItem>
                  <MenuItem value={'O +ve'}>O +ve</MenuItem>
                  <MenuItem value={'O -ve'}>O -ve</MenuItem>
                  <MenuItem value={'AB +ve'}>AB +ve</MenuItem>
                  <MenuItem value={'AB -ve'}>AB -ve</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="standard-basic"
                label="Street Address"
                value={street_address}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
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
              <FormControl
                style={{width: '50%'}}
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={stat}
                  onChange={handleState}>
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
                label="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
                style={{width: '50%', margin: '30px 0'}}
              />
            </GridItem>

            <div></div>
            <GridItem xs={12} sm={12} md={12}>
              <h5>Please upload a volunteer Photo</h5>
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
                {uploadedUrl && (
                  <img src={uploadedUrl} style={{height: '200px'}} />
                )}
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
                <Button color="primary" type="submit">
                  Submit
                </Button>
              )}
            </GridItem>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
