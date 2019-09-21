import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Drawer, Theme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  PowerSettingsNewOutlined,
  FullscreenOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: theme.spacing(32),
    flexShrink: 0,
  },
  drawerOpen: {
    width: theme.spacing(32),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'hidden',
    borderTop: `1px solid rgba(255, 255, 255, 0.08)`,

    '& button': {
      flex: 1,
      color: 'rgba(255, 255, 255, 0.8',
      height: theme.spacing(5),

      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08',
      },
    },
  },
}));

type Props = {
  open: boolean;
  toggle: () => void;
};

const Sidebar = (props: Props) => {
  const [t] = useTranslation('component__shared__sidebar');
  const classes = useStyles();

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
      open={props.open}
    >
      <div className={classes.toolbar} />
      {t('sidebar')}
      <span className={classes.grow} />
      <div className={classes.footer}>
        {props.open && (
          <Button>
            <PowerSettingsNewOutlined />
          </Button>
        )}
        {props.open && (
          <Button>
            <FullscreenOutlined />
          </Button>
        )}
        <Button onClick={props.toggle}>{props.open ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}</Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
