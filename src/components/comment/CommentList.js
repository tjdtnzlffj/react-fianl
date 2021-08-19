import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import Button from "@material-ui/core/Button";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import CommentInputBox from "./CommentInputBox";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import comment from "../redux/reducers/comment";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
	container: {
		marginTop: "2px",
	},
	commentContainer: {
		cursor: "pointer",
		"&:hover": {
			textDecorationLine: "underline",
		},
		margin: "0",
	},
	commentListContainer: {},
	etcContainer: {
		display: "flex",
	},
	etcItem: {
		fontSize: "0.7rem",
		cursor: "pointer",
		"&:hover": {
			textDecorationLine: "underline",
		},
	},
});

const CommentList = ({ like, postNo }) => {
	const classes = useStyles();
	const [state, setState] = useState({ open: false, defer: false });
	const commentList = useSelector(state => state.comment).filter(comment => comment.postNo === postNo);

	const dispatch = useDispatch();
	const [board, setBoard] = useState({
		id: "",
		postLike: "",
	});

	const id = postNo;

	// useEffect(() => {
	// 	fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
	// 		.then((res) => res.json())
	// 		.then((res) => {
	// 			setBoard(res);

	// 		});
	// }, []);

	const addLike = (e) => {
		// console.log(typeof (like));
		// console.log(postNo);
		dispatch({ type: "INCRESE_POSTLIKE", payload: { id: postNo, postLike: like } });
		// dispatch({ type: "INCRESE_POSTLIKE", payload: { postLike: (like + 1) });
		// e.preventDefault();
		// fetch(`${process.env.REACT_APP_API_BASE}/board/` + id, {
		// 	method: "PUT",
		// 	headers: {
		// 		"Content-Type": "application/json; charset=utf-8",
		// 	},
		// 	body: JSON.stringify(board),
		// })
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		alert("추천하셨습니다.");
		// 		delete res.comment;
		// 		dispatch({ type: "INCRESE_POSTLIKE", payload: res });
		// 	});

	};

	return (
		<div className={classes.container}>
			{/* 첫번째 칸 */}
			<div style={{ display: "flex" }}>
				{/* 좋아요 */}
				<div style={{ flex: 1, display: "flex", padding: "3px 0" }}>
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
					}}
				>
					댓글 {commentList.length ? `${commentList.length}개` : '없음'}
				</p>
			</div>

			<Divider style={{ marginTop: "4px", marginBottom: "1px" }} />

			{/* 좋아요, 댓글달기 버튼 */}
			<div>
				<div>
					<Button
						className={classes.button}
						startIcon={<ThumbUpAltOutlinedIcon />}
						style={{ width: "50%" }}
						onClick={addLike}
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
							{commentList.map((comment) => (
								<CommentItem key={comment.no} comment={comment} />
							))}
						</ul>
					</React.Fragment>
				) : null}
			</div>
		</div>
	);
};

export default CommentList;
