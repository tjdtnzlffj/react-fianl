//card ui 모듈
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider, IconButton } from '@material-ui/core';

//icon
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MessageIcon from '@material-ui/icons/Message';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';

import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '280px',
		marginBottom: '20px',

	},
	media: {
		marginTop: '30px',
		marginBottom: '20px',
	},
	title: {
		marginBottom: '25px',
	},
	developerInfo: {
		display: 'flex',
		margin: '7px 0',
	},
	infoIcon: {
		marginRight: '5px',
		color: 'grey',
	},
	actionIconBt: {
		backgroundColor: '#3a3636',
		padding: '9px',
	},
	actionIcon: {
		color: 'white',
	},
}));

const ManagerInfoCard = ({ manager }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent style={{ paddingBottom: '0' }}>

				{/* 관리자 이미지 */}
				<div className={classes.media}>
					<img src={manager.image} style={{ width: '100px', height: 'auto', borderRadius: '70%', overflow: 'hidden', }} />
				</div>

				<Divider variant="middle" style={{ margin: '25px auto', border: '0', height: '5px', width: '25px' }} />

				{/* 관리자 이름 & 직무?? */}
				<div className={classes.title}>
					<Typography style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
						{manager.name}
					</Typography>

					<Typography variant="subtitle1" style={{ color: '#a6a6a6', fontSize: '0.99rem' }}>
						{manager.job}
					</Typography>
				</div>

				{/* 관리자 상세 정보(지역, 소속, 이메일주소) */}
				<div style={{ textAlign: 'left' }}>

					{/* 지역 */}
					<div className={classes.developerInfo}>
						<LocationOnIcon className={classes.infoIcon} />
						<Typography style={{ fontSize: '0.9rem' }}>
							{manager.loc}
						</Typography>
					</div>

					{/* 소속 */}
					<div className={classes.developerInfo}>
						<BusinessIcon className={classes.infoIcon} />
						<Typography style={{ fontSize: '0.9rem' }}>
							{manager.dept}
						</Typography>
					</div>

					{/* 이메일 주소 */}
					<div className={classes.developerInfo}>
						<MailOutlineIcon className={classes.infoIcon} />
						<Typography style={{ fontSize: '0.9rem' }}>
							{manager.eaddress}
						</Typography>
					</div>

				</div>
			</CardContent >

			{/* 관리자랑 관련된 곳으로 연결되는 아이콘버튼 */}
			<CardActions style={{ paddingTop: '15px', justifyContent: 'center', }}>
				<IconButton className={classes.actionIconBt} >
					<MailOutlineRoundedIcon className={classes.actionIcon} />
				</IconButton>
				<IconButton className={classes.actionIconBt}>
					<MessageIcon className={classes.actionIcon} />
				</IconButton>
				<IconButton className={classes.actionIconBt}>
					<FacebookIcon className={classes.actionIcon} />
				</IconButton >
				<IconButton className={classes.actionIconBt}>
					<TwitterIcon className={classes.actionIcon} />
				</IconButton>
			</CardActions>

		</Card >

	);
}

export default ManagerInfoCard;