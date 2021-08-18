import { Button, InputBase, makeStyles, } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	search: {
		display: 'flex',
		position: 'relative',
		top: '20%',
		left: '10%',
		borderRadius: theme.shape.borderRadius,
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '80%',
		backgroundColor: 'white',
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

	},
	inputRoot: {
		color: 'inherit',
		width: '62%',
		flex: 1,
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
	},
	searchBtn: {
		backgroundColor: 'black',
		color: 'white',
		borderRadius: '0px 4px 4px 0px',
	},
}));

const SearchBar = () => {
	const classes = useStyles();
	const searchInputRef = useRef();
	const dispatch = useDispatch();
	const history = useHistory();

	const change = (event) => {
		if (event.charCode === 13) {
			findKeywordMatchPosts();
		}
	}

	const findKeywordMatchPosts = () => {

		history.push('/board?keyword=' + searchInputRef.current.value);
		searchInputRef.current.value = '';
		dispatch({ type: "CLOSE_MODAL", payload: { modalState: false } });
	}

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder="검색어를 입력해 주세요"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
				inputRef={searchInputRef}
				onKeyPress={change}
			/>
			<Button className={classes.searchBtn} onClick={() => { findKeywordMatchPosts(); }}>
				검색
			</Button>
		</div >
	);
}

export default SearchBar;