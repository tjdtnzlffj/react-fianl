import React from 'react';

import Modal from '@material-ui/core/Modal';
import Search from './Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
const SearchModal = ({ modalOpen, modalClose }) => {

	return (
		<div>
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