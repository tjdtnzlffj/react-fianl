import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CommentList from "../comment/CommentList";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		backgroundColor: "#f4f1f1",
	},
}));

const CommunityDetail = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const id = props.match && props.match.params.id;

	const [board, setBoard] = useState({
		id: "",
		postTitle: "",
		postContent: "",
		postDate: "",
		postImage: "",
		postLike: "",
		postPwd: "",
	});

	const remove = () => {
		const InputpwdTest = prompt("비밀번호를 입력하세요");
		if (parseInt(InputpwdTest) === parseInt(board.postPwd)) {
			dispatch({ type: "REMOVE_BOARD", payload: id }, history.push("/board"));
			alert("삭제되었습니다.");
		} else {
			alert("비밀번호가 일치하지 않습니다.");
		}
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
			.then((res) => res.json())
			.then((res) => {
				setBoard(res);
			});
		// setBoard();
	}, []);

	const updateBoard = () => {
		const InputpwdTest = prompt("비밀번호를 입력하세요");
		if (parseInt(InputpwdTest) === parseInt(board.postPwd)) {
			props.history.push("/CommunityUpdateForm/" + id);
		} else {
			alert("비밀번호가 일치하지 않습니다.");
		}
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={8} lg={8}>
					{/* 이미지 들어가는 부분 */}
					<Paper className={classes.paper}>
						<img
							src={board.postImage}
							alt="bread"
							style={{
								objectFit: "contain",
								height: "600px",
								maxHeight: "600px",
								maxWidth: "800px",
							}}
						/>
					</Paper>
				</Grid>
				{/* 내용 들어 가는 부분 */}
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Paper
						className={classes.paper}
						style={{
							height: "635px",
							maxHeight: "635px",
							overflow: "auto",
						}}
					>
						<div>
							<h2>{board.postTitle}</h2>
							<hr />
							<h3 style={{ textAlign: "left" }}>{board.postContent}</h3>
							<div>
								<Button
									variant="outlined"
									onClick={updateBoard}
									style={{ marginRight: "10px" }}
								>
									수정
								</Button>
								<Button variant="outlined" onClick={remove}>
									삭제
								</Button>
								<Button
									variant="outlined"
									onClick={() => {
										history.push("/board");
									}}
									style={{ marginLeft: "365px" }}
								>
									목록
								</Button>
							</div>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={8}>
					<Paper
						className={classes.paper}
						style={{ maxHeight: 300, overflow: "auto" }}
					>
						<CommentList
							like={board.postLike}
							postNo={board.id}
						/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default CommunityDetail;
