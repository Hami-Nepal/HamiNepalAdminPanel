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
import baseUrl from '../../api/baseUrl';

import AsyncSelect from 'react-select/async';

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

const loadOptions = (inputValue, callback) => {
  console.log(inputValue);
};

export default function EditMember({match}) {
  const id = match.params.id;
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    // const reader = new FileReader();
    // reader.readAsArrayBuffer(acceptedFiles[0])
    // console.log(reader,acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]);
    setUploadedUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [name, setName] = useState('');

  const [designation, setDesignation] = useState('');
  const [message, setMessage] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instaLink, setInstaLink] = useState('');
  const [twitterLink, setTwitter] = useState('');
  const [linkedLink, setLinkedLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  useEffect(async () => {
    let result = await fetch(baseUrl + 'boardmembers/' + id);
    result = await result.json();

    setName(result.data.members.name);
    setDesignation(result.data.members.designation);
    setMessage(result.data.members.message);
    setFacebookLink(result.data.members.facebookLink);
    setInstaLink(result.data.members.instaLink);
    setTwitter(result.data.members.twitterLink);
    setLinkedLink(result.data.members.linkedLink);
    setUploadedUrl(result.data.members.photo);
  }, []);

  const history = useHistory();

  // const handleFile = (e)=>{
  //   console.log(e.target.files)
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   setSelectedFile(file)
  // }

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', selectedFile);
    formData.append('designation', designation);
    formData.append('facebookLink', facebookLink);
    formData.append('instaLink', instaLink);
    formData.append('twitterLink', twitterLink);
    formData.append('linkedLink', linkedLink);
    formData.append('message', message);

    axios({
      method: 'PUT',
      url: baseUrl + 'boardmembers/' + id,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        alert('Member Updated Successfully');
        setSubmissionLoading(false);
        history.push('/admin/board');
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
        <h4 className={classes.cardTitleWhite}>Update Member Screen</h4>
        <p className={classes.cardCategoryWhite}>
          For Updating board memmbers of Hami Nepal
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
            <TextField
              id="standard-basic"
              label="Designation"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Bill Type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem> */}
          <GridItem xs={12} sm={12} md={4}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={5}
              placeholder="Enter the message from board mmeber"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
              style={{
                width: '500px',
                margin: '30px 0',
                padding: '20px',
                fontSize: '16px',
                fontFamily: 'Roboto',
                color: 'black',
                fontWeight: '400',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Facebook link"
              value={facebookLink}
              onChange={(e) => {
                setFacebookLink(e.target.value);
              }}
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Instagram link"
              value={instaLink}
              onChange={(e) => {
                setInstaLink(e.target.value);
              }}
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Twitter link"
              value={twitterLink}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              style={{width: '500px', margin: '30px 0'}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-basic"
              label="LinkedIn link"
              value={linkedLink}
              onChange={(e) => {
                setLinkedLink(e.target.value);
              }}
              style={{width: '500px', margin: '30px 0'}}
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
            <h5>Please upload the Member Profile Photo</h5>
            <div
              {...getRootProps()}
              required
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                padding: '20px',
                marginBottom: '20px',
                minHeight: '200px',
              }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the photo here or...</p>
              ) : (
                <p>Drag 'n' drop a photo here, or click to select the photo</p>
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
          <GridItem xs={12} sm={12} md={4}>
            {submissionLoading ? (
              <CircularProgress />
            ) : (
              <Button color="danger" type="submit">
                Update Member
              </Button>
            )}
          </GridItem>
        </form>
      </CardBody>
    </Card>
  );
}
