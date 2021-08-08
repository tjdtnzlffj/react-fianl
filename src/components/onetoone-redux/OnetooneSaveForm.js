import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { Button, Divider, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { PictureOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formRoot: {
    display: "flex",
    height: theme.typography.fontSize * 2,
  },
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },

  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "90%",
  },

  input: {
    display: "none",
  },
}));

const OnetooneSaveForm = () => {
  const classes = useStyles();

  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputAuthorRef = useRef();
  const inputPwdRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const [images, setImages] = useState();
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log("--imageList, addUpdateIndex ---");
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // console.log("---images---");
  // console.log(images);

  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("이미지는 1개까지만 첨부할 수 있습니다");
    }
  };

  const add = () => {
    if (images == null || undefined) {
      dispatch(
        {
          type: "ADD_ONETOONE",
          payload: {
            qnaTitle: inputTitleRef.current.value,
            qnaContent: inputContentRef.current.value,
            qnaAuthor: inputAuthorRef.current.value,
            qnaPwd: inputPwdRef.current.value,
            qnaPic: "",
          },
        },
        history.push("/onetoone")
      );
    } else {
      dispatch(
        {
          type: "ADD_ONETOONE",
          payload: {
            qnaTitle: inputTitleRef.current.value,
            qnaContent: inputContentRef.current.value,
            qnaAuthor: inputAuthorRef.current.value,
            qnaPwd: inputPwdRef.current.value,
            qnaPic: images[0].data_url,
          },
        },
        history.push("/onetoone")
      );
    }
  };

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5">1:1 QnA</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <form className={classes.root} noValidate autoComplete="off">
              <h3>제목</h3>
              <TextField
                className={classes.field}
                label="제목을 입력하세요."
                variant="outlined"
                fullWidth
                required
                inputRef={inputTitleRef}
                name="qnaTitle"
              />
              <h3>글쓴이</h3>
              <TextField
                className={classes.field}
                label="닉네임을 입력하세요."
                variant="outlined"
                fullWidth
                required
                inputRef={inputAuthorRef}
                name="qnaAuthor"
              />
              <h3>내용</h3>
              <TextField
                className={classes.field}
                label="내용을 입력하세요."
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                required
                inputRef={inputContentRef}
                name="qnaContent"
              />
              <h3>비밀번호</h3>
              <TextField
                className={classes.field}
                label="비밀번호를 입력하세요."
                variant="outlined"
                required
                inputRef={inputPwdRef}
                name="qnaPwd"
              />
              <h3>사진</h3>
            </form>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              onError={onError}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <PictureOutlined /> 사진추가
                  </Button>
                  &nbsp;
                  {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button
                          color="primary"
                          onClick={() => onImageUpdate(index)}
                        >
                          수정
                        </Button>
                        <Button onClick={() => onImageRemove(index)}>
                          삭제
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "90%" }}
              onClick={add}
              name="qnaPic"
            >
              저장
            </Button>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default OnetooneSaveForm;
