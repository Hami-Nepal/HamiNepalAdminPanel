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
export default function CauseList() {
  const classes = useStyles();

  const [deleteKindnessSuccess, setDeleteKindnessSuccess] = useState(false);
  const [deleteKindnessError, setDeleteKindnessError] = useState('');
  const [error, setError] = useState();
  const [KindnessListSuccess, setKindnessListSuccess] = useState(null);
  const [KindnessListError, setKindnessListError] = useState(null);
  const [KindnessListLoading, setKindnessListLoading] = useState(null);
  const [KindnessList, setKindnessList] = useState([]);

  const handleDeleteKindness = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/kindness/${id}`, config);
      setDeleteKindnessSuccess(true);
      setKindnessList(KindnessList.filter(({_id}) => _id !== id));
    } catch (err) {
      setError(err);
      setDeleteKindnessError(true);
    }
  };

  const [page, setPage] = React.useState(0);
  const [total_data, setTotal_data] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    const {data: response} = await axios.get(
      baseURL + 'kindness?page=' + (page + 1),
    );
    setKindnessList(response.data);
    // setTotal_data(response.total_data)
    setTotal_data(response.total_data);
  };

  useEffect(fetchData, [page]);

  const addToFeatured = async (id) => {
    const {featured} = KindnessList.find(({_id}) => _id == id);
    const featuredLists = KindnessList.filter(({featured}) => featured);
    if (!featured && featuredLists.length >= 5) return;

    const rankings = KindnessList.map(({featured_ranking}) => featured_ranking);
    let nextRanking = null;

    for (let i = 1; i <= 5; i++) {
      if (!rankings.includes(i)) {
        nextRanking = i;
        break;
      }
    }

    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const {data: response} = await axios.put(
      baseURL + 'kindness/' + id,
      {featured: !featured, featured_ranking: featured ? null : nextRanking},
      {headers: {Authorization: 'Bearer ' + token}},
    );
    setKindnessList(
      KindnessList.map((obj) => (obj._id === id ? response.data : obj)),
    );
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/act-of-kindness/create">
          <Button color="danger" type="submit">
            Add a new Kindness
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>Kindnesss List</h4>
            <p className={classes.cardCategoryWhite}>
              Showing all the Kindnesss
            </p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Title</TableCell>
                    {/* <TableCell align="center">Type</TableCell> */}
                    <TableCell align="center">Featured</TableCell>
                    <TableCell align="center">Featured Ranking</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Updated At</TableCell>
                    <TableCell align="center ">Edit</TableCell>
                    <TableCell align="center ">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KindnessListLoading ? (
                    <CircularProgress />
                  ) : KindnessListError ? (
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
                    KindnessList.length &&
                    (KindnessList
                      ? KindnessList.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell align="center">{row.title}</TableCell>
                            {/* <TableCell align="center">{row.type}</TableCell> */}
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                              onClick={() => addToFeatured(row._id)}
                              style={{
                                color: row.featured ? 'green' : 'gray',
                                cursor: 'pointer',
                              }}>
                              <VerifiedUserIcon />
                            </TableCell>
                            <TableCell align="center">
                              {row.featured_ranking}
                            </TableCell>
                            <TableCell align="center">
                              <img src={row.photos[0]} width={50} />
                            </TableCell>
                            <TableCell align="center">
                              {new Date(row.updatedAt).getUTCFullYear()}
                            </TableCell>
                            <TableCell align="center">
                              {
                                <Link
                                  to={`/admin/act-of-kindness/edit/${row._id}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              }
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => handleDeleteKindness(row._id)}
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteKindnessSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Kindness deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteKindnessError && (
                    <div style={{color: 'red'}}>deleteKindnessError</div>
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
