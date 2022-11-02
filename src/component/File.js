import * as React from 'react';
// import { makeStyles, createStyles, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//     input: {
//       display: 'none',
//     },
//   }),
// );

export default function UploadButtons() {
//   const classes = useStyles();

  return (
    <div >
      <input
        accept="image/*"
        // className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <input
        accept="image/*"
        // className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}