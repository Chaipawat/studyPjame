import React from "react";
import { Grid, Box } from "@mui/material";

function title({ text = "", content = "", size = "85%", isfix = false }) {
  return (
    <div style={{ padding: "20px" }}>
      <Box
        display={isfix ? "block" : "flex"}
        flexDirection={"column"}
        style={{
          width: isfix ? size : "100%",
          background: "white",
          color: "black",
          padding: "28px",
        }}
      >
        <div>{text}</div>
        <div>{content}</div>
      </Box>
    </div>
  );
}

export default title;
