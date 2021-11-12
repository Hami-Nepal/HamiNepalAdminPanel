import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const {tableHead, tableData, tableHeaderColor} = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}>
                    {prop}
                  </TableCell>
                );
              })}

              <TableCell
                className={classes.tableCell + ' ' + classes.tableHeadCell}>
                actions
              </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}

                <TableCell className={classes.tableCell}>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>

                  <Link to={`${props.slug}/${prop[0]}/edit`}>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      className={classes.margin}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Link>
                  
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
