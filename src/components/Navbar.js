/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
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
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CategoryIcon from '@material-ui/icons/Category';
import ClassIcon from '@material-ui/icons/Class';
import EventIcon from '@material-ui/icons/Event';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../images/pic.ico';

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
    backgroundColor: '#1b1b2f',
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

const Navbar = ({ token, setToken, children, categories, setCategories }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [links, showLinks] = useState(false);
  const [allCatgories, setAllCategories] = useState(categories);
  useEffect(() => {
    if (categories.length === 0) {
      async function getCategories() {
        try {
          const resp = await fetch(
            'https://luigidavidemicca.pythonanywhere.com/api/v1/categories/',
            {
              method: 'GET',
              mode: 'cors',
              credentials: 'same-origin',
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
            }
          );
          const results = await resp.json();
          setCategories(results);
          setAllCategories(results);
        } catch (e) {
          console.log(e);
        }
      }
      getCategories();
    }
  }, [categories]);

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
  const discoverLinks = () => {
    showLinks(!links);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: '#1b1b2f' }}
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
          <Link href="/" style={{ marginRight: '1rem' }}>
            <img src={logo} width="30" height="30" alt="" />
          </Link>
          <Typography variant="h6" noWrap>
            Todo Managery
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
        <div className={classes.drawerHeader} style={{ backgroundColor: '#1b1b2f' }}>
          <IconButton onClick={handleDrawerClose} style={{ color: 'whitesmoke' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            <Typography style={{ color: '#E43F5A' }}>Todo Managery</Typography>
          </IconButton>
        </div>
        <Divider />
        <List>
          {token && (
            <>
              <List>
                <Typography style={{ textAlign: 'center', color: '#E43F5A' }}>ALL</Typography>
                <br />
                <ListItem button>
                  <ListItemIcon style={{ color: 'whitesmoke' }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/" style={{ color: 'whitesmoke' }}>
                    Home
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: 'whitesmoke' }}>
                    <FormatListNumberedIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/all-todos" style={{ color: 'whitesmoke' }}>
                    See all todos
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: 'whitesmoke' }}>
                    <CategoryIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/all-categories" style={{ color: 'whitesmoke' }}>
                    See all categories
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: 'whitesmoke' }}>
                    <EventIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/calendar" style={{ color: 'whitesmoke' }}>
                    See your Calendar
                  </Link>
                </ListItem>
                <br />
                <Divider />
                <br />
                <Typography style={{ textAlign: 'center', color: '#E43F5A' }}>
                  CATEGORIES
                </Typography>
                <br />
                {allCatgories.length > 0 ? (
                  allCatgories.map(category => (
                    <ListItem button key={category.id}>
                      <ListItemIcon style={{ color: 'whitesmoke' }}>
                        <ClassIcon />
                      </ListItemIcon>
                      <Link
                        underline="none"
                        href={`/category-todos/${category.title}`}
                        style={{ color: 'whitesmoke' }}>
                        {category.title}
                      </Link>
                    </ListItem>
                  ))
                ) : (
                  <Typography style={{ color: 'whitesmoke' }}>No categories created</Typography>
                )}
              </List>
              <Divider />
              <List>
                <ListItem component="a">
                  <Button
                    size="large"
                    style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '5rem' }}
                    variant="contained"
                    onClick={removeToken}
                    color="secondary"
                    startIcon={<VpnKeyIcon />}
                    href="/">
                    LOG OUT
                  </Button>
                </ListItem>
              </List>
            </>
          )}

          {!token && (
            <>
              <List>
                <ListItem button>
                  <ListItemIcon style={{ color: '#E43F5A' }}>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/login" style={{ color: '#E43F5A' }}>
                    Login
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: '#E43F5A' }}>
                    <EnhancedEncryptionIcon />
                  </ListItemIcon>
                  <Link underline="none" href="/signup" style={{ color: '#E43F5A' }}>
                    Register
                  </Link>
                </ListItem>
              </List>
            </>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.drawerHeader} />
        {children}
        {links && (
          <Grid container direction="column">
            <Grid item>
              <Fab
                variant="extended"
                color="primary"
                href="/new-todo"
                style={{ margin: '0.5rem', backgroundColor: '#1f4068' }}>
                <AddIcon />
                Todo
              </Fab>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                color="primary"
                href="/new-category"
                style={{ margin: '0.5rem', backgroundColor: '#1f4068' }}>
                <AddIcon />
                Category
              </Fab>
            </Grid>
          </Grid>
        )}
        {token && (
          <Fab
            aria-label="add"
            onClick={discoverLinks}
            style={{ backgroundColor: '#E43F5A', color: 'whitesmoke' }}>
            <AddIcon />
          </Fab>
        )}
      </main>
    </div>
  );
};

export default Navbar;
