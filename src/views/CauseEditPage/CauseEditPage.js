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
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
  const id = match.params.id;

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
  const [balance, setBalance] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  // const [difficulties, setDifficulties] = useState('');
  const [challenges, setChallenges] = useState('');
  const [results, setResults] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState([]);

  const [error, setError] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [causeTypes, setCauseTypes] = useState([]);

  useEffect(async () => {
    const cause_types = await axios.get(baseURL + 'cause_type?limit=1000');
    setCauseTypes(cause_types.data.data);
  }, []);

  useEffect(async () => {
    let result = await fetch(baseURL + 'causes/' + id);
    result = await result.json();

    setName(result.data.cause.name);
    setType(result.data.cause.cause_type);
    setBalance(result.data.cause.balance);
    // setDifficulties(result.data.cause.difficulties);
    setChallenges(result.data.cause.challenges);
    setDescription(result.data.cause.description);
    setResults(result.data.cause.results);
    setSummary(result.data.cause.summary);
    setUploadedUrl(result.data.cause.photos);
  }, []);

  const history = useHistory();
  const handleCauseAdd = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cause_type', type);
    selectedFile?.map((file) => formData.append('photos', file));
    formData.append('summary', summary);
    formData.append('description', description);
    formData.append('results', results);
    formData.append('challenges', challenges);
    // formData.append('difficulties', difficulties);
    formData.append('balance', balance);

    axios({
      method: 'PUT',
      url: baseURL + 'causes/' + id,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function (response) {
        //handle success
        alert('cause updated successfully');
        setSubmissionLoading(false);
        history.push('/admin/causes');
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
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Edit the Cause</h4>
          {/* <p className={classes.cardCategoryWhite}>
            For creating and uploading images for new causes
          </p> */}
          <p className={classes.cardCategoryWhite}>
            Please check the information properly before updating .
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleCauseAdd}>
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
                    Cause Type
                  </InputLabel>
                  <Select
                    style={{width: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
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
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                id="standard-basic"
                label="Fund amount for cause"
                type="number"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
                // required
                style={{width: '500px', margin: '30px 0'}}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <InputLabel id="demo-simple-select-label">Summary</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short summary about the cause not exceeding 250 character"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
                // required
                style={{
                  width: '500px',
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
              <h5>Please add the Description</h5>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setDescription(data);
                }}
              />
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={4}>
              <InputLabel id="demo-simple-select-label">Description</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter a short description about the cause"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                // required
                style={{
                  width: '500px',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem> */}
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">Challenges</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter the challenges of the cause"
                value={challenges}
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
                  border: '1px solid',
                  color: 'black',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel id="demo-simple-select-label">Results</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter the results of Past causes not exceeding 250 character"
                value={results}
                onChange={(e) => {
                  setResults(e.target.value);
                }}
                // required
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
            {/* <GridItem xs={12} sm={12} md={4}>
              <InputLabel id="demo-simple-select-label">
                Difficulties
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Enter difficulties about the cause"
                value={difficulties}
                onChange={(e) => {
                  setDifficulties(e.target.value);
                }}
                // required
                style={{
                  width: '500px',
                  margin: '30px 0',
                  padding: '20px',
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                }}
              />
            </GridItem> */}
            <GridItem xs={12} sm={12} md={12}>
              <h5>Please upload Cause Photo</h5>
              <div
                {...getRootProps()}
                required
                style={{
                  cursor: 'pointer',
                  border: '1px solid gray',
                  minHeight: '200px',
                  padding: '20px',
                  marginBottom: '20px',
                  borderRadius: '12px',
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
            <GridItem xs={12} sm={12} md={4}>
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
