import { useState, useEffect     } from "react";
import "./Field.css";
import Cross from "../../icons/cross.svg?react";
import Ellipse from "../../icons/ellipse.svg?react";

export function Field() {
  let [arr, setArr] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  let [player, setPlayer] = useState("o");

  function paintArr() {
    console.log("paint");
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        res.push(
          <div
            onClick={() => {
              turnPlayer(i, j);
            }}
            key={[i, j]}
            className={`item  ${arr[i][j] !== "" ? "disabled" : ""}`}
          >
            {arr[i][j] === "x" ? (
              <Cross className="cross" />
            ) : arr[i][j] === "o" ? (
              <Ellipse className="ellipse" />
            ) : null}
          </div>
        );
      }
    }

    return res;
  }

  function turnPlayer(i, j) {
    if (arr[i][j] !== "") {
      return;
    }
    let kek = arr.slice();
    kek[i][j] = player;
    setArr(kek);

    player === "o" ? setPlayer("x") : setPlayer("o");
    console.log("click");

    check(kek);
  }

  function restartGame() {
    setArr([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }
  function check(arr) {
    if (
      (arr[0][0] === arr[0][1] &&
        arr[0][1] === arr[0][2] &&
        arr[0][0] !== "") ||
      (arr[1][0] === arr[1][1] &&
        arr[1][1] === arr[1][2] &&
        arr[1][0] !== "") ||
      (arr[2][0] === arr[2][1] &&
        arr[2][1] === arr[2][2] &&
        arr[2][0] !== "") ||
      (arr[0][0] === arr[1][0] &&
        arr[1][0] === arr[2][0] &&
        arr[0][0] !== "") ||
      (arr[0][1] === arr[0][1] &&
        arr[0][1] === arr[2][1] &&
        arr[0][1] !== "") ||
      (arr[2][0] === arr[1][1] &&
        arr[1][1] === arr[0][2] &&
        arr[2][0] !== "") ||
      (arr[0][2] === arr[1][2] &&
        arr[1][2] === arr[2][2] &&
        arr[0][2] !== "") ||
      (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && arr[0][0] !== "")
    ) {
      alert(`победил игрок ${player}`);
      restartGame();
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "") {
          return;
        }
      }
    }

    alert('ничья')
    restartGame();
  }

  useEffect(() => {
    function down(event) {
      if (event.code == "KeyR") {
        restartGame();
      }
    }

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <div className="container">
      <h2 className="hint">Press ‘R’ to Restart</h2>

      <div className="field">{paintArr()}</div>
    </div>
  );
}
