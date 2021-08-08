import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Search from './Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
const SearchModal = ({ modalOpen, modalClose }) => {

	const [open, setOpen] = useState(modalOpen);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{console.log('searchModal 컴포넌트 실행 체크' + typeof (modalOpen))}

			<Modal
				open={modalOpen}
				onClose={modalClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div>
					<IconButton onClick={modalClose}>
						<HighlightOffIcon folor="active" />
					</IconButton>
					<Search />
				</div>
			</Modal>
		</div>
	);
}

export default SearchModal;