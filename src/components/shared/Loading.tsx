import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { memo } from 'react';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center'
  },
  loading: {
    height: 64,
    width: 64
  }
});

const Loading = memo(() => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <CircularProgress className={classes.loading} size={64} />
    </section>
  );
});

Loading.displayName = 'Loading';

export default Loading;
