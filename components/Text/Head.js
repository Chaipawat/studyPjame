import React from "react";
import { Grid ,Box} from "@mui/material";

function head() {
  return (
    <div style={{padding:"20px" }}>
        <Box display={"flex"} flexDirection={"column"} style={{background: "white", color:"black",padding: "28px"}}> 
          <div>Header</div>
          <div>Body</div>
        </Box>
    </div>
  );
}

export default head;