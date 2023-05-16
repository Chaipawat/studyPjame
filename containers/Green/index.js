import React from "react";
import Title from "../../components/Text/Title";
import { Grid, Box } from "@mui/material";

function Showtitle({text,content}) {
  return (
    <Grid>
      <Title text={text} content={content} isfix={false} />
    </Grid>
  );
}

// function loop() {
//   let show = [];
//   for (let i = 0; i < 2; i++) {
//     show.push(<Showtitle key={i}/>);
//   }
//   return show
// }

function Green() {
  let arr = [{text:"title",content:"content"},{text:"head",content:"body"}]
  return (
    <div style={{ background: "green", marginTop: "5%" }}>
      {arr.map((obj,index) => {
        return(
        <Showtitle 
          text={obj.text}
          content={obj.content}
        />
        )
      })}

      {/* {loop()} */}
      {/* <Showtitle /> */}
    </div>
  );
}

export default Green;
