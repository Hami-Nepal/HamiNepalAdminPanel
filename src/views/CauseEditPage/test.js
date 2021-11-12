import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import DefaultUserPic from '../uploads/team-male.jpg';
const axios = require('axios');

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      email: this.props.email,
      profileImage: this.props.profileImage,
      msg: this.props.msg,
      uploadedFile: null,
    };
  }

  fetchUserDetails = (user_id) => {
    //console.log(user_id);
    axios
      .get('http://localhost:5000/userapi/getUserDetails/' + user_id, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({email: res.data.results[0].email});
        this.setState({profileImage: res.data.results[0].profileImage});
      })
      .catch((err) => console.log(err));
  };

  changeProfileImage = (event) => {
    this.setState({uploadedFile: event.target.files[0]});
  };

  UpdateProfileHandler = (e) => {
    e.preventDefault();
    //create object of form data
    const formData = new FormData();
    formData.append('profileImage', this.state.uploadedFile);
    formData.append('user_id', this.state.user_id);

    //update-profile
    axios
      .post('http://localhost:5000/userapi/update-profile/', formData, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({msg: res.data.message});
        this.setState({profileImage: res.data.results.profileImage});
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchUserDetails(this.state.user_id);
  }

  render() {
    if (this.state.profileImage) {
      var imagestr = this.state.profileImage;
      imagestr = imagestr.replace('public/', '');
      var profilePic = 'http://localhost:5000/' + imagestr;
    } else {
      profilePic = DefaultUserPic;
    }

    return (
      <Container>
        <Row>
          <Col>
            <img src={profilePic} alt="profils pic" />
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form">
              <p>{this.state.msg}</p>
              <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={this.state.username} />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={this.state.email} />
              </Form.Group>

              <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  onChange={this.changeProfileImage}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.UpdateProfileHandler}>
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    user_id: state.user.userDetails.userid,
    username: state.user.userDetails.username,
    email: state.user.email,
    profileImage: state.user.profileImage,
    msg: state.user.msg,
  };
};

export default connect(mapStatetoProps)(UserProfile);

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

  const [type, setType] = useState('');

  const [summary, setSummary] = useState('');
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
        alert('file uploaded successfully');
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
                value={type}
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
            <GridItem xs={12} sm={12} md={4}></GridItem>
            <CKEditor
              editor={ClassicEditor}
              data={description}
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
