import React, { useState, useEffect } from "react";
import "./FilesView.css";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "./FileCard";
import { getAllDocs } from "../../reduxToolkit/Mayanslice/MayanSlice";
import { Button, Modal } from "antd";
import DropFileInput from "../drop-file-input/DropFileInput";
import AddIcon from "@material-ui/icons/Add";
import { data } from "../../data";
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
  const docs = useSelector((state) => state.MayanDoc.allDocuments);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="fileView">
      {data?.map((el) => (
        <div className="fileView1">
          <div className="fileViewhead">
            <h1 className="tit">{el.name} </h1>
            {el.document.length > 0 && (
              <>
                {" "}
                <div className="newFilebtn1" onClick={showModal}>
                  <AddIcon fontSize="large" />
                  <p>New</p>
                </div>
                <Modal
                  title="Select files you want to upload !"
                  visible={isModalVisible}
                  onOk={handleOk}
                  okText="Upload"
                  cancelButtonProps
                  onCancel={handleCancel}
                  className="bdt"
                  footer=""
                >
                  <div className="box">
                    <DropFileInput />
                  </div>
                </Modal>{" "}
              </>
            )}
          </div>
          <FileCard el={el} />
        </div>
      ))}

      {/* <div className="fileView1">
        <div className="fileViewhead">
          <h3>Exam </h3>
          <div className="newFilebtn" onClick={showModal}>
            <AddIcon fontSize="large" />
            <p>New</p>
          </div>
          <Modal
            title="Select files you want to upload !"
            visible={isModalVisible}
            onOk={handleOk}
            okText="Upload"
            cancelButtonProps
            onCancel={handleCancel}
            className="bdt"
            footer=""
          >
            <div className="box">
              <DropFileInput />
            </div>
          </Modal>
        </div>
        <div className="fileViewbody">
          {docs?.slice(0, 2).map((item) => (
            <FileCard el={item} />
          ))}
        </div>
      </div>
      <div className="fileView1">
        <div className="fileViewhead">
          <h3>Exam </h3>
          <div className="newFilebtn" onClick={showModal}>
            <AddIcon fontSize="large" />
            <p>New</p>
          </div>
          <Modal
            title="Select files you want to upload !"
            visible={isModalVisible}
            onOk={handleOk}
            okText="Upload"
            cancelButtonProps
            onCancel={handleCancel}
            className="bdt"
            footer=""
          >
            <div className="box">
              <DropFileInput />
            </div>
          </Modal>
        </div>
        <div className="fileViewbody">
          {docs?.slice(0, 2).map((item) => (
            <FileCard el={item} />
          ))}
        </div>
      </div>
      <div className="fileView1">
        <div className="fileViewhead">
          <h3>Exam </h3>
          <div className="newFilebtn1" onClick={showModal}>
            <AddIcon fontSize="large" />
            <p>New</p>
          </div>
          <Modal
            title="Select files you want to upload !"
            visible={isModalVisible}
            onOk={handleOk}
            okText="Upload"
            cancelButtonProps
            onCancel={handleCancel}
            className="bdt"
            footer=""
          >
            <div className="box">
              <DropFileInput />
            </div>
          </Modal>
        </div>
        <div className="fileViewbody">
          {docs?.slice(0, 2).map((item) => (
            <FileCard el={item} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FilesView;
