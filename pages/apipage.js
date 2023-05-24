import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const inter = Inter({ subsets: ["latin"] });


export default function newpage() {
  const [dataRick, setDataRick] = useState([]);
  const [pathApi, setPathapi] = useState("");

  const [dataRes, setDataRes] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function setPath(pathlink) {
    setPathapi(pathlink)
    setOpen(true);
    console.log("path : ", pathApi)
  }

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
    getapi();
  }, []);

  useEffect(() => {
    getInfo();
  }, [pathApi]);



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
                        <Button style={{color:"#000000" }} onClick={() => { setPath(row.location.url) }} >{row.location.name}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Page Info"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div> location name : {dataInfo.name} </div>
                <hr style={{marginTop:10, marginBottom: 10 }}/>
                <div> type : {dataInfo.type} </div>
                <hr  style={{marginTop:10, marginBottom: 10 }}/>
                <div> dimension : {dataInfo.dimension} </div>
                <hr style={{marginTop:10, marginBottom: 10 }}/>
                <div>
                  <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left"><h3>residents</h3></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataRes && dataRes.map((row, index) => (
                          <TableRow
                            key={index} // Use index as the key since row.id doesn't seem to be available
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" align="left">
                              {row}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ปิด</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </>
  );
}
