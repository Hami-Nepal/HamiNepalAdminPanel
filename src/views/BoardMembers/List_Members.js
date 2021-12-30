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
export default function MemberList() {
  const classes = useStyles();

  const [deleteMemberSuccess, setDeleteMemberSuccess] = useState(false);
  const [deleteMemberError, setDeleteMemberError] = useState('');
  const [memberListError, setMemberListError] = useState(null);
  const [memberListLoading, setMemberListLoading] = useState(null);
  const [memberList, setMemberList] = useState([]);

  const handleDeleteBoard = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/boardmembers/${id}`, config);
      setDeleteMemberSuccess(true);
      setMemberList(memberList.filter(({_id}) => _id !== id));
    } catch (err) {
      setDeleteMemberError(true);
    }
  };

  const [page, setPage] = React.useState(0);
  const [total_data, setTotal_data] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    setMemberListLoading(true);
    try {
      const {data: response} = await axios.get(
        baseURL + 'boardmembers?page=' + (page + 1),
      );
      setMemberList(response.data);
      setTotal_data(response.total_data);
      setMemberListLoading(false);
    } catch (error) {
      setMemberListError(error);
    }
  };

  useEffect(fetchData, [page]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/board/create">
          <Button color="danger" type="submit">
            Add New Members
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>
              Current Board Member List
            </h4>
            <p className={classes.cardCategoryWhite}>
              Showing all the Board members
            </p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Designation</TableCell>
                    <TableCell align="center ">Edit</TableCell>
                    <TableCell align="center ">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memberListLoading ? (
                    <CircularProgress />
                  ) : memberListError ? (
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
                    memberList.length &&
                    (memberList
                      ? memberList.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              <img src={row.photo} width={50} />
                            </TableCell>
                            <TableCell align="center">
                              {row.designation}
                            </TableCell>
                            <TableCell align="left">
                              {
                                <Link to={`/admin/board/edit/${row._id}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              }
                            </TableCell>
                            <TableCell align="left" style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => handleDeleteBoard(row._id)}
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteMemberSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Member deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteMemberError && (
                    <div style={{color: 'red'}}>deleteNewsError</div>
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
