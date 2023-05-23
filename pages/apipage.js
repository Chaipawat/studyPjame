import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

const inter = Inter({ subsets: ["latin"] });


export default function newpage() {
  const [dataRick, setDataRick] = useState([]);
  const [pathApi, setPathapi] =  useState("");

  const getapi = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      console.log(response.data.results);
      setDataRick(response.data.results);
      //   return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getapi();
    
  }, []);

  function setPath(pathlink){
    setPathapi(pathlink)
    console.log("path : ",pathApi)
  }


  return (
    <>
      <Head>
        <title> Api Page</title>
      </Head>
      <div className={`${styles.bg} `}>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>Api Table</h1>
          <div>
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><h3>Name</h3></TableCell>
                    <TableCell align="center"><h3>Episode</h3></TableCell>
                    <TableCell align="center"><h3>Locations</h3></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRick.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                      <TableCell align="center">{row.origin.name}</TableCell>
                      <TableCell align="center">
                        <div onClick={()=>{setPath(row.location.url)}} >{row.location.name}</div>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </main>
      </div>
    </>
  );
}
