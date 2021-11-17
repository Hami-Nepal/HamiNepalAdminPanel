import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import Table from '@material-ui/core/Table';
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
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {listCauses} from 'store/actions/causes.actions';
import {deleteCause} from './../../store/actions/causes.actions';
import api from 'api';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function CauseList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [deleteCauseSuccess, setDeleteCauseSuccess] = useState(false);
  const [deleteCauseError, setDeleteCauseError] = useState('');
  const [error, setError] = useState();

  const {
    causeListSuccess,
    causeListError,
    causeListLoading,
    causeList,
  } = useSelector((state) => state.causes);

  const handleDeleteCause = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/causes/${id}`, config);
      setDeleteCauseSuccess(true);
      dispatch(listCauses());
    } catch (err) {
      setError(err);
      setDeleteCauseError(true);
    }
  };

  useEffect(() => {
    if (!causeListSuccess) {
      dispatch(listCauses());
      console.log(causeList);
    }
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/causes/addNewCause">
          <Button color="primary" type="submit">
            Add a new cause
          </Button>
        </Link>

        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Causes List</h4>
            <p className={classes.cardCategoryWhite}>Showing all the causes</p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Summary</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="right">Updated At</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {causeListLoading ? (
                    <CircularProgress />
                  ) : causeListError ? (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Something bad happened —{' '}
                      <strong>Please try again later.</strong>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={(e) => dispatch(listCauses())}
                        variant="outlined"
                        color="secondary">
                        Try Again
                      </Button>
                    </Alert>
                  ) : (
                    causeList &&
                    (causeList.data
                      ? causeList.data.causes.map((row) => (
                          <TableRow key={row._id}>
                            {/* <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell> */}
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                              {row.cause_type}
                            </TableCell>
                            <TableCell align="right">{row.summary}</TableCell>
                            <TableCell align="right">
                              <img src={row.photos[0]} width={50} />
                            </TableCell>
                            <TableCell align="right">
                              {row.description}
                            </TableCell>
                            <TableCell align="right">
                              {new Date(row.updatedAt).getUTCFullYear()}
                            </TableCell>
                            <TableCell align="right">
                              {
                                <Link to={`/admin/causes/edit/${row._id}`}>
                                  <EditIcon color="primary" />
                                </Link>
                              }
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{cursor: 'pointer'}}>
                              {
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => handleDeleteCause(row._id)}
                                />
                              }
                            </TableCell>
                          </TableRow>
                        ))
                      : '')
                  )}
                  {deleteCauseSuccess ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Cause deleted Successfully
                    </Alert>
                  ) : null}
                  {deleteCauseError && (
                    <div style={{color: 'red'}}>deleteCauseError</div>
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
