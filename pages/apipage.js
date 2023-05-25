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
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

const inter = Inter({ subsets: ["latin"] });

export default function newpage() {
  const [dataRick, setDataRick] = useState([]);
  const [pathApi, setPathapi] = useState("");

  const [dataRes, setDataRes] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  const [dataorigin, setDataorigin] = useState([]);
  const [getoringin, setGetOringin] = useState([]);

  const [open, setOpen] = useState(false);
  const [checkbutton, setCheckbutton] = useState(false);
  const [checkindex, setcheckindex] = useState("");

  const [open2, setOpen2] = useState(false);
  const [checkbutton2, setCheckbutton2] = useState(false);
  const [checkindex2, setcheckindex2] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const getapi = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      setDataRick(response.data.results);
      //   return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getInfo = async (path) => {
    try {
      const response = await axios.get(path);
      setDataInfo(response.data);
      console.log("responseinfo", response.data.residents.length)
      // var temp = [];
      for (let i = 0; i < response.data.residents.length; i++) {
        let pathrest = response.data.residents[i];
        // console.log("pathrest : ",pathrest)
        await residentinfo(pathrest);
        // temp.push(pathrest);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const residentinfo = async (path) => {
    try {
      const response = await axios.get(path);
      let arrrest = [...dataRes];
      arrrest.push(response.data);
      setDataRes(arrrest);
    } catch (error) {
      console.error(error);
    }
  };

  const getorigin = async (path) => {
    try {
      const response = await axios.get(path);
      console.log("getorigin : ", response.data.residents);

      setGetOringin(response.data);


      for (let i = 0; i < response.data.residents.length; i++) {
        let pathrest = response.data.residents[i];
        origininfo(pathrest);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const origininfo = async (path) => {
    try {
      const response = await axios.get(path);
      // console.log("origininfo : ", response.data);
      let arrrest = [...dataorigin];
      arrrest.push(response.data);
      setDataorigin(arrrest);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleclick(path, index) {
    setDataRes([])
    setcheckindex(index);
    setCheckbutton(true);
    await getInfo(path);
    setTimeout(() => {
      setOpen(true);
      setCheckbutton(false);
    }, 1100);
  }

  async function handleOrigin(path, index) {
    setDataorigin([])
    setcheckindex2(index);
    setCheckbutton2(true);
    await getorigin(path);
    setTimeout(() => {
      setOpen2(true);
      setCheckbutton2(false);
    }, 1100);
  }

  useEffect(() => {
    getapi();
  }, []);

  return (
    <>
      <Head>
        <title> Api Page</title>
      </Head>
      <div className={`${styles.bg} `}>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>Api Table</h1>
          <div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <h3>Name</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>origin</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3>Locations</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRick.map((row, idx) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{ color: "#000000", minWidth: "100px" }}
                          onClick={() => {
                            handleOrigin(row.origin.url, idx);
                          }}
                        >
                          {checkbutton2 && checkindex2 == idx ? (
                            <CircularProgress size={"24px"} />
                          ) : (
                            row.origin.name
                          )}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{ color: "#000000", minWidth: "100px" }}
                          onClick={() => {
                            handleclick(row.location.url, idx);
                          }}
                        >
                          {checkbutton && checkindex == idx ? (
                            <CircularProgress size={"24px"} />
                          ) : (
                            row.location.name
                          )}
                        </Button>
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
            <DialogTitle id="alert-dialog-title">{"Location Info"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Location name: {dataInfo.name}
                {/* <hr style={{ marginTop: 10, marginBottom: 10 }} /> */}
                Type: {dataInfo.type}
                {/* <hr style={{ marginTop: 10, marginBottom: 10 }} /> */}
                Dimension: {dataInfo.dimension}
                {/* <hr style={{ marginTop: 10, marginBottom: 10 }} /> */}
              </DialogContentText>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      name
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      status
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      species
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRes &&
                    dataRes.map((row, index) => (
                      <TableRow
                        key={index} // Use index as the key since row.id doesn't seem to be available
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="td" scope="row" align="left">
                          {row.name}
                        </TableCell>
                        <TableCell component="td" scope="row" align="left">
                          {row.status}
                        </TableCell>
                        <TableCell component="td" scope="row" align="left">
                          {row.species}
                        </TableCell>
                        <TableCell component="td" scope="row" align="left">
                          {row.type}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ปิด</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Origin"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                 Origin name : {getoringin.name}      
                Type : {getoringin.type} 
                Dimension : {getoringin.dimension} 
              </DialogContentText>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell component="th" scope="row" align="left">
                          <h3>name</h3>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <h3>status</h3>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <h3>species</h3>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <h3>type</h3>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataorigin &&
                        dataorigin.map((row, index) => (
                          <TableRow
                            key={index} // Use index as the key since row.id doesn't seem to be available
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              component="td"
                              scope="row"
                              align="left"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              component="td"
                              scope="row"
                              align="left"
                            >
                              {row.status}
                            </TableCell>
                            <TableCell
                              component="td"
                              scope="row"
                              align="left"
                            >
                              {row.species}
                            </TableCell>
                            <TableCell
                              component="td"
                              scope="row"
                              align="left"
                            >
                              {row.type ? row.type : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2}>ปิด</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </>
  );
}
