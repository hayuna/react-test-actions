import React, { Suspense, useState } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import Meta from './Meta';
import Loading from './Loading';
import Header from './Header';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

type Props = {
  route?: RouteConfig;
};

const Layout = (props: Props) => {
  const [expanded, setExpanded] = useState(true);
  const classes = useStyles();

  const toggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <Sidebar open={expanded} toggle={toggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Suspense fallback={<Loading />}>{renderRoutes(props.route!.routes)}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
