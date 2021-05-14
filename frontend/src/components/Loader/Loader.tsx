import React from 'react';
import classes from './Loader.module.scss';
import { Spinner } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <div className={classes.Loader}>
      <Spinner animation="grow" />
    </div>
  );
};

export default Loader;
