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

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import baseURL from '../../api/baseUrl';

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

export default function AddNewCausePage({match}) {
  const [tempdata, setTempData] = React.useState();
  const id = match.params.id;
  const [summary, setSummary] = useState('');
  React.useEffect(() => {
    fetch(baseURL+'causes/' + id)
      .then((response) => response.json())
      .then((data) => {
      });
  }, []);

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

  const [type, setType] = useState('');

  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const [inputValue, setInputValue] = useState();

  const handleTypeChange = (event) => {
    setType(event.target.value);
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

  const handleCauseUpdate = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('photo', selectedFile);
    formData.append('summary', summary);
    formData.append('description', description);

    axios({
      method: 'PATCH',
      url: baseUrl + 'causes/' + id,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function (response) {
        //handle success
        alert('Updated successfully');
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
          <h4 className={classes.cardTitleWhite}>Edit the Cause</h4>
          {/* <p className={classes.cardCategoryWhite}>
            For creating and uploading images for new causes
          </p> */}
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before updating .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleCauseUpdate}>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                id="standard-basic"
                label="Cause Name"
                value={tempdata ? tempdata.cause.name : name}
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
                value={summary}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
                style={{width: '500px', margin: '30px 0'}}
              />
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
                value={tempdata ? tempdata.cause.summary : summary}
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
            <GridItem xs={12} sm={12} md={4}></GridItem>
            <CKEditor
              editor={ClassicEditor}
              data={tempdata ? tempdata.cause.description : description}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();

                setDescription(data);
              }}
            />
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
