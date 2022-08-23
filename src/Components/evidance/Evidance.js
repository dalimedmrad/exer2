import React from "react";
import { data1 } from "../../data";
import "./evidance.css";
import { Link } from "react-router-dom";
const Evidance = () => {
  return (
    <div className="evidance">
      {data1.map((el) => (
        <Link className="links1" to={`/${el.name}/${el.id}`}>
          <div className="CardeEvid">
            {el.name && el.name.substring(0, 20)}
            {el.name && el.name.length > 20 && "..."}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Evidance;
