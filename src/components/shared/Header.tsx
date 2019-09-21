import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, AppBar, Toolbar, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Header = () => {
  const [t] = useTranslation('component__shared__header');
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {t('title')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
