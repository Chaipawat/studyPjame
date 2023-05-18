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
  const [inputG1, setinputG1] = useState("11");
  const [inputG2, setinputG2] = useState("222");
  const [inputG3, setinputG3] = useState("33");
  const [inputG4, setinputG4] = useState("444");

  let arr = [
    {
        "id": 1,
        "background": "yellow",
        "marginTop": "11%",
        "input1": "111",
        "input2": "1111",
        "isfix": true
    },
    {
        "id": 2,
        "background": "yellow",
        "marginTop": "11%",
        "input1": "222",
        "input2": "2222",
        "isfix": true
    },
    {
        "id": 3,
        "background": "yellow",
        "marginTop": "11%",
        "input1": "333",
        "input2": "333",
        "isfix": true
    },
    {
        "id": 4,
        "background": "yellow",
        "marginTop": "11%",
        "input1": "444",
        "input2": "444",
        "isfix": true
    }
]

  const [editmode, setEditmode] = useState(false);
  const [sortmode, setSortmode] = useState(true);

  const [arrtemp, setArrtemp] = useState([]);
  const [arrpin, setPin] = useState([]);

  const [arrgreen, setArrgreen] = useState([]);

  const [editindex, setEditindex] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let newObject = null;

    if (input1 !== "" && input2 !== "") {
      newObject = {
        id: arrtemp.length + 1,
        background: "yellow",
        marginTop: "11%",
        input1: input1,
        input2: input2,
        isfix: true,
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

    let newclone = [...arrtemp]; //เก็บค่าเก่าไว้ก่อน
    let temp = arrtemp.find((obj, index) => editindex === index); //เอา temp มาเพื่อหาตำแหน่งของค่าที่จะแก้ไข

    if (input1 !== "" && input2 !== "") {
      temp.input1 = input1; //เปลี่ยนค่า
      temp.input2 = input2; //เปลี่ยนค่า
    }

    newclone[editindex] = temp;

    setEditindex(null);
    setInput1("");
    setInput2("");
    setArrtemp(newclone);
    setEditmode(false);
  };

  useEffect(() => {
    console.log("input :  ", input1, input2);
  }, []);

  function sortAtoZ(e) {
    let arrsort = [...arrtemp];
    let compare = "";

    {
      e == true
        ? (compare = (a, b) =>
            a.input1 < b.input1 ? -1 : a.input1 > b.input1 ? 1 : 0) //sort A to Z
        : (compare = (a, b) =>
            a.input1 > b.input1 ? -1 : a.input1 < b.input1 ? 1 : 0); //sort Z to A
    }

    arrsort.sort(compare); //set arrsort ให้ทำงานตาม compare ด้านบน
    setArrtemp(arrsort); // set ค่ากลับเข้า arr เดิม

    {
      !sortmode ? setSortmode(true) : setSortmode(false);
    }
  }

  const handleSubGreen = (event) => {
      let newGreen = null
      newGreen = {
        id: arrtemp.length + 1,
        background: "green",
        marginTop: "5%",
        title: inputG1,
        content: inputG2,
        head: inputG3,
        body: inputG4,
      }
      if (newGreen) {
        setArrgreen((prevState) => [...prevState, newGreen]);
      }
  };

  function loaddata(){
    setArrtemp(arr)
  }

  useEffect(() => {
    loaddata()
  }, []);

  // useEffect(() => {
  //   if(arrtemp){
  //     arr = arrtemp
  //   }
  // }, [arrtemp]);

  return (
    <>
      <Head>
        <title>Hw 1 P'James</title>
      </Head>
      <div className={`${styles.bg} `}>
        <main className={`${styles.main} ${inter.className}`}>
          <div style={{ display: "flex" }}>
            <form
              // onSubmit={handleSubGreen}
              style={{ border: "1px solid #000000", margin: 5 }}
            >
              <h3 style={{ color: "#000000" }}>Input green</h3>
              <input
                value={inputG1}
                onChange={(e) => {
                  setinputG1(e.target.value);
                }}
                type="text"
                name="name"
              />

              <input
                value={inputG2}
                onChange={(e) => {
                  setinputG2(e.target.value);
                }}
                type="text"
                name="name"
              />

              <Button onClick={handleSubGreen}>กด</Button>
              {/* <Button onClick={() => sortAtoZ(sortmode)}>sort </Button> */}
            </form>

            { /* ////////////////////////////// */}
            <form
              onSubmit={editmode ? handleEdit : handleSubmit}
              style={{ border: "1px solid #000000", margin: 5 }}
            >
              <h3 style={{ color: "#000000" }}>Input yellow</h3>
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
              <Button onClick={() => sortAtoZ(sortmode)}>sort </Button>
            </form>
          </div>

          <div className={`${styles.background}`}></div>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <Green arrgreen={arrgreen} setArrgreen={setArrgreen} />
            </Grid>
            <Grid item md={3}>
              <Yellow
                arrtemp={arrtemp}
                setArrtemp={setArrtemp}
                setInput1={setInput1}
                setInput2={setInput2}
                setEditmode={setEditmode}
                setEditindex={setEditindex}
                arrpin = {arrpin}
                setPin = {setPin}
                loaddata = {loaddata}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
}
