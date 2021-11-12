import React, {useState, useEffect, useCallback} from 'react';
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

import AsyncSelect from 'react-select/async';

import baseUrl from '../../api/baseUrl'

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

export default function TransparencyPage() {
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

  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  // const handleFile = (e)=>{
  //   console.log(e.target.files)
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   setSelectedFile(file)
  // }

  const [inputValue, setInputValue] = useState();

  const handleInputChange = (newValue) => {
    let inputValue = newValue.replace(/\W/g, '');
    setInputValue({inputValue});
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();

    formData.append('video', selectedFile);

    formData.append('description', description);

    axios({
      method: 'PUT',
      url: baseUrl + 'homepage/613e3067845f7e2e78c5863c',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert('file updated successfully');
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
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Home Video Upload Screen</h4>
        <p className={classes.cardCategoryWhite}>
          For uploading files for Home page
        </p>
        <p className={classes.cardCategoryWhite}>
          Please check the information properly before uploading as it cannot be
          manipulated again for security reasons !
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleUpload}>
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
              placeholder="Enter the Content"
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
          <GridItem xs={12} sm={12} md={4}>
            <h5>Please upload a Home Video</h5>
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
                <p>Drop the Video here or...</p>
              ) : (
                <p>Drag 'n' drop a Video here, or click to select the video</p>
              )}

              {uploadedUrl && (
                <video
                  src={uploadedUrl}
                  style={{height: '175px'}}
                  type="video/mp4"
                  autoPlay></video>
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
              <Button color="primary" type="submit">
                Update
              </Button>
            )}
          </GridItem>
        </form>
      </CardBody>
    </Card>
  );
}
