/* eslint-disable camelcase */
import React from 'react';
import { useAuthContext } from '../../lib/context/AuthContext';
import CameraComponent from './CameraComponent';

function ProfileView() {
  const { authState } = useAuthContext();
  const { current_user } = authState;

  return <CameraComponent />;
}

export default ProfileView;
