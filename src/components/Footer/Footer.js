/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import {Link} from 'react-router-dom'
const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to='/admin/dashboard' clLinkssName={classes.block}>
                Home
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/admin/dashboard' className={classes.block}>
                Company
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/admin/dashboard' className={classes.block}>
                Portfolio
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/admin/dashboard' className={classes.block}>
                Blog
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            Hash Technologies , All Rights Reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
