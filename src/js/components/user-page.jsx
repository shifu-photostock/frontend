import React from 'react';

import UserInfo from './user-info.jsx';
import PhotoCards from './photo-cards.jsx';

const UserPage = (props) => (
  <React.Fragment>
    <UserInfo />
    <PhotoCards />
  </React.Fragment>
);

export default UserPage;
