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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

export default function AddNewCausePage() {
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

  const [cause_type, setCauseType] = useState('');

  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const [inputValue, setInputValue] = useState();

  const handleTypeChange = (event) => {
    setCauseType(event.target.value);
  };
  const handleInputChange = (newValue) => {
    let inputValue = newValue.replace(/\W/g, '');
    setInputValue({inputValue});
  };

  const [data, setData] = useState('');
  const [ckData, setCkData] = useState(0);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setData(data);
  };

  const handleCauseSubmit = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cause_type', cause_type);
    formData.append('photo', selectedFile);
    formData.append('summary', summary);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('balance', balance);

    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/causes',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function (response) {
        //handle success
        alert('File uploaded successfully');
        setSubmissionLoading(false);
      })
      .catch(function (response) {
        //handle error
        setError(response.message);
        setSubmissionLoading(false);
      });
  };

  return (
    <>
      <>
        <div></div>
      </>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Add a New Cause Screen</h4>
          <p className={classes.cardCategoryWhite}>
            For creating and uploading images for new causes
          </p>
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before submitting .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleCauseSubmit}>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                id="standard-basic"
                label="Cause Name"
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
                label="Cause Type"
                value={cause_type}
                onChange={(e) => {
                  setCauseType(e.target.value);
                }}
                required
                style={{width: '500px', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                id="standard-basic"
                label="Fund amount for cause"
                value={balance}
                type="number"
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
                required
                style={{width: '500px', margin: '30px 0'}}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl
                style={{width: '100%'}}
                className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}>
                  <MenuItem value={'normal'}>normal</MenuItem>
                  <MenuItem value={'important'}>important</MenuItem>
                  <MenuItem value={'super'}>super</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              {/* <TextField
              id="standard-basic"
              label="Fund amount for event"
              type="number"
              value={balance}
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              required
              style={{width: '500px', margin: '30px 0'}}
            /> */}
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short summary about the cause not exceeding 250 character"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
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
            <GridItem xs={12} sm={12} md={4}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter description about the cause not exceeding 250 character"
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
            <GridItem xs={12} sm={12} md={4}>
              <h5>Please upload Cause Photo</h5>
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
                  <p>Drop the cause photo here or...</p>
                ) : (
                  <p>
                    Drag 'n' drop a cause picture here, or click to select
                    causes photo
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
            <GridItem xs={12} sm={12} md={4}>
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
