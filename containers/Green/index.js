import React, { useState, useEffect } from "react";
import Title from "../../components/Text/Title";
import { Grid, Box, Button } from "@mui/material";

function Showtitle({ text, content }) {
  return (
    <Grid>
      <Title text={text} content={content} isfix={false} />
    </Grid>
  );
}

function greenshow({ arrGreen, setArrgreen }) {


  // useEffect(() => {
    // console.log("arrgreen : ", arrgreen);
  // }, [arrgreen]);

  return (
    <>
      {arrGreen.map((obj, index) => {
        return (
          <div style={{ background: obj.background, marginTop: obj.marginTop }}>
            {greenBox1(obj)}
            {greenBox2(obj)}
          </div>
        );
      })}
    </>
  );
}

function greenBox1(object) {
  return (
    <>
      <Showtitle text={object.title} content={object.content} />
    </>
  );
}

function greenBox2(object) {
  return (
    <>
      <Showtitle text={object.head} content={object.body} />
    </>
  );
}

export default greenshow;
