import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import Table from '@material-ui/core/Table';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogueBox from 'components/DialogueBox';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Link} from 'react-router-dom';
import api from 'api';
import baseURL from 'api/baseUrl';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function NewssList() {
  const classes = useStyles();

  const [deleteUserSuccess, setDeleteUserSuccess] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState('');
  const [error, setError] = useState();
  const [userListSuccess, setUserListSuccess] = useState(null);
  const [userListError, setUserListError] = useState(null);
  const [userListLoading, setUserListLoading] = useState(null);
  const [userList, setUserList] = useState([]);

  const handleDeleteUser = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/users/${id}`, config);
      setDeleteUserSuccess(true);
      setUserList(userList.filter(({_id}) => _id !== id));
    } catch (err) {
      setError(err);
      setDeleteUserError(true);
    }
  };

  const [page, setPage] = React.useState(0);
  const [total_data, setTotal_data] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleVerifyUser = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const {isVerified} = userList.find(({_id}) => _id == id);
    const {data: response} = await axios.put(
      baseURL + 'users/' + id,
      {isVerified: isVerified ? false : true},
      config,
    );
    setUserList(userList.map((obj) => (obj._id === id ? response.data : obj)));
  };
  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const {data: response} = await axios.get(
      baseURL + 'users?page=' + (page + 1),
      config,
    );
    setUserList(response.data);

    setTotal_data(response.total_data);
    // setTotal_data(response.total_data);
  };

  useEffect(fetchData, [page]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>All user List</h4>
            <p className={classes.cardCategoryWhite}>Showing all the Users</p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="left">Verify</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Photo</TableCell>
                    {/* <TableCell align="center">Updated At</TableCell> */}
                    <TableCell align="center ">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userListLoading ? (
                    <CircularProgress />
                  ) : userListError ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Something bad happened —{' '}
                      <strong>Please try again later.</strong>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={fetchData}
                        variant="outlined"
                        color="secondary">
                        Try Again
                      </Button>
                    </Alert>
                  ) : (
                    userList.length &&
                    (userList
                      ? userList.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={() => handleVerifyUser(row._id)}
                              style={{
                                color: row.isVerified ? 'green' : 'red',
                                cursor: 'pointer',
                              }}>
                              <VerifiedUserIcon />
                            </TableCell>
                            <TableCell align="center">
                              {row.firstname} {row.lastname}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.role}</TableCell>
                            <TableCell align="center">
                              <img src={row.photo} width={50} />
                            </TableCell>
                            {/* <TableCell align="center">
                              {row.updatedAt.slice(0, 10)}
                            </TableCell> */}
                            <TableCell align="left" style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => handleDeleteUser(row._id)}
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteUserSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      User deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteUserError && (
                    <div style={{color: 'red'}}>deleteUserError</div>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={total_data}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={10}
              />
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
