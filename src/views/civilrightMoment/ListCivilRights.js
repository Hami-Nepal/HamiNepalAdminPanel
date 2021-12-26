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

  const [deleteCivilSuccess, setDeleteCivilSuccess] = useState(false);
  const [deleteCivilError, setDeleteCivilError] = useState('');
  const [error, setError] = useState();
  const [civilListSuccess, setCivilListSuccess] = useState(null);
  const [civilListError, setCivilListError] = useState(null);
  const [civilListLoading, setCivilListLoading] = useState(null);
  const [civilList, setCivilList] = useState([]);

  const handleDeleteRight = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/civilrights/${id}`, config);
      setDeleteCivilSuccess(true);
      setCivilList(civilList.filter(({_id}) => _id !== id));
    } catch (err) {
      setError(err);
      setDeleteCivilError(true);
    }
  };

  const [page, setPage] = React.useState(0);
  const [total_data, setTotal_data] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    const {data: response} = await axios.get(
      baseURL + 'civilrights?page=' + (page + 1),
    );
    setCivilList(response.data);
    // setTotal_data(response.total_data)
    setTotal_data(response.total_data);
  };

  useEffect(fetchData, [page]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/civilrights/create">
          <Button color="danger" type="submit">
            Add CIvil Rights Blogs
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>
              CIvil Rights Moments List
            </h4>
            <p className={classes.cardCategoryWhite}>
              Showing all the Civil Rights Moments
            </p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Updated At</TableCell>
                    <TableCell align="center ">Edit</TableCell>
                    <TableCell align="center ">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {civilListLoading ? (
                    <CircularProgress />
                  ) : civilListError ? (
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
                    civilList.length &&
                    (civilList
                      ? civilList.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">
                              <img src={row.photos[0]} width={50} />
                            </TableCell>
                            <TableCell align="center">
                              {row.updatedAt.slice(0, 10)}
                            </TableCell>
                            <TableCell align="left">
                              {
                                <Link to={`/admin/civilrights/edit/${row._id}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              }
                            </TableCell>
                            <TableCell align="left" style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => handleDeleteRight(row._id)}
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteCivilSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Civil Rights deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteCivilError && (
                    <div style={{color: 'red'}}>deleteCivilRightsError</div>
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
