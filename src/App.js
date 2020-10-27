import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [sudArr, setSudArr] = useState([]);

  // useEffect(() => {
  //   let temp_arr = [];
  //   for (let i = 0; i < 9; i++) {
  //     let outer = [];
  //     for (let i = 0; i < 9; i++) {
  //       outer.push(0);
  //     }
  //     temp_arr.push(outer);
  //   }
  //   setSudArr(temp_arr);
  // }, []);

  // useEffect(() => {
  //   console.log(sudArr);
  // }, [sudArr]);

  // play grid is defined as two dimensional array where outer array represent y-Axis (rows) and inner array represent x-Axis (columns)
  var sGrid = [
    [0, 0, 0, 0, 0, 0, 2, 8, 4],
    [0, 0, 0, 0, 0, 0, 1, 9, 6],
    [0, 0, 0, 0, 0, 0, 5, 3, 7],
    [1, 7, 8, 3, 6, 4, 9, 5, 2],
    [5, 2, 4, 9, 7, 1, 3, 6, 8],
    [3, 6, 9, 5, 2, 8, 7, 4, 1],
    [8, 4, 5, 7, 9, 2, 6, 1, 3],
    [2, 9, 1, 4, 3, 6, 8, 7, 5],
    [7, 3, 6, 1, 8, 5, 4, 2, 9],
  ];

  // check if value provided for coordinates meet game rules
  const possibleChoice = (y, x, n) => {
    // console.log(y, x, n);
    //check if n possible in y-Axis
    for (let i = 0; i < 9; i++) {
      if (sGrid[y][i] === n) {
        return false;
      }
    }
    //check if n possible in x-Axis
    for (let i = 0; i < 9; i++) {
      if (sGrid[i][x] === n) {
        return false;
      }
    }
    //check if n possible 3x3 segment
    //    as arrays go 0=>8 we can find which segment (top-left corner of segment position) in axis index occupy
    //    by dividing index by three "7/3=>2.333..." floor result to integer "2.333...=>2" and multiply by three "2*3=>6"
    //    result is smallest index in the axis, combining results of y and x will give us starting coordinate grid[y][x]
    let ySegStart = Math.floor(y / 3) * 3;
    let xSegStart = Math.floor(x / 3) * 3;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (sGrid[ySegStart + y][xSegStart + x] === n) {
          return false;
        }
      }
    }
    // n possible => return true
    return true;
  };
  let iter = 0;
  let arr = [];
  const handleSolve = () => {
    iter++;
    // loop through x axis indexes 0=>8
    for (let y = 0; y < 9; y++) {
      // loop through y axis indexes 0=>8
      for (let x = 0; x < 9; x++) {
        // if coordinates not equal zero and loop at the end terminate recursion with return true
        if (sGrid[y][x] === 0) {
          // loop through numbers 1=>9 as n
          for (let n = 1; n < 10; n++) {
            // if n value from loop is possible in tested position x,y assign it to position and call itself again (recursion)
            if (possibleChoice(y, x, n)) {
              sGrid[y][x] = n;
              arr.push(`${iter}__${y}x${x}=>${sGrid[y][x]}`);
              // if recursion return false, set coordinates back to 0 ("backtrack") => ("because of no return here, function will return false")
              if (handleSolve()) {
                return true;
              }
              sGrid[y][x] = 0;
              arr.push(`${iter}__${y}x${x}=>${sGrid[y][x]}`);
            }
          }
          // if no other return triggered return false to backtrack
          return false;
        } else if (y === 8 && x === 8) {
          return true;
        }
      }
    }
  };

  useEffect(() => {
    handleSolve();
    console.log(arr);
    setSudArr(sGrid);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="App"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {sudArr.map((x, ix) => {
          if (!x) {
            return null;
          } else {
            return (
              <div style={{ display: "flex" }} key={"x" + ix}>
                {x.map((y, iy) => {
                  return (
                    <div
                      key={"y" + iy}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid black",
                        textAlign: "center",
                      }}
                    >
                      {y}
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

// const testArr = [
//   [9, 5, 7, 6, 1, 3, 2, 8, 4],
//   [4, 8, 3, 2, 5, 7, 1, 9, 6],
//   [6, 1, 2, 8, 4, 9, 5, 3, 7],
//   [1, 7, 8, 3, 6, 4, 9, 5, 2],
//   [5, 2, 4, 9, 7, 1, 3, 6, 8],
//   [3, 6, 9, 5, 2, 8, 7, 4, 1],
//   [8, 4, 5, 7, 9, 2, 6, 1, 3],
//   [2, 9, 1, 4, 3, 6, 8, 7, 5],
//   [7, 3, 6, 1, 8, 5, 4, 2, 9],
// ];
