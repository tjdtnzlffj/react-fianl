import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { Button, Divider, Typography } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
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
}));

const UpdateForm = (props) => {
  const id = props.match.params.id;

  const [imagesUpdate, setImagesUpdate] = useState();
  const maxNumber = 1;

  const onChange = (image) => {
    console.log("--image ---");
    console.log(image);
    setImagesUpdate(image);
  };

  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("이미지는 1개까지만 첨부할 수 있습니다");
    }
  };

  const classes = useStyles();

  const [onetoone, setOnetoone] = useState({
    qnaTitle: "",
    qnaAuthor: "",
    qnaContent: "",
    qnaPwd: "",
    qnaPic: "",
  });

  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputAuthorRef = useRef();
  const inputPwdRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const save = () => {
    if (window.confirm("수정하시겠습니까?")) {
      if (imagesUpdate == null || undefined) {
        dispatch(
          {
            type: "MODIFY_ONETOONE",
            payload: {
              id,
              qnaTitle: inputTitleRef.current.value,
              qnaContent: inputContentRef.current.value,
              qnaAuthor: inputAuthorRef.current.value,
              qnaPwd: inputPwdRef.current.value,
              qnaPic: "",
            },
          },
          alert("수정되었습니다."),
          history.push("/onetoone")
        );
      } else {
        dispatch(
          {
            type: "MODIFY_ONETOONE",
            payload: {
              id,
              qnaTitle: inputTitleRef.current.value,
              qnaContent: inputContentRef.current.value,
              qnaAuthor: inputAuthorRef.current.value,
              qnaPwd: inputPwdRef.current.value,
              qnaPic: imagesUpdate[0].data_url,
            },
          },
          alert("수정되었습니다."),
          history.push("/onetoone")
        );
      }
    }
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/onetoone/` + id)
      .then((res) => res.json())
      .then((res) => {
        setOnetoone(res);
      });
  }, [id]);

  const changeValue = (e) => {
    setOnetoone({
      ...onetoone,
      [e.target.name]: e.target.value,
    });
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
                variant="outlined"
                fullWidth
                required
                onChange={changeValue}
                name="qnaTitle"
                value={onetoone.qnaTitle}
                inputRef={inputTitleRef}
              />
              <h3>글쓴이</h3>
              <TextField
                className={classes.field}
                variant="outlined"
                fullWidth
                required
                onChange={changeValue}
                name="qnaAuthor"
                value={onetoone.qnaAuthor}
                inputRef={inputAuthorRef}
              />
              <h3>내용</h3>
              <TextField
                className={classes.field}
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                required
                onChange={changeValue}
                name="qnaContent"
                value={onetoone.qnaContent}
                inputRef={inputContentRef}
              />
              <h3>비밀번호</h3>
              <TextField
                className={classes.field}
                variant="outlined"
                required
                onChange={changeValue}
                name="qnaPwd"
                inputRef={inputPwdRef}
              />
              <h3>사진</h3>
            </form>
            <ImageUploading
              multiple
              value={imagesUpdate}
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
              onClick={save}
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
export default UpdateForm;
