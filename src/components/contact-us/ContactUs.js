import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import ManagerInfoCard from './ManagerInfoCard';

//api
import api from '../api/manager';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	adminInfoContainer: {
		display: 'flex',
		flexFlow: 'wrap',
		justifyContent: 'space-evenly',
		[theme.breakpoints.up('lg')]: {
			width: '90%',
			margin: 'auto',
		},
	},
}));

const ContactUs = () => {

	const [managerInfo, setManagerInfo] = useState([]);
	const classes = useStyles();


	useEffect(() => {
		const getData = async () => {
			const result = await api.fetchManagerInfo();
			setManagerInfo(result.data);
		}
		getData();
	}, []);

	return (
		<div className={classes.root}>
			<Grid container spacing={1} className={classes.container}>
				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1} />
				</Hidden>
				<Grid item xs={12} sm={10} md={10} lg={10}>
					<Paper className={classes.paper}>

						{/* page 타이틀 */}
						<Typography variant="h4">Contact Us</Typography>

						<Divider style={{ margin: '10px 0 30px' }} />

						{/* manager info card  */}
						<div className={classes.adminInfoContainer}>
							{
								managerInfo.map(
									(eachManagerInfo) => <ManagerInfoCard key={eachManagerInfo.id} manager={eachManagerInfo} />
								)
							}
						</div>
					</Paper>
				</Grid>
				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1} />
				</Hidden>
			</Grid>
		</div>
	);
}

export default ContactUs;