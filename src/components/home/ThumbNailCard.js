import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: '300px',
		// margin: '0 15px',
		border: 'solid',
		// borderColor: '#95c2fc',
		maxWidth: '300px',
		margin: '0 auto 20px',
	},
	contentBox: {
		height: '430px',
	},
	thumbImageBox: {
		overflow: 'hidden',
		height: '260px',
	},
	thumbTitle: {
		fontWeight: 'bold',
		marginTop: '15px',
		marginBottom: '15px',
		textAlign: 'left',
	},
	thumbContent: {
		height: '4rem',
		overflow: 'hidden',
		textAlign: 'left',
		fontSize: '0.9rem',
		color: '#6f6d6d',
	},
	learnMoreBtn: {
		paddingTop: '0px',
		paddingLeft: '16px',
		paddingBottom: '16px',
	},
}));

const ThumbNailCard = ({ thumbNailData }) => {
	const classes = useStyles();
	const history = useHistory();

	const handleClick = () => {
		console.log('history 객체 정체 체크 : ' + history);
		history.push(`/board/${thumbNailData.id}`);
	}

	return (
		<Card className={classes.root}>
			<CardContent className={classes.contentBox}>

				{/* 썸네일 이미지 */}
				<div className={classes.thumbImageBox}>
					<img src={thumbNailData.postImage} alt="" style={{ width: '100%', height: '100%', }} />
				</div>
				<Divider style={{ marginTop: '19px' }} />

				{/* 썸네일 제목 */}
				<Typography className={classes.thumbTitle}>
					{thumbNailData.postTitle}
				</Typography>

				{/* 썸네일 컨텐츠 간단 요약 */}
				<Typography className={classes.thumbContent}>
					{thumbNailData.postContent}
				</Typography>
			</CardContent>

			{/* 썸네일 관련 게시글로 이동하는 버튼 */}
			<CardActions className={classes.learnMoreBtn}>
				<Button
					size="small"
					style={{ backgroundColor: 'black', color: 'white', borderRadius: '0px', }}
					onClick={handleClick}
				>더 보기 &gt;</Button>
			</CardActions>
		</Card>
	);
}
export default ThumbNailCard;