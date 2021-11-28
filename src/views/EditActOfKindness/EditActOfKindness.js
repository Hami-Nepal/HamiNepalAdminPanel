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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from 'utils/UploadAdapter';

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

export default function EditActOfKindness() {
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles);
    setUploadedUrl(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [ckEditor, setCkEditor] = useState(null);

  const [name, setName] = useState('');

  const [balance, setBalance] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  // input fields state start
  const [results, setResults] = useState('');
  const [details, setDetails] = useState('');
  const [summary, setSummary] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [challenges, setChallenges] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // photos to be uploaded in server
  // input fields state end

  const [inputValue, setInputValue] = useState();
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
    setDifficulties(data.difficulties);
    setSummary(data.summary);
    setDetails(data.details);
    setResults(data.results);
    setSelectedVolunteers(data.volunteers);
    setUploadedUrl(data.photos);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const [imageKeys, setImageKeys] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleInputChange = (newValue) => {
    let inputValue = newValue.replace(/\W/g, '');
    setInputValue({inputValue});
  };

  // useEffect(() => {
  //   if (ckEditor) {
  //     let currentImageKeys = Array.from(
  //       new DOMParser()
  //         .parseFromString(ckEditor.getData(), 'text/html')
  //         .querySelectorAll('img'),
  //     ).map((img) => img.getAttribute('src'));

  //     if (currentImageKeys.length < imageKeys.length) {
  //       // find the missing key
  //       let difference = imageKeys.filter((x) => !currentImageKeys.includes(x));

  //       if (difference[0]) {
  //         const key = difference[0].substring(
  //           difference[0].indexOf('/images/') + 8,
  //         );
  //         axios
  //           .get(`${baseUrl}+uploads/image/delete`, {
  //             params: {
  //               key,
  //             },
  //             headers: {
  //               Authorization: `Bearer ${
  //                 JSON.parse(localStorage.getItem('userInfo')).token
  //               }`,
  //             },
  //           })
  //           .then((resp) => {
  //             setSeverity('success');
  //             setMessage('Successfully deleted the image to the server.');
  //             setOpen(true);
  //           })
  //           .catch((err) => {
  //             setSeverity('error');

  //             setMessage('Could not delete the file from the server.');

  //             setOpen(true);

  //             ckEditor.execute('undo');
  //             console.error(err);
  //           });
  //         // push to /uploads/delete?key=key
  //       }
  //     }
  //     setImageKeys(currentImageKeys);
  //   }
  // }, [description]);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('challenges', challenges);
    formData.append('difficulties', difficulties);
    formData.append('summary', summary);
    formData.append('details', details);
    formData.append('results', results);
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
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Add a New Act of kindness</h4>
          <p className={classes.cardCategoryWhite}>
            For creating and uploading images for new events
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
              <h5 style={{marginBottom: '-1rem'}}>Challenges</h5>
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
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5 style={{marginBottom: '-1rem'}}>Summary</h5>
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
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5 style={{marginBottom: '-1rem'}}>Details</h5>
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
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5 style={{marginBottom: '-1rem'}}>Result</h5>
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
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5>Volunteers</h5>
              <div
                style={{
                  border: '1px solid gray',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}>
                {volunteersList.map((user) => (
                  <div
                    key={user._id}
                    style={{
                      border: '1px solid rgb(207, 207, 207)',
                      padding: '.5rem .8rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.8rem',
                    }}>
                    <img
                      src={user.photo}
                      alt={user.first_name}
                      style={{width: '40px', borderRadius: '100rem'}}
                    />
                    <p style={{margin: '0'}}>
                      {user.first_name} {user.last_name}
                    </p>
                    {selectedVolunteers.includes(user._id) ? (
                      <Button
                        color="danger"
                        type="button"
                        onClick={() => {
                          const index = selectedVolunteers.indexOf(user._id);
                          setSelectedVolunteers((prev) => [
                            ...prev.slice(0, index),
                            ...prev.slice(index + 1),
                          ]);
                        }}>
                        Remove
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="button"
                        onClick={() =>
                          setSelectedVolunteers((prev) => [...prev, user._id])
                        }>
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5>Upload photos of event</h5>
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
                <div style={{display: 'flex', gap: '1rem'}}>
                  {uploadedUrl.length &&
                    uploadedUrl.map((url) => (
                      <img src={url} style={{height: '80px'}} />
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
