import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

//글꼴 들어가 있는 css파일
import '../../styles/css/home.css';

//세부 컴포넌트
import Carousel from './Carousel';
import ThumbNailCard from './ThumbNailCard';

//server api
import api from '../api/weeklyPost';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	container: {
		[theme.breakpoints.up("lg")]: {
			marginTop: "80px",
		},
	},
	pageDescription: {
		width: '50vw',
		margin: '20px auto',
	},
	thumbNailContainer: {
		display: 'flex',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		margin: 'auto',
		[theme.breakpoints.up('lg')]: {
			width: '68vw',
		},
	},
}));

const Home = () => {

	const [weeklyBestData, setWeeklyBestData] = useState([]);

	const classes = useStyles();

	//api 호출
	useEffect(() => {

		const getWeeklyBestData = async () => {
			const result = await api.fetchWeeklyBest();
			setWeeklyBestData(result.data);
		}
		getWeeklyBestData();
	},
		[]);

	return (
		<div className={classes.root}>
			<Grid container className={classes.container}>

				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1} />
				</Hidden>

				<Grid item xs={12} sm={10} md={10} lg={10} >
					<Paper className={classes.paper} >

						{/* home title 부분 */}
						<Typography variant="h5" component="h2" className="pageTitle">
							Bbangddcuk Top 6
						</Typography>

						{/* home description 부분 */}
						<Typography className={classes.pageDescription}>
							빵덕빵덕에서 가장 인기있는 게시글입니다.<br />
							자세히보기를 선택하여 더 많은 게시글을 확인해 주세요
						</Typography>

						{/* thumbNail 컨텐츠 부분 */}
						<Hidden smDown>
							<div className={classes.thumbNailContainer}>
								{
									weeklyBestData.map((item) =>
										<ThumbNailCard key={item.postNum} thumbNailData={item} />)
								}
							</div>
						</Hidden>

						{/* viewport 변경시 carousel로 썸네일 보여줌 */}
						<Hidden mdUp>
							<Carousel weeklyBestData={weeklyBestData} />
						</Hidden>

					</Paper>
				</Grid>

				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1} />
				</Hidden>

			</Grid>
		</div >
	);
}
export default Home;