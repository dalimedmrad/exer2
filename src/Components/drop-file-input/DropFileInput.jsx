import React, { useRef, useState } from "react";
import "./drop-file-input.css";
import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../media/cloud-upload-regular-240.png";
import { useDispatch } from "react-redux";
import { PostDoc, PostDoc1 } from "../../reduxToolkit/Mayanslice/MayanSlice";
import { Button } from "@material-ui/core";

const DropFileInput = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile);
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      // props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
  };

  // const handleSubmission = (e) => {
  //   e.preventDefault();
  //   setFile(e.target.files[0]);
  //   const resource_id = 5;
  //   const model = "courseAssessmentMethod";
  //   const resource = "courseAssessmentMethod";
  //   const document = file;
  //   const name = file.name.slice(0, 25);
  //   const uploadData = new FormData();
  //   uploadData.set("resource_id", resource_id);
  //   uploadData.set("resource", resource);
  //   uploadData.set("model", model);
  //   uploadData.set("document", document);
  //   uploadData.set("name", name);
  //   // console.log(file);
  //   // console.log(uploadData);
  //   dispatch(PostDoc1(uploadData));
  // };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
        </div>
        <input type="file" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
