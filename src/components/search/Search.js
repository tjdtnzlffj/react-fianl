import { Button, InputBase, makeStyles, } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import { useRef } from "react";

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

const Search = () => {
	const classes = useStyles();
	const searchKeyword = useRef();
	return (

		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder="Search…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
				inputRef={searchKeyword}
			/>
			<Button className={classes.searchBtn} onClick={() => { console.log(searchKeyword.current.value); searchKeyword.current.value = ''; }}>
				Search
			</Button>
		</div >
	);
}

export default Search;