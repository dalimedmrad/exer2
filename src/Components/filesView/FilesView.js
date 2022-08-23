import React, { useState, useEffect } from "react";
import "./FilesView.css";
import { useDispatch } from "react-redux";
import FileCard from "./FileCard";
import { getAllDocs } from "../../reduxToolkit/Mayanslice/MayanSlice";
import DropFileInput from "../drop-file-input/DropFileInput";
import AddIcon from "@material-ui/icons/Add";
import { data } from "../../data";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const FilesView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDocs());
  }, [dispatch]);

  // useEffect(() => {
  //   db.collection("myFiles").onSnapshot((snapshot) => {
  //     setFiles(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         item: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  // console.log(files);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const params = useParams();
  return (
    <div className="fileView">
      {data
        ?.filter((el) => el.evidancetype_id == params.id)
        .map((el) => (
          <div className="fileView1">
            <div className="fileViewhead">
              <h1 className="tit">{params.name} </h1>
              {el.document.length > 0 && (
                <>
                  {" "}
                  <div className="newFilebtn1" onClick={handleShow}>
                    <AddIcon fontSize="large" />
                    <p>New</p>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{params.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <DropFileInput />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Upload
                      </Button>
                    </Modal.Footer>
                  </Modal>{" "}
                </>
              )}
            </div>
            <div className="fileViewcontent">
              <FileCard el={el} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilesView;
