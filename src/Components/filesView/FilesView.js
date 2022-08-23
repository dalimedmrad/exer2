import React, { useState, useRef } from "react";
import "./FilesView.css";
import { useDispatch } from "react-redux";
import FileCard from "./FileCard";
import AddIcon from "@material-ui/icons/Add";
import { EvidanceType, Docs } from "../../data";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../media/cloud-upload-regular-240.png";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";

const FilesView = () => {
  // const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState(0);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    setFileList(e.target.files[0]);
    console.log(fileList);
  };

  const fileRemove = () => {
    setFileList(0);
  };

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
      <h1 className="tit">{params.name} </h1>{" "}
      <div className="fileView1">
        {EvidanceType.filter((el) => el.examId == params.id).map((el) => (
          <div className="fileView2">
            <div className="fileViewhead">
              <h1 className="tit">{el.name} </h1>{" "}
              <div className="newFilebtn1" onClick={handleShow}>
                <AddIcon fontSize="large" />
                <p>New</p>
              </div>
              <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{params.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <>
                      {fileList ? (
                        <div className="drop-file-preview__item">
                          <img
                            src={
                              ImageConfig[fileList.type.split("/")[1]] ||
                              ImageConfig["default"]
                            }
                          />
                          <div className="drop-file-preview__item__info">
                            <p>{fileList.name}</p>
                            <p>{fileList.size}B</p>
                          </div>
                          <span
                            className="dropdel"
                            onClick={() => fileRemove(fileList)}
                          >
                            <DeleteIcon style={{ color: red[600] }} />
                          </span>
                        </div>
                      ) : (
                        <div
                          ref={wrapperRef}
                          className="drop-file-input"
                          onDragEnter={onDragEnter}
                          onDragLeave={onDragLeave}
                          onDrop={onDrop}
                        >
                          <div className="drop-file-input__label">
                            <img src={uploadImg} />
                          </div>
                          <input type="file" onChange={onFileDrop} />
                        </div>
                      )}
                    </>
                  </div>
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
            </div>
            <div className="fileViewcontent">
              {Docs?.filter(
                (item) =>
                  item.evidancetypeid == el.id && item.examId == params.id
              ).map((el) => (
                <FileCard el={el} />
              ))}
            </div>
          </div>
        ))}

        {/* <div className="fileView2">
          <div className="fileViewhead">
            <h1 className="tit">Exam paper </h1>{" "}
            <div className="newFilebtn1" onClick={handleShow}>
              <AddIcon fontSize="large" />
              <p>New</p>
            </div>
            <Modal size="md" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{params.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <>
                    {fileList ? (
                      <div className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[fileList.type.split("/")[1]] ||
                            ImageConfig["default"]
                          }
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{fileList.name}</p>
                          <p>{fileList.size}B</p>
                        </div>
                        <span
                          className="dropdel"
                          onClick={() => fileRemove(fileList)}
                        >
                          <DeleteIcon style={{ color: red[600] }} />
                        </span>
                      </div>
                    ) : (
                      <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <div className="drop-file-input__label">
                          <img src={uploadImg} />
                        </div>
                        <input type="file" onChange={onFileDrop} />
                      </div>
                    )}
                  </>
                </div>
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
          </div>
          <div className="fileViewcontent">
            {data
              ?.filter((el) => el.evidancetype_id == params.id)
              .map((el) => (
                <FileCard el={el} />
              ))}
          </div>
        </div>
        <div className="fileView2">
          <div className="fileViewhead">
            <h1 className="tit">Exam correction </h1>{" "}
            <div className="newFilebtn1" onClick={handleShow}>
              <AddIcon fontSize="large" />
              <p>New</p>
            </div>
            <Modal size="md" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{params.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <>
                    {fileList ? (
                      <div className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[fileList.type.split("/")[1]] ||
                            ImageConfig["default"]
                          }
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{fileList.name}</p>
                          <p>{fileList.size}B</p>
                        </div>
                        <span
                          className="dropdel"
                          onClick={() => fileRemove(fileList)}
                        >
                          <DeleteIcon style={{ color: red[600] }} />
                        </span>
                      </div>
                    ) : (
                      <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <div className="drop-file-input__label">
                          <img src={uploadImg} />
                        </div>
                        <input type="file" onChange={onFileDrop} />
                      </div>
                    )}
                  </>
                </div>
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
          </div>
          <div className="fileViewcontent">
            {data
              ?.filter((el) => el.evidancetype_id == params.id)
              .map((el) => (
                <FileCard el={el} />
              ))}
          </div>
        </div>
        <div className="fileView2">
          <div className="fileViewhead">
            <h1 className="tit">Best mark </h1>{" "}
            <div className="newFilebtn1" onClick={handleShow}>
              <AddIcon fontSize="large" />
              <p>New</p>
            </div>
            <Modal size="md" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{params.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <>
                    {fileList ? (
                      <div className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[fileList.type.split("/")[1]] ||
                            ImageConfig["default"]
                          }
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{fileList.name}</p>
                          <p>{fileList.size}B</p>
                        </div>
                        <span
                          className="dropdel"
                          onClick={() => fileRemove(fileList)}
                        >
                          <DeleteIcon style={{ color: red[600] }} />
                        </span>
                      </div>
                    ) : (
                      <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <div className="drop-file-input__label">
                          <img src={uploadImg} />
                        </div>
                        <input type="file" onChange={onFileDrop} />
                      </div>
                    )}
                  </>
                </div>
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
          </div>
          <div className="fileViewcontent">
            {data
              ?.filter((el) => el.evidancetype_id == params.id)
              .map((el) => (
                <FileCard el={el} />
              ))}
          </div>
        </div>
        <div className="fileView2">
          <div className="fileViewhead">
            <h1 className="tit">Bad mark </h1>{" "}
            <div className="newFilebtn1" onClick={handleShow}>
              <AddIcon fontSize="large" />
              <p>New</p>
            </div>
            <Modal size="md" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{params.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <>
                    {fileList ? (
                      <div className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[fileList.type.split("/")[1]] ||
                            ImageConfig["default"]
                          }
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{fileList.name}</p>
                          <p>{fileList.size}B</p>
                        </div>
                        <span
                          className="dropdel"
                          onClick={() => fileRemove(fileList)}
                        >
                          <DeleteIcon style={{ color: red[600] }} />
                        </span>
                      </div>
                    ) : (
                      <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <div className="drop-file-input__label">
                          <img src={uploadImg} />
                        </div>
                        <input type="file" onChange={onFileDrop} />
                      </div>
                    )}
                  </>
                </div>
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
          </div>
          <div className="fileViewcontent">
            {data
              ?.filter((el) => el.evidancetype_id == params.id)
              .map((el) => (
                <FileCard el={el} />
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FilesView;
