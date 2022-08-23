import React from "react";
import { evidance } from "../../data";
import "./evidance.css";
import { Link } from "react-router-dom";
const Evidance = () => {
  return (
    <div className="evidance">
      {evidance.map((el) => (
        <div>
          <Link
            title={el.name.length > 10 ? el.name : ""}
            className="links1"
            to={`/${el.name}/${el.id}`}
          >
            <div className="CardeEvid">
              {el.name.length > 10 ? `${el.name.substring(0, 15)}...` : el.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Evidance;
