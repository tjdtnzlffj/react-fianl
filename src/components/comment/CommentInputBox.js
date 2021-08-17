import TextField from '@material-ui/core/TextField';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';
import PwdDialog from './PwdDialog';

const CommentInputBox = ({ postNo }) => {

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const inputCommentRef = useRef();

	//비밀번호 입력창에서 엔터를 치거나, 입력 버튼을 클릭하면 발생하는 함수 
	const addComment = (event, inputPwd) => {
		if (event.charCode === 13 || event._reactName === "onClick") {

			//비밀번호 입력 했으면 dispatch 안했으면 알림창
			if (!(inputPwd === '')) {
				dispatch({ type: "ADD_COMMENT", payload: { postNo, content: inputCommentRef.current.value, pwd: inputPwd } });
				inputCommentRef.current.value = '';
				pwdDialClose();
			} else {
				alert('비밀 번호를 입력해 주세요');
			}

		}
	}

	//댓글 입력창에서 엔터 치면 작동하는 함수
	const pwdDialOpen = (event) => {

		//댓글 입력 했으면 open state 제어해서 pwdDial 오픈
		if (event.charCode === 13) {
			if (!(inputCommentRef.current.value === '')) {
				setOpen(true);
			} else {
				alert('댓글 내용을 입력해 주세요');
			}
		}
	};

	//비밀번호 창에서 취소 누를때 작동하는 함수
	const pwdDialClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{/* 댓글 입력 창 */}
			<TextField
				id="standard-basic"
				variant="outlined"
				size="small"
				placeholder="댓글을 입력하세요..."
				required
				inputRef={inputCommentRef}
				//댓글을 입력하고 엔터키를 누르면 비밀번호 입력창 오픈
				onKeyPress={pwdDialOpen}
				style={{ width: "100%", }}
			/>

			{/* 댓글 비밀번호 입력창 */}
			<PwdDialog dialogOpen={open} dialogClose={pwdDialClose} addComment={addComment} />
		</div>
	);
}
export default CommentInputBox;