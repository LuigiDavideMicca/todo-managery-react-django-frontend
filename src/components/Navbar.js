/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import '../images/pic.ico';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Navbar = ({ token, setToken, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const removeToken = () => {
    setToken(null);
    sessionStorage.clear();
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link href="/">
              <img
                src="pic.ico"
                width="30"
                height="30"
                className="d-inline-block align-top mx-4"
                alt=""
              />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            <Typography>Todo Managery</Typography>
          </IconButton>
        </div>
        <Divider />
        <List>
          {token && (
            <>
              <List>
                <Typography style={{ textAlign: 'center' }}>ALL</Typography>
                <br />
                <ListItem button>
                  <Link underline="none" href="/">
                    Home
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link underline="none" href="/all-todos">
                    See all todos
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link underline="none" href="/all-categories">
                    See all categories
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link underline="none" href="/calendar">
                    See your Calendar
                  </Link>
                </ListItem>
                <Divider />
                <br />
                <Typography style={{ textAlign: 'center' }}>QUICK ACTIONS</Typography>
                <br />
                <ListItem button>
                  <Link underline="none" href="/new-todo">
                    Add Todo
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link underline="none" href="/new-category">
                    Add Category
                  </Link>
                </ListItem>
                <ListItem button style={{ background: '#DF4242' }}>
                  <Link underline="none" onClick={removeToken} href="/">
                    Log Out
                  </Link>
                </ListItem>
              </List>
            </>
          )}

          {!token && (
            <>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/login">
                    Login
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/signup">
                    Register
                  </Link>
                </ListItem>
              </List>
            </>
          )}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default Navbar;
