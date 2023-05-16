import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Green from "../containers/Green";
import Yellow from "../containers/Yellow";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [editmode,setEditmode] = useState(false);
  const [arrtemp, setArrtemp] = useState([
    { id: 1, background: "yellow", marginTop: "11%" },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newObject = null;

    if (input1 !== "" && input2 !== "" ) {
      newObject = {
        id: arrtemp.length + 1,
        background: "yellow",
        marginTop: "11%",
        input1: input1,
        input2: input2,
        isfix : true,
      };
    }
    if (newObject) {
      setArrtemp((prevState) => [...prevState, newObject]);

    }
    setInput1("");
    setInput2("");
  };

  const handleEdit = (event) => {
    event.preventDefault();

    let newObject = null;

    if (input1 !== "" && input2 !== "" ) {
      newObject = {
        id: arrtemp.length + 1,
        background: "yellow",
        marginTop: "11%",
        input1: input1,
        input2: input2,
        isfix : true,
      };
    }
    if (newObject) {
      setArrtemp(() => [newObject]);
    }

    setInput1("");
    setInput2("");
    setEditmode(false)
  };

  useEffect(() => {
    console.log("input :  " ,input1 ,input2)
  },[])

  

  return (
    <>
      <Head>
        <title>Hw 1 P'James</title>
      </Head>
      <div className={`${styles.bg} `}>
        <main className={`${styles.main} ${inter.className}`}>
          <form onSubmit={editmode ? handleEdit : handleSubmit}>
            <input
              value={input1}
              onChange={(e) => {
                setInput1(e.target.value);
              }}
              type="text"
              name="name"
            />

            <input
              value={input2}
              onChange={(e) => {
                setInput2(e.target.value);
              }}
              type="text"
              name="name"
            />

            <Button type="submit">{editmode ? "แก้ไข" : "กด"} </Button>
          </form>
          

          <div className={`${styles.background}`}></div>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <Green />
            </Grid>
            <Grid item md={3}>
              <Yellow arrtemp={arrtemp} setArrtemp={setArrtemp} setInput1={setInput1} setInput2={setInput2} setEditmode={setEditmode}/>
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
}
