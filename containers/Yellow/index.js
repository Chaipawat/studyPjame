import React, { useState, useEffect } from "react";
import Title from "../../components/Text/Title";
import { Grid, Box, Button } from "@mui/material";
import { pink } from "@mui/material/colors";
import Select from 'react-select'

function ShowYellow({ text, content, isfix }) {
  return (
    <Grid>
      <Title text={text} content={content} isfix={isfix} />
    </Grid>
  );
}

function Yellow2({
  form,
  arrTemp,
  setArrtemp,
  setInputYel1,
  setInputYel2,
  setEditmode,
  setEditindex,
  arrPin,
  setPin,
  loadDataArr,
  options,
  selectedOption,
  setSelectedOption
}) {

  const [searchInput, setSearch] = useState("");

  useEffect(() => {
    console.log("arrTemp : ", arrTemp);
  }, [arrTemp]);

  function deletearr(index2) {
    let newarrTemp = [];

    // for (let i = 0; i < arrtemp.length; i++) {
    //   console.log("arrtemp[i] : " ,i, arrtemp[i])
    //   if (i !== index) {
    //     newarrtemp.push(arrtemp[i]);
    //   }
    // }
    arrTemp.map((obj, index) => {
      if (index2 !== index) {
        newarrTemp.push(obj);
      }
    });

    // setArrtemp(arrtemp.filter((obj,index) => index2 != index))

    setArrtemp(newarrTemp);
    arrTemp.map((obj, index) => {
      console.log("obj ", index, obj);
    });
    // console.log("arrt : ", arrtemp);
  }

  function clone(index3) {
    let newClone = [...arrTemp];
    let temp = arrTemp.find((obj, index) => index3 === index); //find หา index เก็บลง temp

    let filterTemp = arrTemp.filter((obj) => obj.inputYel2.includes(temp.inputYel2)); //incldes => หาคำที่อยู่ข้างใน หาว่ามี input 2 กี่ตัว มีมากกว่าหนึ่งตัว

    if (filterTemp.length > 1) {
      //เช็คความยาวถ้ามีมากกว่า 1 เช่น {123,123-COPY} ให้ต่อ -COPY + จำนวนเข้าไป
      newClone.push({
        ...temp,
        inputYel2: temp.inputYel2 + "-COPY" + filterTemp.length,
      });
    } else if (filterTemp.length == 1) {
      //ถ้ามีแค่ 1 {123} ให้ต่อแค่ -COPY
      newClone.push({ ...temp, inputYel2: temp.inputYel2 + "-COPY" });
    }

    setArrtemp(newClone);
  }

  function edit(index2) {
    let newarrtemp2 = [];

    arrTemp.map((obj, index) => {
      if (index2 == index) {
        // newarrtemp.push(obj);
        setInputYel1(obj.inputYel1);
        setInputYel2(obj.inputYel2);
        setEditindex(index2);

        // newarrtemp2.push(obj);
      }
    });

    setEditmode(true);
  }

  function top(index3) {
    if (index3 > 0) {
      let newclone = [...arrTemp];
      let tempnow = arrTemp.find((obj, index) => index3 === index); //เช็คค่าตัวที่กด
      let temppre = arrTemp.find((obj, index) => index3 - 1 === index); //เช็คค่าข้างบน

      newclone[index3 - 1] = tempnow;
      newclone[index3] = temppre;

      setArrtemp(newclone);
    }
  }

  function down(index3) {
    if (index3 < arrTemp.length - 1) {
      let newclone = [...arrTemp];
      let tempnow = arrTemp.find((obj, index) => index3 === index); //เช็คค่าตัวที่กด
      let tempnext = arrTemp.find((obj, index) => index3 + 1 === index); //เช็คค่าข้างบน

      newclone[index3] = tempnext;
      newclone[index3 + 1] = tempnow;

      setArrtemp(newclone);
    }
  }

  function pin(index3) {
    let newpin = [...arrPin];
    let newarrtemp = [];

    arrTemp.map((obj, index) => {
      if (index3 !== index) {
        newarrtemp.push(obj);
      } else {
        newpin.push({ ...obj, indextemp: index3 });
      }
    });

    setArrtemp(newarrtemp);

    setPin(newpin);
  }

  function unpin(index3) {
    let newarr = [...arrTemp];
    let newpintemp = [];

    arrPin.map((obj, index) => {
      if (index3 !== index) {
        newpintemp.push(obj);
      } else {
        newarr.splice(obj.indextemp, 0, obj);
      }
    });

    setArrtemp(newarr);
    setPin(newpintemp);
  }

  function search(inputSearch){

    if(inputSearch){
      let filterTemp = arrTemp.filter((obj) => obj.inputYel1.includes(inputSearch));
      setArrtemp(filterTemp);
    }else{
      loadDataArr()
    }
  }

  useEffect(()=>{
    if(selectedOption){
      if(selectedOption.value == "-"){
        console.log("pass -")
        loadDataArr()
      }else{
        let filterTemp = arrTemp.filter((obj) => obj.tag.includes(selectedOption.value));
        setArrtemp(filterTemp);
      }
    }

  },[selectedOption])

  return (
    <>
      <div>
        <input
          value={searchInput}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          name="name"
        />
        <Button onClick={()=>search(searchInput)}> ค้นหา </Button>
        <Select value={selectedOption} options={options} onChange={(v)=>setSelectedOption(v)} />
      </div>
      <div style={{ color: "#000000" }}>ปักหมุด</div>
      {arrPin.map((obj, index) => {
        return (
          <div style={{ background: obj.background, marginTop: obj.marginTop }}>
            <Grid display={"flex"} justifyContent={"center"}>
              {maparr(0, obj)}
              {/* {obj.id == 1 ? maparr(0,obj) : maparr(1,obj)} */}
            </Grid>
            <Button onClick={() => deletearr(index)}> ลบ </Button>
            <Button onClick={() => clone(index)}> คัดลอก </Button>
            <Button onClick={() => edit(index)}> แก้ไข </Button>
            <Button onClick={() => top(index)}> เลื่อนขึ้น </Button>
            <Button onClick={() => down(index)}> เลื่อนลง </Button>
            {/* <Button onClick={() => pin(index)}> ปักหมุด </Button> */}
            <Button onClick={() => unpin(index)}> ยกเลิกปักหมุด </Button>
          </div>
        );
      })}

      <div style={{ color: "#000000" }}>ไม่ปักหมุด</div>
      {arrTemp.map((obj, index) => {
        return (
          <div style={{ background: obj.background, marginTop: obj.marginTop }}>
            <Grid display={"flex"} justifyContent={"center"}>
              {maparr(0, obj)}
              {/* {obj.id == 1 ? maparr(0,obj) : maparr(1,obj)} */}
            </Grid>
            <Button onClick={() => deletearr(index)}> ลบ </Button>
            <Button onClick={() => clone(index)}> คัดลอก </Button>
            <Button onClick={() => edit(index)}> แก้ไข </Button>
            <Button onClick={() => top(index)}> เลื่อนขึ้น </Button>
            <Button onClick={() => down(index)}> เลื่อนลง </Button>
            <Button onClick={() => pin(index)}> ปักหมุด </Button>
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
        text={object.inputYel1}
        content={object.inputYel2}
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
