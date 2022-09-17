import React from 'react';
import { Meteor } from 'meteor/meteor';
import Col from 'react-bootstrap/Col';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Navigate } from 'react-router-dom';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return <Navigate to='/' />;
};

export default SignOut;
