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
import DeleteIcon from '@material-ui/icons/Delete';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Link, useParams} from 'react-router-dom';

import axios from 'axios';
import baseURL from '../../api/baseUrl';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function CauseList(props) {
  const classes = useStyles();

  const params = useParams();

  const [causeData, setCauseData] = useState({});
  const [volunteers, setVolunteers] = useState([]);

  console.log(causeData);

  useEffect(() => {
    axios(baseURL + 'kindness/' + params.kindnessId)
      .then(async ({data}) => {
        setCauseData(data.data);

        const promises = data.data.volunteers.map(({volunteerId}) =>
          axios.get(baseURL + 'volunteers/' + volunteerId),
        );
        const res = await Promise.all(promises);

        setVolunteers(res.map(({data}) => data.data.volunteer));
      })
      .catch(({response}) => console.log(response));
  }, []);

  const handleDeleteVolunteer = (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        baseURL + `kindness/volunteers/${causeData._id}/delete/${id}`,
        {},
        config,
      )
      .then((data) => setVolunteers(volunteers.filter(({_id}) => _id !== id)))
      .catch(({response}) => console.log(response));
  };

  const handleVerifyVolunteer = async (id, bool) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.patch(
      baseURL +
        'kindness/volunteers/' +
        causeData.volunteers.find(({volunteerId}) => volunteerId === id)._id +
        '/update/' +
        id,
      {participated: !bool},
      config,
    );

    setCauseData(data.kindness);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {/* <DialogueBox /> */}
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>
              Verify volunteers of "{causeData.title}"
            </h4>
            <p className={classes.cardCategoryWhite}>
              Showing all the volunteers
            </p>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>id </TableCell> */}
                    <TableCell align="center">Verify</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Bio</TableCell>
                    <TableCell align="center">Blood Group</TableCell>
                    <TableCell align="center">City</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Motivation</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">State</TableCell>
                    <TableCell align="center">Street address</TableCell>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteers.length
                    ? volunteers.map((row, index) => (
                        <TableRow key={row._id}>
                          {/* <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell> */}
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={() =>
                              handleVerifyVolunteer(
                                row._id,
                                causeData?.volunteers[index]?.participated,
                              )
                            }
                            style={{
                              color: causeData?.volunteers[index]?.participated
                                ? 'green'
                                : 'red',
                              cursor: 'pointer',
                            }}>
                            <VerifiedUserIcon />
                          </TableCell>
                          <TableCell align="center">
                            {row.first_name} {row.last_name}
                          </TableCell>
                          <TableCell align="center">{row.age}</TableCell>
                          <TableCell align="center">{row.bio}</TableCell>
                          <TableCell align="center">{row.bloodGroup}</TableCell>
                          <TableCell align="center">{row.city}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.motivation}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">{row.state}</TableCell>
                          <TableCell align="center">
                            {row.street_address}
                          </TableCell>
                          <TableCell align="center">
                            <img
                              src={row.photo}
                              alt={row.photo}
                              style={{width: '150px'}}
                            />
                          </TableCell>
                          <TableCell align="center" style={{cursor: 'pointer'}}>
                            {
                              <DeleteIcon
                                color="secondary"
                                onClick={() => handleDeleteVolunteer(row._id)}
                              />
                            }
                          </TableCell>
                        </TableRow>
                      ))
                    : ''}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
