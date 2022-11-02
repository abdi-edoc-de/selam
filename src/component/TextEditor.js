import React, { useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";

import { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
export default function MyEditor(props) {
  const { txt } = props;
  const [value, setValue] = useState(txt);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(txt))
  );
  const customStyleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through",
    },
    FONT_SIZE_30: {
      fontSize: "100px",
    },
  };
  return (
    <div>
      <Box
        sx={{
        minWidth: 300,
          p: 2,
          borderRadius: 5,
          width: 300,
          height: "100%",
          "&:hover": {
            backgroundColor: "#DCDCDC",
            opacity: [0.2, 0.7, 1],
          },
        }}
      >
        <Button 
        onClick={()=>{
            navigator.clipboard.writeText(value)
        }}
        fullWidth startIcon={<ContentCopyIcon />}>
          Copy{" "}
        </Button>
        <Editor
          customStyleMap={customStyleMap}
          editorState={editorState}
          onChange={(v) => {
            setEditorState(v);
            setValue(v.getCurrentContent().getPlainText("\u0001"));
          }}
        />
      </Box>
    </div>
  );
}
