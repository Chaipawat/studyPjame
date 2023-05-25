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

  const[nextPage, setNextpage] = useState("");
  const[prevPage, setPrevPage] = useState("");

  const[currentPage, setCurrentPage] = useState(1);

  const[pagination, setPagination] = useState([1,2,3,4,5,6,7,8,9,10]);
  const[pageCount, setpageCount] = useState();
  // let pagination = [1,2,3,4,5,6,7,8,9,10]

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
      setNextpage(response.data.info.next)
      setPrevPage(response.data.info.prev)
      setpageCount(response.data.info.pages)
      setCurrentPage(1)
      console.log(response.data.info)
      //   return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  async function loadnextpage(){
    try {
      const response = await axios.get(
        nextPage
      );
      setDataRick(response.data.results);
      setNextpage(response.data.info.next)
      setPrevPage(response.data.info.prev)
      if(currentPage%10 == 0){
        let temp = [...pagination]
        setPagination(temp.map(t=>t+10).filter(t=>t<=pageCount))
      }
      setCurrentPage(prevDataRes => prevDataRes+1)
      console.log("-----next-----------")
      console.log("loadnext ",response.data.info.next)
      console.log("loadprev ",response.data.info.prev)
    } catch (error) {
      console.error(error);
    }

  }

  async function loadprevpage(){
    try {
      if(prevPage !== null){
      const response = await axios.get(
        prevPage
      );
      setDataRick(response.data.results);
      setNextpage(response.data.info.next)
      setPrevPage(response.data.info.prev)

      if(currentPage%10 == 1){
        let temp = [...pagination]
        let getprev = getPreviousPages(temp,currentPage)
        setPagination(getprev)
      }
      setCurrentPage(prevDataRes => prevDataRes-1)
      console.log("-----prev-----------")
      console.log("loadnext ",response.data.info.next)
      console.log("loadprev ",response.data.info.prev)
    }
    } catch (error) {
      console.error(error);
    }

  }

  function getPreviousPages(pages, currentPage) {
    const numberOfPages = 10; // Number of pages to show before the current page
  
    const startIndex = currentPage - numberOfPages;
    const endIndex = currentPage - 1;
  
    const previousPages = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (i >= 1) {
        previousPages.push(i);
      }
    }
  
    return previousPages;
  }

  async function gotoPage (number){
    try {
      if(number !== null){
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character?page=" + number
      );
      setDataRick(response.data.results);
      setNextpage(response.data.info.next)
      setPrevPage(response.data.info.prev)
      setCurrentPage(number)
      console.log("-----prev-----------")
      console.log("loadnext ",response.data.info.next)
      console.log("loadprev ",response.data.info.prev)
    }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function gotolast (){
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character?page=" + pageCount
      );
      setDataRick(response.data.results);
      setNextpage(response.data.info.next)
      setPrevPage(response.data.info.prev)
      let temp = [...pagination].map(t=>t-10)
      let findNum = findNumbersInRange(pageCount, temp)
      setPagination(findNum)
      setCurrentPage(pageCount)
      console.log("-----prev-----------")
      console.log("loadnext ",response.data.info.next)
      console.log("loadprev ",response.data.info.prev)
    } catch (error) {
      console.error(error);
    }
  }

  function findNumbersInRange(lastPage, range) {
    const numbers = [];
    let before = lastPage - 1;
    let after = lastPage + 1;
  
    while (before % 10 !== 1 && before >= range[0]) {
      before--;
    }
  
    while (after % 10 !== 0 && after <= range[1]) {
      after++;
    }
  
    for (let i = before; i <= lastPage; i++) {
      if (i >= range[0] && i <= lastPage) {
        numbers.push(i);
      }
    }
  
    return numbers;
  }

  const getInfo = async (path) => {
    try {
      const response = await axios.get(path);
      setDataInfo(response.data);
      console.log("responseinfo", response.data.residents.length)
      var temp = [];
      for (let i = 0; i < response.data.residents.length; i++) {
        let pathrest = response.data.residents[i];
        await residentinfo(pathrest);
        // temp.push(pathrest);
      }

      // setDataRes(temp)
    } catch (error) {
      console.error(error);
    }
  };

  const residentinfo = async (path) => {
    try {
      const response = await axios.get(path);
      // let arrrest = [...dataRes];
      // arrrest.push(response.data);
      // console.log(error);
      // setDataRes(arrrest);
      setDataRes(prevDataRes => [...prevDataRes, response.data]);
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
      // let arrrest = [...dataorigin];
      // arrrest.push(response.data);
      // setDataorigin(arrrest);
      setDataorigin(prevDataRes => [...prevDataRes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleclick(path, index) {
    setcheckindex(index);
    setCheckbutton(true);
    await getInfo(path);
    setTimeout(() => {
      setOpen(true);
      setCheckbutton(false);
    }, 1100);
  }

  async function handleOrigin(path, index) {
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
                      <h3>id</h3>
                    </TableCell>
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
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                       <TableCell component="th" scope="row" align="left">
                        {row.id}
                      </TableCell>
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
              <Button style={{ right:0 }} onClick={()=>{gotoPage(1)}}> first </Button>
              <Button style={{ right:0 }} onClick={()=>{loadprevpage()}} disabled={currentPage==1}> prev </Button>
              {pagination.map((row, idx) => (
                
                <Button key={`paginate_${idx}`} variant={row == currentPage ?"contained" : "text"} onClick={()=>{gotoPage(row)}}>
                {row}
                </Button>
              ))}
              <Button style={{ right:0 }} onClick={()=>{loadnextpage()}} disabled={currentPage==pageCount}> next </Button>
              <Button style={{ right:0 }} onClick={()=>{gotolast()}} > last </Button>
            </TableContainer>
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"ml"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Location Info"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Location name: {dataInfo.name}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Type: {dataInfo.type}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Dimension: {dataInfo.dimension}
              </DialogContentText>
                <hr style={{ marginTop: 10, marginBottom: 10 }} />
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      id
                    </TableCell>
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
                          {row.id}
                        </TableCell>
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
                          {row.type ? row.type : "-"}
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
            maxWidth={"ml"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Origin"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Origin name: {getoringin.name}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Type: {getoringin.type}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Dimension: {getoringin.dimension}
              </DialogContentText>
                <hr style={{ marginTop: 10, marginBottom: 10 }} />
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      <TableCell component="th" scope="row" align="left">
                          <h3>id</h3>
                        </TableCell>
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
                              {row.id}
                            </TableCell>
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
