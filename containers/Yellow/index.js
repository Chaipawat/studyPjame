import React, { useState, useEffect } from "react";
import Title from "../../components/Text/Title";
import { Grid, Box, Button } from "@mui/material";

function ShowYellow({ text, content, isfix }) {
  return (
    <Grid>
      <Title text={text} content={content} isfix={isfix} />
    </Grid>
  );
}

function Yellow2({ form, arrtemp, setArrtemp, setInput1, setInput2,setEditmode}) {
  // let arrtemp = [
  //   { id: 1, background: "yellow", marginTop: "11%" }
  // ];

  // let arr = []

  // for(let i = 0 ; i < number; i++){
  //   arr.push(arrtemp[0])
  // }

  // useEffect(() => {
  // console.log("form : ", form);
  // if(form.issend == true){
  //   arrtemp.push({
  //     id:arrtemp.length+1,
  //     background: "yellow",
  //     marginTop: "11%",
  //     ...form
  //   })
  // setform(previous=>({
  //   ...previous ,
  //   input1:"",
  //   input2:"",
  //   issend:false,
  // }))
  //   }
  // }, [form]);

  useEffect(() => {
    // console.log("arrtemp : ", arrtemp);
  }, [arrtemp]);

  function deletearr(index2) {
    let newarrtemp = [];

    // for (let i = 0; i < arrtemp.length; i++) {
    //   console.log("arrtemp[i] : " ,i, arrtemp[i])
    //   if (i !== index) {
    //     newarrtemp.push(arrtemp[i]);
    //   }
    // }
    arrtemp.map((obj, index) => {
      if (index2 !== index) {
        newarrtemp.push(obj);
      }
    });

    // setArrtemp(arrtemp.filter((obj,index) => index2 != index))

    setArrtemp(newarrtemp);
    arrtemp.map((obj, index) => {
      console.log("obj ", index, obj);
    });
    // console.log("arrt : ", arrtemp);
  }

  function clone(index3) {
    let newclone = [...arrtemp];
    let temp = arrtemp.find((obj, index) => index3 === index); //find หา index เก็บลง temp
  
    let filterTemp = arrtemp.filter((obj) => obj.input2.includes(temp.input2)); //incldes => หาคำที่อยู่ข้างใน หาว่ามี input 2 กี่ตัว มีมากกว่าหนึ่งตัว
  
    if (filterTemp.length > 1) { //เช็คความยาวถ้ามีมากกว่า 1 เช่น {123,123-COPY} ให้ต่อ -COPY + จำนวนเข้าไป
        newclone.push({ ...temp, input2: temp.input2 + '-COPY' + filterTemp.length}) 
    } else if (filterTemp.length == 1) { //ถ้ามีแค่ 1 {123} ให้ต่อแค่ -COPY
    newclone.push({ ...temp, input2: temp.input2 + '-COPY'})
    }

    setArrtemp(newclone);
  }

  function edit(index2) {
    let newarrtemp = [];

    arrtemp.map((obj, index) => {
      if (index2 == index) {
        // newarrtemp.push(obj);
        setInput1(obj.input1)
        setInput2(obj.input2)
      }
    });

    setEditmode(true);

  }


  return (
    <>
      {arrtemp.map((obj, index) => {
        return (
          <div style={{ background: obj.background, marginTop: obj.marginTop }}>
            <Grid display={"flex"} justifyContent={"center"}>
              {maparr(0, obj)}
              {/* {obj.id == 1 ? maparr(0,obj) : maparr(1,obj)} */}
            </Grid>
            <Button onClick={() => deletearr(index)}> ลบ </Button>
            <Button onClick={() => clone(index)}> คัดลอก </Button>
            <Button onClick={() => edit(index)}> แก้ไข </Button>
          </div>
        );
      })}
    </>
  );
}

function maparr(i, object) {
  // let arr1 = [
  //   { text: "head1", content: "body1", isfix: true },
  //   { text: "title1", content: "content1", isfix: false },
  // ];
  // let arr2 = [
  //   { text: "head2", content: "body2", isfix: true },
  //   { text: "title2", content: "content2", isfix: false },
  // ];
  // return (
  //   <>
  //     {i == 0
  //       ? arr1.map((obj, index) => {
  //           return (
  //             <Box item md={6}>
  //               <ShowYellow
  //                 text={object.input1}
  //                 content={object.input2}
  //                 isfix={obj.isfix}
  //               />
  //             </Box>
  //           );
  //         })
  //       : arr2.map((obj, index) => {
  //           return (
  //             <Box item md={6}>
  //               <ShowYellow
  //                 text={object.input1}
  //                 content={object.input2}
  //                 isfix={obj.isfix}
  //               />
  //             </Box>
  //           );
  //         })}
  //   </>
  // );

  return (
    <Box item md={6}>
      <ShowYellow
        text={object.input1}
        content={object.input2}
        isfix={object.isfix}
      />
    </Box>
  );
}

// function loopYellow() {
//   let arr1 = [
//     { text: "head1", content: "body1", isfix: true },
//     { text: "title1", content: "content1", isfix: false },
//   ];
//   let arr2 = [
//     { text: "head2", content: "body2", isfix: true },
//     { text: "title2", content: "content2", isfix: false },
//   ];
//   let loopYel = [];
//   for (let i = 0; i < 2; i++) {
//     loopYel.push(
//       <div style={{ background: "yellow", marginTop: "5%" }}>
//         <Grid display={"flex"} justifyContent={"center"}>
//           {i == 0
//             ? arr1.map((obj, index) => {
//                 return (
//                   <Box item md={6}>
//                     <ShowYellow
//                       text={obj.text}
//                       content={obj.content}
//                       isfix={obj.isfix}
//                     />
//                   </Box>
//                 );
//               })
//             : arr2.map((obj, index) => {
//                 return (
//                   <Box item md={6}>
//                     <ShowYellow
//                       text={obj.text}
//                       content={obj.content}
//                       isfix={obj.isfix}
//                     />
//                   </Box>
//                 );
//               })}
//         </Grid>
//       </div>
//     );
//   }
//   return loopYel;
// }

// function Yellow() {
//   return (
//     <>

//       {<Yellow2 />}

//     </>
//   );
// }

export default Yellow2;
