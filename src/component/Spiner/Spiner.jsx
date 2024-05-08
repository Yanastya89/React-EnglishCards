import { BeatLoader } from "react-spinners";
import React from "react";
import style from "./spiner.module.scss";

function Spiner() {
  return (
    <div >
      <BeatLoader
        color="#000000"
        cssOverride={{}}
        margin={5}
        size={10}
        speedMultiplier={1}
      />
    </div>
  );
}

export default Spiner;
