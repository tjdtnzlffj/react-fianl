import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ThumbNailCard from './ThumbNailCard';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
		position: 'relative',
		margin: 'auto',
	},
	arrowIcon: {
		position: 'absolute',
		top: '30vh',
	},
}));

const Carousel1 = ({ weeklyBestData }) => {

	//현재 슬라이드
	const [activeStep, setActiveStep] = useState(0);

	//slide 개수
	const maxSteps = weeklyBestData.length;

	const classes = useStyles();
	const theme = useTheme();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className={classes.root}>

			{/* 썸네일 */}
			<ThumbNailCard thumbNailData={weeklyBestData[activeStep]} />

			{/* 썸네일 변경 하는 부분 */}
			<MobileStepper
				variant="dots"
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				className={classes.root}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={activeStep === 5}>
						Next
						{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
						Back
					</Button>
				}
			/>
		</div>
	);
}

export default Carousel1;