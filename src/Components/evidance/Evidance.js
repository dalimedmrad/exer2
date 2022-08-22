import { Avatar } from "antd";
import React from "react";
import { data1 } from "../../data";
import "./evidance.css";
import { Link } from "react-router-dom";
const Evidance = () => {
  return (
    <div className="evidance">
      {data1.map((el) => (
        <div className="CardeEvid">
          <div className="links">
            <Link to="">
              {el.name && el.name.substring(0, 20)}
              {el.name && el.name.length > 20 && "..."}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Evidance;
