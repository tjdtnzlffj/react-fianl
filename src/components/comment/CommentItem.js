import { useDispatch } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useState } from "react";
import TextField from '@material-ui/core/TextField';
import PwdCheckDialog from "./PwdCheckDialog";


const useStyles = makeStyles({
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


const CommentItem = ({ comment }) => {
	const classes = useStyles();
	const [modifyState, setModifyState] = useState(false);
	const [pwdDialState, setPwdDialState] = useState(false);
	const [pwdDialPurpose, setPwdDialPurpose] = useState('');
	const inputModifyingComment = useRef();
	const dispatch = useDispatch();

	const handlePwdDialog = () => {
		setPwdDialState(!pwdDialState);
	}

	const openPwdDialog = (purpose) => {
		setPwdDialState(true);
		setPwdDialPurpose(purpose);
	}

	const checkPwd = (event, inputPwd, purpose) => {
		if (event.charCode === 13 || event._reactName === "onClick") {

			if (!(inputPwd === '')) {
				if (inputPwd === comment.pwd) {
					handlePwdDialog();
					switch (purpose) {
						case 'delete':
							deleteComment(comment.no);
							break;
						case 'modify':
							setModifyState(true);
							break;
					}

				} else {
					alert('비밀번호 불일치');
				}
			} else {
				alert('비밀 번호를 입력해 주세요');
			}
		}
	}

	const change = (event, inputModifyingComment) => {
		if (event.charCode === 13) {
			if (!(inputModifyingComment === '')) {
				modifyComment(inputModifyingComment);
				setModifyState(false);
			} else {
				alert('수정할 내용을 입력해 주세요');
			}
		}
	}

	const modifyComment = (inputModifyingComment) => {
		dispatch({ type: "MODIFY_COMMENT", payload: { no: comment.no, content: inputModifyingComment } });
	}
	const deleteComment = (commentNo) => {
		dispatch({ type: "DELETE_COMMENT", payload: commentNo });
	}

	return (
		<>
			<PwdCheckDialog dialogOpen={pwdDialState} dialogClose={handlePwdDialog} checkPwd={checkPwd} dialPurpose={pwdDialPurpose} />
			{
				modifyState ? <TextField defaultValue={comment.content} size="small" variant="outlined" inputRef={inputModifyingComment} onKeyPress={(event) => { change(event, inputModifyingComment.current.value); }} /> : <Typography key={comment.no} color="primary" style={{ textAlign: "left" }}>{comment.content}</Typography>
			}
			<div className={classes.etcContainer}>
				<Typography className={classes.etcItem} onClick={() => { openPwdDialog('modify') }}>수정</Typography>
				<Typography className={classes.etcItem} onClick={() => { openPwdDialog('delete') }}>삭제</Typography>
			</div>
		</>
	);
}
export default CommentItem;