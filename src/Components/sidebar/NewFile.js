import React, { useState } from "react";
import "./NewFile.css";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import DropFileInput from "../drop-file-input/DropFileInput";
import { Button, Modal } from "antd";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewFile = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  //   const handleUpload = () => {
  //     setUploading(true);

  //     storage
  //       .ref(`files/${file.name}`)
  //       .put(file)
  //       .then((snapshot) => {
  //         console.log(snapshot);

  //         storage
  //           .ref("files")
  //           .child(file.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             //post image inside the db

  //             db.collection("myFiles").add({
  //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               caption: file.name,
  //               fileUrl: url,
  //               size: snapshot._delegate.bytesTransferred,
  //             });

  //             setUploading(false);
  //             setOpen(false);
  //             setFile(null);
  //           });

  //         storage
  //           .ref("files")
  //           .child(file.name)
  //           .getMetadata()
  //           .then((meta) => {
  //             console.log(meta.size);
  //           });
  //       });
  //   };
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
    <div className="newFile">
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
        footer=''
      >
        <div className="box">
          <DropFileInput />
        </div>
      </Modal>
    </div>
  );
};

export default NewFile;
