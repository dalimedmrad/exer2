import React, { useState } from "react";
import "./FileCard.css";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PDF from "../../media/images.png";
import { Avatar } from "@material-ui/core";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import { Document, Page, pdfjs } from "react-pdf";
import DropFileInput from "../drop-file-input/DropFileInput";
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileCard = ({ el }) => {
  const handelDel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }
  // function previousPage() {
  //   changePage(-1);
  // }
  // function nextPage() {
  //   changePage(1);
  // }
  return (
    <>
      {el.document ? (
        <div className="fileCard">
          <a target="_blank" href={`${el.document}`}>
            <Document file={el.document} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height="200" width="200" pageNumber={pageNumber} />
            </Document>
          </a>
          <span className="drop-file-preview__item__del" onClick={handelDel}>
            <DeleteIcon style={{ color: red[600] }} />
          </span>
        </div>
      ) : (
        <>
          <DropFileInput />
        </>
      )}
    </>
  );
};

export default FileCard;
