import React from 'react';
import { Redirect } from 'react-router-dom';

const UserAvatar = (props) => (
  <Redirect to={`/users/${props.match.params.name}`} />
);

export default UserAvatar;
