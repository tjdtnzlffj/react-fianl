import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../search/Search';
const ModalPage = forwardRef(({ }, ref) => {
	const modalState = useSelector(state => state.etc);
	const [renderingComponent, setRenderingComponent] = useState('');
	const dispatch = useDispatch();
	useImperativeHandle(ref, () => ({
		handleOpen,
		handleClose,
	}));
	const handleOpen = () => {
		dispatch({ type: "OPEN_MODAL", payload: { modalState: true, renderingComponent: <Search /> } });
	}
	const handleClose = () => {
		dispatch({ type: "CLOSE_MODAL", payload: { modalState: false } });
	};

	return (

		<Modal
			open={modalState.modalState}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div>
				<div>
					<Button
						startIcon={<HighlightOffIcon fontSize="large" style={{ color: 'white' }} />}
						onClick={handleClose}
						style={{ float: 'right', color: 'white' }}
					>
						닫기
					</Button>
				</div>

				{modalState.renderingComponent}

			</div>

		</Modal>

	);
});

export default ModalPage;