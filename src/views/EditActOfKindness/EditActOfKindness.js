import React, {useState, useEffect, useCallback} from 'react';
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

import baseUrl from '../../api/baseUrl';

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';

// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Checkbox from '@material-ui/core/Checkbox';
// import ListItemText from '@material-ui/core/ListItemText';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
//   getContentAnchorEl: null,
//   anchorOrigin: {
//     vertical: 'bottom',
//     horizontal: 'center',
//   },
//   transformOrigin: {
//     vertical: 'top',
//     horizontal: 'center',
//   },
//   variant: 'menu',
// };

const useStyles = makeStyles(styles);

export default function EditActOfKindness() {
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles);
    setUploadedUrl(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  // input fields state start
  const [results, setResults] = useState('');
  const [balance, setBalance] = useState(0);
  const [details, setDetails] = useState('');
  const [summary, setSummary] = useState('');
  // const [difficulties, setDifficulties] = useState('');
  const [challenges, setChallenges] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // photos to be uploaded in server
  // input fields state end

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('info');
  const [message, setMessage] = React.useState('This is a success message!');

  const [volunteersList, setVolunteersList] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  useEffect(async () => {
    const promises = [
      axios.get(baseUrl + 'kindness/' + window.location.hash.split('/').pop()),
      axios.get(baseUrl + 'volunteers'),
    ];

    const [kindness, volunteer] = await Promise.all(promises);

    const {data: res} = kindness;
    const {data} = res;
    const {data: volunteersRes} = volunteer;

    setVolunteersList(volunteersRes.data);

    setTitle(data.title);
    setChallenges(data.challenges);
    // setDifficulties(data.difficulties);
    setSummary(data.summary);
    setDetails(data.details);
    setResults(data.results);
    setBalance(data.balance);
    setSelectedVolunteers(data.volunteers);
    setUploadedUrl(data.photos);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   if (value[value.length - 1] === 'all') {
  //     setSelected(
  //       selectedVolunteers.length === volunteersList.length
  //         ? []
  //         : volunteersList,
  //     );
  //     return;
  //   }
  //   setSelectedVolunteers(value);
  // };

  console.log(selectedVolunteers);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('challenges', challenges);
    // formData.append('difficulties', difficulties);
    formData.append('summary', summary);
    formData.append('details', details);
    formData.append('results', results);
    formData.append('balance', balance);
    selectedFile?.map((file) => formData.append('photos', file));
    selectedVolunteers?.map((user) => formData.append('volunteers', user));

    axios({
      method: 'PUT',
      url: baseUrl + 'kindness/' + window.location.hash.split('/').pop(),
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        alert('file uploaded successfully');
        setSubmissionLoading(false);
        history.push('/admin/act-of-kindness');
      })
      .catch(function ({response}) {
        //handle error
        // console.log(response);
        setError(response);
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
          <h4 className={classes.cardTitleWhite}>Update Act of kindness</h4>
          <p className={classes.cardCategoryWhite}>
            For creating and uploading images Act of kindness
          </p>
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before submitting .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEventSubmit}>
            <GridItem xs={12} sm={12} md={6}>
              <TextField
                id="standard-basic"
                label="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
                style={{width: '100%', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel>Challenges</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Tell about the challenges."
                value={challenges}
                onChange={(e) => {
                  setChallenges(e.target.value);
                }}
                required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  border: '1px solid',
                  color: 'black',
                }}
              />
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={12}>
              <h5 style={{marginBottom: '-1rem'}}>Difficulties</h5>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Tell about the difficulties"
                value={difficulties}
                onChange={(e) => {
                  setDifficulties(e.target.value);
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
            </GridItem> */}
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel>Summary</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Write a short summary"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
                required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  border: '1px solid',
                  color: 'black',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel>Details</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Write some details about this act of kindness."
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  border: '1px solid',
                  color: 'black',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel>Results</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="What was the result of this event?"
                value={results}
                onChange={(e) => {
                  setResults(e.target.value);
                }}
                required
                style={{
                  width: '95.8%',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  border: '1px solid',
                  color: 'black',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <TextField
                id="standard-basic"
                label="Expected Donation Amount"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
                type="number"
                required
                style={{width: '100%', margin: '30px 0'}}
              />
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="mutiple-select-label">
                Select Volunteer
              </InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selectedVolunteers}
                onChange={handleChange}
                renderValue={(selectedVolunteers) =>
                  selectedVolunteers.join(', ')
                }
                MenuProps={MenuProps}
                style={{width: '50%'}}>
                {volunteersList.map((option) => {
                  console.log(option._id);
                  return (
                    <MenuItem key={`${option._id}`} value={option._id}>
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedVolunteers.indexOf(option._id) > -1}
                        />
                      </ListItemIcon>
                      <img
                        src={option.photo}
                        alt={option.first_name}
                        style={{
                          width: '50px',
                          borderRadius: '50%',
                          marginRight: '.8rem',
                        }}
                      />
                      <ListItemText
                        primary={`${option.first_name} ${option.last_name}`}
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </GridItem> */}
            <GridItem xs={12} sm={12} md={12}>
              <h5>Upload photos of Act Of Kindnes</h5>
              <div
                {...getRootProps()}
                required
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
                  <p>Drop the act of kindness photo here or...</p>
                ) : (
                  <p>
                    Drag 'n' drop act of kindness picture here, or click to
                    select act of kindness photo
                  </p>
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
