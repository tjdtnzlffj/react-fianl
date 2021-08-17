import { useEffect, useState } from 'react';
import BreadItem from './CommunityItem';
import { Box } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	starttext: {
		width: '56%',
		margin: '0 auto',
		marginTop: '5px',
		marginBottom: '50px',
		cursor: 'pointer',
	},
}));

const Community = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const commentDispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'FETCH_BOARDLSIT' });
		commentDispatch({ type: "FETCH_COMMENTLIST" });
	}, []);

	const boards = useSelector((state) => state.community);
	const commentList = useSelector(state => state.comment);
	const classes = useStyles();
	return (
		<div>
			{/* <Box
				className={classes.starttext}
				onClick={() => {
					history.push('/communityForm');
				}}
			>
				<CKEditor editor={ClassicEditor} />
			</Box> */}

			{boards.map((board) => {
				const matchedCommentList = commentList.filter(comment => Number(comment.postNo) === board.id);
				// const matchedCommentList = getMatchedCommentList(commentList, board.id);
				return <BreadItem key={board.id} board={board} commentList={matchedCommentList} />
			})}
		</div>
	);
};

export default Community;
