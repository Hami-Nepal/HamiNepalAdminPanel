import React, {useState, useCallback} from 'react';
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
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import baseUrl from '../../api/baseUrl';

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

export default function TransparencyPage() {
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setUploadedUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const classes = useStyles();

  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();

    formData.append('video', selectedFile);
    formData.append('description', description);
    formData.append('color', color);

    axios({
      method: 'PUT',
      url: baseUrl + 'homepage/619a2b71499553895d06bab7',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        //handle success

        alert('file updated successfully');
        setSubmissionLoading(false);
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
          <GridItem xs={12} sm={12} md={6}>
            <InputLabel style={{marginTop: '1rem'}}>Title</InputLabel>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={5}
              placeholder="Enter the Title"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{
                width: '95.8%',
                margin: '30px 0',
                padding: '20px',
                fontSize: '16px',
                fontFamily: 'Roboto',
                color: 'black',
                fontWeight: '400',
                border: '1px solid',
                color: 'black',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <InputLabel
              id="demo-simple-select-label"
              style={{width: '200px', margin: '10px 0'}}>
              Select Color
            </InputLabel>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input
                id="colorpicker"
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                style={{width: '100px'}}
              />
              <TextField
                id="standard-basic"
                value={color}
                required
                style={{width: '100px', paddingLeft: '20px'}}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Please upload a Home Video</h5>
            <div
              {...getRootProps()}
              required
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '12px',
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
          <GridItem xs={12} sm={12} md={6}>
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
  );
}
