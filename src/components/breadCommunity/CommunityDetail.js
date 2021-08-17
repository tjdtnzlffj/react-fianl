import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";

const CommunityDetail = (props) => {
	const history = useHistory();
	console.log(1, props);
	const id = props.match.params.id;

	const [board, setBoard] = useState({
		id: "",
		title: "",
		content: "",
	});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
			.then((res) => res.json())
			.then((res) => {
				setBoard(res);
			});
	}, []);

	const removeBoard = () => {
		fetch(`${process.env.REACT_APP_API_BASE}/board/` + id, {
			method: "DELETE",
		})
			.then((res) => res.text())
			.then((res) => {
				props.history.push("/board");
			});
	};

	const updateBoard = () => {
		props.history.push("/updateForm/" + id);
	};

	return (
		<div>
			<h1>게시물{id}</h1>
			<Button
				variant="outlined"
				onClick={updateBoard}
				style={{ marginRight: "10px" }}
			>
				수정
			</Button>
			<Button variant="outlined" onClick={removeBoard}>
				삭제
			</Button>
			<hr />
			<h2>{board.title}</h2>
			<h4>{board.content}</h4>
			<div>
				{" "}
				<Button
					variant="outlined"
					onClick={() => {
						history.push("/board");
					}}
					style={{ marginLeft: "1230px" }}
				>
					목록
				</Button>
			</div>
		</div>
	);
};

export default CommunityDetail;
