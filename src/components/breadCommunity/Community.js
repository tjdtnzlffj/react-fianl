import { useEffect } from "react";
import BreadItem from "./CommunityItem";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';


const Community = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const commentDispatch = useDispatch();
	const boardList = useSelector(state => state.community);
	const { search } = useLocation();

	//queryString(ex - ?keyword=12345)에 찾고 싶은 키워드? 키? 가 없으면 undefined가 뜬다.
	const { keyword } = queryString.parse(search);
	useEffect(() => {
		dispatch({ type: "FETCH_BOARDLSIT" });
		commentDispatch({ type: "FETCH_COMMENTLIST" });
	}, [dispatch, commentDispatch]);



	return (
		<>
			<div>
				<Button
					variant="outlined"
					color="primary"
					style={{
						marginTop: "40px",
						marginLeft: "31.5%",
						marginBottom: "2px",
						cursor: "pointer",
					}}
					onClick={() => {
						history.push("/communityForm");
					}}
				>
					글 작성
				</Button>

				{
					keyword ?
						boardList.filter(post => post.postTitle.includes(keyword)).map((board) => {

							return (
								<BreadItem
									key={board.id}
									board={board}
								/>
							);
						})
						:
						boardList.map((board) => {

							return (
								<BreadItem
									key={board.id}
									board={board}
								/>
							);
						})}
			</div>
		</>
	);
};

export default Community;
