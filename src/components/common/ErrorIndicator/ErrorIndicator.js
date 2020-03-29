import React from 'react';
import { Image } from 'semantic-ui-react';
import errorPicture from './error-picture.png';

const ErrorIndicator = () => (
  <Image src={errorPicture} alt="error-picture" fluid />
);

export default ErrorIndicator;
