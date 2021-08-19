import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PwdCheckDialog = ({ dialogOpen, dialogClose, checkPwd, dialPurpose }) => {

	const pwdRef = useRef();

	return (
		<div>
			<Dialog open={dialogOpen} onClose={dialogClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">비밀번호</DialogTitle>
				<DialogContent>
					<DialogContentText>
						댓글의 비밀번호를 입력주세요.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="비밀번호"
						type="password"
						fullWidth
						onKeyPress={(event) => { checkPwd(event, pwdRef.current.value, dialPurpose) }}
						inputRef={pwdRef}
						required
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={dialogClose} color="primary">
						취소
					</Button>
					<Button
						onClick={(event) => { checkPwd(event, pwdRef.current.value, dialPurpose) }}
						color="primary">
						입력
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default PwdCheckDialog;