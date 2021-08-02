import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy, useState } from "react";

import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Home as HomeIcon,
  PlaylistAddCheck,
  Menu as MenuIcon,
} from "@material-ui/icons";

import CallIcon from "@material-ui/icons/Call";

import Home from "./components/Home";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { black } from "material-ui/styles/colors";
import { pink700 } from "material-ui/styles/colors";

import StickyFooter from "./components/Footer";

const Onetoone = lazy(() => import("./components/onetoone/Onetoone"));
const Contact = lazy(() => import("./components/Contact"));
const Detail = lazy(() => import("./pages/onetoone/OnetooneDetail"));
const SaveForm = lazy(() => import("./pages/onetoone//SaveForm"));
const UpdateForm = lazy(() => import("./pages/onetoone/UpdateForm"));

const drawerWidth = "240px";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {},
  menuButton: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3),
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  rightAlign: {
    marginRight: "auto",
  },
  tabs: {
    paddingLeft: "350px",
  },
  title: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: black,
      },
      secondary: {
        main: pink700,
      },
    },
  });

  const handlerDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List component="nav">
        <Link to="/" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        <Link to="/onetoone" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PlaylistAddCheck />
            </ListItemIcon>
            <ListItemText>1:1 QnA</ListItemText>
          </ListItem>
        </Link>
        <Link to="/contacts" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <header>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  color="inherit"
                  edge="start"
                  className={classes.menuButton}
                  onClick={handlerDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  <Link to="/" className={classes.title}>
                    BBangDuck
                  </Link>
                </Typography>
                <Hidden mdDown implementation="css">
                  <Tabs className={classes.tabs} fullWidth={true}>
                    <Tab label="Home" component={Link} to="/"></Tab>
                    <Tab label="Search" to="/"></Tab>
                    <Tab label="Community" to="/"></Tab>
                    <Tab label="1:1 Q&A" component={Link} to="/onetoone"></Tab>
                    <Tab
                      label="Contact Us"
                      component={Link}
                      to="/contacts"
                    ></Tab>
                  </Tabs>
                </Hidden>
              </Toolbar>
            </AppBar>
            <Hidden lgUp implementation="css">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                classes={{ paper: classes.drawerPaper }}
                onClose={handlerDrawerToggle}
                position="right"
              >
                {drawer}
              </Drawer>
            </Hidden>
          </header>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<div>로딩중입니다...</div>}>
              <Switch>
                <Route path="/" component={Home} exact></Route>
                <Route path="/onetoone" component={Onetoone} exact></Route>
                <Route path="/contacts" component={Contact} exact></Route>
                <Route path="/onetoone/:id" component={Detail} exact></Route>
                <Route path="/saveForm" component={SaveForm} exact></Route>
                <Route
                  path="/updateForm/:id"
                  component={UpdateForm}
                  exact
                ></Route>
              </Switch>
            </Suspense>
          </main>
        </div>
        <div>
          <StickyFooter />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
