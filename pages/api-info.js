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

const inter = Inter({ subsets: ["latin"] });


export default function pageinfo({
  // pathApi,
}) {

  let pathApi = "https://rickandmortyapi.com/api/location/20"

  const [dataRes, setDataRes] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  const getInfo = async () => {
    try {
      const response = await axios.get(
        pathApi
      );
      console.log(response.data);
      setDataInfo(response.data);
      setDataRes(response.data.residents)
      //   return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);



  return (
    <>
      <Head>
        <title>Page Info</title>
      </Head>
      <div className={`${styles.bg} `}>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>Page Info</h1>
          <div style={{marginTop:10,marginBottom:10}}> location name : {dataInfo.name} |  type : {dataInfo.type} | dimension : {dataInfo.dimension} </div>
          <div>
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><h3>residents</h3></TableCell>
                    {/* <TableCell align="center"><h3>Episode</h3></TableCell>
                    <TableCell align="center"><h3>Locations</h3></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRes.map((row,index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{row}</TableCell>
                      {/* <TableCell align="center">{}</TableCell>
                      <TableCell align="center"><a >{row.location.name}</a></TableCell> */}
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
