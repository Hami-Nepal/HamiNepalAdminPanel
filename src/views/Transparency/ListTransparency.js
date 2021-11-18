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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function TransparencysList() {
  const classes = useStyles();

  const [deleteTransparencySuccess, setDeleteTransparencySuccess] = useState(
    false,
  );
  const [deleteTransparencyError, setDeleteTransparencyError] = useState('');
  const [error, setError] = useState();
  const [transparencyListSuccess, setTransparencyListSuccess] = useState(null);
  const [transparencyListError, setTransparencyListError] = useState(null);
  const [transparencyListLoading, setTransparencyListLoading] = useState(true);
  const [transparencyList, setTransparencyList] = useState([]);

  const handleDeleteTransparency = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/transparency/${id}`, config);
      setDeleteTransparencySuccess(true);
      setTransparencyList(transparencyList.filter(({_id}) => _id !== id));
    } catch (err) {
      setError(err);
      setDeleteTransparencyError(true);
    }
  };

  const fetchData = async () => {
    const {data: response} = await axios.get(baseURL + 'transparency');
    setTransparencyList(response.data.transparencies);
    setTransparencyListLoading(false);
  };

  useEffect(fetchData, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/transparency/create">
          <Button color="danger" type="submit">
            Add new Transparency
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>Transparency List</h4>
            <p className={classes.cardCategoryWhite}>
              Showing all the Transparencies
            </p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">Updated At</TableCell>
                    <TableCell align="center ">Edit</TableCell>
                    <TableCell align="center ">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transparencyListLoading ? (
                    <CircularProgress />
                  ) : transparencyListError ? (
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
                    transparencyList.length &&
                    (transparencyList
                      ? transparencyList.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="center">
                              <img src={row.photo} width={50} />
                            </TableCell>
                            <TableCell align="center">
                              {row.updatedAt.slice(0, 10)}
                            </TableCell>
                            <TableCell align="left">
                              {
                                <Link
                                  to={`/admin/transparency/edit/${row._id}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              }
                            </TableCell>
                            <TableCell align="left" style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() =>
                                    handleDeleteTransparency(row._id)
                                  }
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteTransparencySuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Transparency deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteTransparencyError && (
                    <div style={{color: 'red'}}>deleteTransparencyError</div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
