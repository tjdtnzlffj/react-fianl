import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy, useState, useRef } from "react";

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

import PeopleIcon from "@material-ui/icons/People";

import {
	Home as HomeIcon,
	PlaylistAddCheck,
	Menu as MenuIcon,
} from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import CallIcon from "@material-ui/icons/Call";

import Home from "./components/home/Home";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import StickyFooter from "./components/Footer";
import ModalPage from "./components/etc/ModalPage";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./components/redux/reducers/index";
import rootSaga from "./components/redux/sagas/index";

import "./styles/css/home.css";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

const Onetoone = lazy(() => import("./components/onetoone-redux/Onetoone"));
const Contact = lazy(() => import("./components/contact-us/ContactUs"));
const Detail = lazy(() => import("./components/onetoone-redux/OnetooneDetail"));
const SaveForm = lazy(() =>
	import("./components/onetoone-redux/OnetooneSaveForm")
);
const UpdateForm = lazy(() =>
	import("./components/onetoone-redux/OnetooneUpdateForm")
);
const AnswerForm = lazy(() =>
	import("./components/onetoone-redux/OnetooneAnswerForm")
);
const Community = lazy(() => import("./components/breadCommunity/Community"));
const CommunityDetail = lazy(() =>
	import("./components/breadCommunity/CommunityDetail")
);
const CommunityForm = lazy(() =>
	import("./components/breadCommunity/CommunityForm")
);
const CommunityUpdateForm = lazy(() =>
	import("./components/breadCommunity/CommunityUpdateForm")
);

const drawerWidth = "240px";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		backgroundColor: 'white',
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
		fontFamily: 'Do Hyeon',
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
	const modalRef = useRef();
	const theme = createTheme({
		palette: {
			primary: {
				main: "#2F576B",
			},
			secondary: {
				main: "#ffc107",
			},
		},
		// typography: {
		// 	fontFamily: "Single Day",
		// 	fontSize: '17',
		// }
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
				<ListItem
					button
					onClick={() => {
						modalRef.current.handleOpen();
					}}
				>
					<ListItemIcon>
						<SearchIcon />
					</ListItemIcon>
					<ListItemText>Search</ListItemText>
				</ListItem>
				<Link to="/board" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText>Community</ListItemText>
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
				<Link to="/contact-us" className={classes.link}>
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
		<Provider store={store}>
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
										<Tabs className={classes.tabs}>
											<Tab label="Home" component={Link} to="/"></Tab>
											<Tab
												label="Search"
												onClick={() => {
													modalRef.current.handleOpen();
												}}
											></Tab>
											<Tab label="Community" component={Link} to="/board"></Tab>
											<Tab
												label="1:1 Q&A"
												component={Link}
												to="/onetoone"
											></Tab>
											<Tab
												label="Contact Us"
												component={Link}
												to="/contact-us"
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
									<Route path="/contact-us" component={Contact} exact></Route>
									<Route path="/onetoone/:id" component={Detail} exact></Route>
									<Route path="/saveForm" component={SaveForm} exact></Route>
									<Route
										path="/updateForm/:id"
										component={UpdateForm}
										exact
									></Route>
									<Route
										path="/answerForm/:id"
										component={AnswerForm}
										exact
									></Route>
									<Route path="/board" exact={true} component={Community} />
									<Route
										path="/communityForm"
										exact={true}
										component={CommunityForm}
									/>
									<Route
										path="/board/:id"
										exact={true}
										component={CommunityDetail}
									/>
									<Route
										path="/CommunityUpdateForm/:id"
										exact={true}
										component={CommunityUpdateForm}
									/>
								</Switch>
							</Suspense>
							<ModalPage
								ref={modalRef}

							/>

						</main>
					</div>
					<div>
						<StickyFooter />
					</div>
				</Router>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
