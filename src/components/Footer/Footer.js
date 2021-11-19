/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';
import {Link} from 'react-router-dom';
const useStyles = makeStyles(styles);
import classNames from 'classnames';
import hamilogo from 'assets/img/hami_nepal.png';

export default function Footer(props) {
  const classes = useStyles();
  const {logo, logoText} = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
          <div className={classes.logo}>
            <Link
              to="/admin/dashboard"
              className={classNames(classes.logoLink, {
                [classes.logoLinkRTL]: props.rtlActive,
              })}
              target="_blank">
              <div className={classes.logoImage}>
                <img
                  src={hamilogo}
                  alt="logo"
                  style={{height: '100px', width: '135px'}}
                />
              </div>
              {logoText}
            </Link>
            <p className={classes.right}>
              <span>
                &copy; {1900 + new Date().getYear()} Hash Technologies , All
                Rights Reserved.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
