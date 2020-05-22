import React from 'react';
import {Switch, Route, Link, useLocation} from 'react-router-dom';
import clsx from 'clsx';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ShowChart from '@material-ui/icons/ShowChart';
import AddBox from '@material-ui/icons/AddBox';
import LocalShipping from '@material-ui/icons/LocalShipping';
import AllInboxIcon from '@material-ui/icons/AllInbox';

import Drugs from './Drugs';
import NewOrder from './NewOrder';
import Orders from './Orders';
import PickupPoints from './PickupPoints';
import Statistics from './Statistics';
import Snackbar from './Snackbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Аптека
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
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={(props) => <Link to="/" {...props} />}
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Лекарства" />
          </ListItem>
          <ListItem
            button
            component={(props) => <Link to="/new-order" {...props} />}
            selected={location.pathname === '/new-order'}
          >
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Создание заказа" />
          </ListItem>
          <ListItem
            button
            component={(props) => <Link to="/orders" {...props} />}
            selected={location.pathname === '/orders'}
          >
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary="Заказы" />
          </ListItem>
          <ListItem
            button
            component={(props) => <Link to="/pickup-points" {...props} />}
            selected={location.pathname === '/pickup-points'}
          >
            <ListItemIcon>
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="Пункты доставки" />
          </ListItem>
          <ListItem
            button
            component={(props) => <Link to="/statistics" {...props} />}
            selected={location.pathname === '/statistics'}
          >
            <ListItemIcon>
              <ShowChart />
            </ListItemIcon>
            <ListItemText primary="Статистика" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/" exact>
            <Drugs />
          </Route>
          <Route path="/new-order">
            <NewOrder />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/pickup-points">
            <PickupPoints />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
        </Switch>
      </main>
      <Snackbar />
    </div>
  );
};

export default App;
