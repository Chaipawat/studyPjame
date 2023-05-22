import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Green from "../containers/Green";
import Yellow from "../containers/Yellow";
import Select from 'react-select'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputYel1, setInputYel1] = useState("");
  const [inputYel2, setInputYel2] = useState("");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const [inputG1, setinputG1] = useState("11");
  const [inputG2, setinputG2] = useState("222");
  const [inputG3, setinputG3] = useState("33");
  const [inputG4, setinputG4] = useState("444");

  let arrData = [
    {
      id: 1,
      background: "yellow",
      marginTop: "11%",
      inputYel1: "111",
      inputYel2: "1111",
      isfix: true,
      tag: "A"
    },
    {
      id: 2,
      background: "yellow",
      marginTop: "11%",
      inputYel1: "222",
      inputYel2: "2222",
      isfix: true,
      tag: "B"
    },
    {
      id: 3,
      background: "yellow",
      marginTop: "11%",
      inputYel1: "333",
      inputYel2: "333",
      isfix: true,
      tag: "A"
    },
    {
      id: 4,
      background: "yellow",
      marginTop: "11%",
      inputYel1: "444",
      inputYel2: "444",
      isfix: true,
      tag: "B"
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: '-', label: '-' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' }
  ]

  const [editMode, setEditmode] = useState(false);
  const [sortMode, setSortmode] = useState(true);

  const [arrTemp, setArrtemp] = useState([]);
  const [arrPin, setPin] = useState([]);

  const [arrGreen, setArrgreen] = useState([]);

  const [editIndex, setEditindex] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let newObject = null;

    if (inputYel1 !== "" && inputYel2 !== "") {
      newObject = {
        id: arrTemp.length + 1,
        background: "yellow",
        marginTop: "11%",
        inputYel1: inputYel1,
        inputYel2: inputYel2,
        isfix: true,
        tag:selectedOption.value,
      };
    }
    if (newObject) {
      setArrtemp((prevState) => [...prevState, newObject]);
    }
    setInputYel1("");
    setInputYel2("");
  };

  const handleEdit = (event) => {
    event.preventDefault();

    let newclone = [...arrTemp]; //เก็บค่าเก่าไว้ก่อน
    let temp = arrTemp.find((obj, index) => editIndex === index); //เอา temp มาเพื่อหาตำแหน่งของค่าที่จะแก้ไข

    if (inputYel1 !== "" && inputYel2 !== "") {
      temp.inputYel1 = inputYel1; //เปลี่ยนค่า
      temp.inputYel2 = inputYel2; //เปลี่ยนค่า
    }

    newclone[editIndex] = temp;

    setEditindex(null);
    setInputYel1("");
    setInputYel2("");
    setArrtemp(newclone);
    setEditmode(false);
  };

  useEffect(() => {
    console.log("input :  ", inputYel1, inputYel2);
  }, []);

  function sort_AtoZ(bool) {
    let arrSort = [...arrTemp];
    let Compare = "";

    {
      bool == true
        ? (Compare = (a, b) =>
            a.inputYel1 < b.inputYel1 ? -1 : a.inputYel1 > b.inputYel1 ? 1 : 0) //sort A to Z
        : (Compare = (a, b) =>
            a.inputYel1 > b.inputYel1 ? -1 : a.inputYel1 < b.inputYel1 ? 1 : 0); //sort Z to A
    }

    arrSort.sort(Compare); //set arrsort ให้ทำงานตาม compare ด้านบน
    setArrtemp(arrSort); // set ค่ากลับเข้า arr เดิม

    {
      !sortMode ? setSortmode(true) : setSortmode(false);
    }
  }

  const handleSubGreen = (event) => {
    let newGreen = null;
    newGreen = {
      id: arrTemp.length + 1,
      background: "green",
      marginTop: "5%",
      title: inputG1,
      content: inputG2,
      head: inputG3,
      body: inputG4,
    };
    if (newGreen) {
      setArrgreen((prevState) => [...prevState, newGreen]);
    }
  };

  function loadDataArr() {
    setArrtemp(arrData);
  }

  useEffect(() => {
    loadDataArr();
  }, []);

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

            {/* ////////////////////////////// */}
            <form
              onSubmit={editMode ? handleEdit : handleSubmit}
              style={{ border: "1px solid #000000", margin: 5 }}
            >
              <h3 style={{ color: "#000000" }}>Input yellow</h3>
              <input
                value={inputYel1}
                onChange={(e) => {
                  setInputYel1(e.target.value);
                }}
                type="text"
                name="name"
              />

              <input
                value={inputYel2}
                onChange={(e) => {
                  setInputYel2(e.target.value);
                }}
                type="text"
                name="name"
              />
              <Select value={selectedOption} options={options} onChange={(v)=>setSelectedOption(v)} />
              <Button type="submit">{editMode ? "แก้ไข" : "กด"} </Button>
              <Button onClick={() => sort_AtoZ(sortMode)}>sort </Button>
            </form>
          </div>

          <div className={`${styles.background}`}></div>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <Green arrGreen={arrGreen} setArrgreen={setArrgreen} />
            </Grid>
            <Grid item md={3}>
              <Yellow
                arrTemp={arrTemp}
                setArrtemp={setArrtemp}
                setInputYel1={setInputYel1}
                setInputYel2={setInputYel2}
                setEditmode={setEditmode}
                setEditindex={setEditindex}
                arrPin={arrPin}
                setPin={setPin}
                loadDataArr={loadDataArr}
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
}
