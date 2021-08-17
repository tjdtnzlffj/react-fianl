import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import CommentInputBox from './CommentInputBox';
import CommentItem from './CommentItem';


const useStyles = makeStyles({
	container: {
		marginTop: "2px",
	},
	commentContainer: {
		cursor: "pointer",
		"&:hover": {
			textDecorationLine: 'underline',
		},
		margin: "0",
	},
	commentListContainer: {

	},
	etcContainer: {
		display: "flex",
	},
	etcItem: {
		fontSize: "0.7rem",
		cursor: "pointer",
		"&:hover": {
			textDecorationLine: 'underline',
		},
	}
});



const CommentList = ({ like, postNo, commentList }) => {
	const classes = useStyles();
	const [state, setState] = useState({ open: false, defer: false });

	return (
		<div className={classes.container}>

			{/* 첫번째 칸 */}
			<div style={{ display: "flex" }}>

				{/* 좋아요 */}
				<div style={{ flex: 1, display: "flex" }}>
					<FavoriteOutlinedIcon fontSize="small" />
					<p style={{ margin: "0" }}>{like}</p>
				</div>

				{/* 댓글 창 열기 */}
				<p
					className={classes.commentContainer}
					onClick={() => {
						setState({
							open: !state.open,
							defer: false,
						});
					}}>
					댓글 {commentList.length}개
				</p>

			</div>

			{/* 좋아요, 댓글달기 버튼 */}
			<div>

				<div>
					<Button
						className={classes.button}
						startIcon={<ThumbUpAltOutlinedIcon />}
						style={{ width: "50%" }}
					>
						좋아요
					</Button>

					<Button
						className={classes.button}
						startIcon={<ChatBubbleOutlineOutlinedIcon />}
						style={{ width: "50%" }}
						onClick={() => {
							setState({
								open: !state.open,
								defer: false,
							});
						}}
					>
						댓글 달기
					</Button>

				</div>
			</div>

			{/* 등록된 댓글 */}
			<div className={classes.commentListContainer}>
				{state.open ? (
					<React.Fragment>
						<CommentInputBox postNo={postNo} />

						<ul>
							{
								commentList.map((comment) => (
									<CommentItem key={comment.no} comment={comment} />
								))
							}
						</ul>
					</React.Fragment>
				) : null}
			</div>
		</div >
	);
}

export default CommentList;