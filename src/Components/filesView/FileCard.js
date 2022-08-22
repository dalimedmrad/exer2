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
  // const onClick1 = (element) => {
  //   document.getElementById("img01").src = element;
  //   document.getElementById("img01").style.display = "flex";
  //   document.getElementById("img01").style.justifyContent = "center";
  //   document.getElementById("img01").style.alignItems = "center";
  //   document.getElementById("img01").style.width = "50%";
  //   document.getElementById("img01").style.height = "50%";
  //   document.getElementById("img01").style.marginLeft = "25%";
  //   document.getElementById("img01").style.borderRadius = "30%";
  //   document.getElementById("modal01").style.display = "block";
  //   document.getElementById("modal01").style.zIndex = "999";
  //   document.getElementById("modal01").style.display = "flex";
  //   document.getElementById("modal01").style.justifyContent = "center";
  //   document.getElementById("modal01").style.alignItems = "center";
  //   document.getElementById("modal01").style.padding = "auto";
  // };
  // const onClick2 = () => {
  //   document.getElementById("modal01").style.display = "none";
  // };
  return (
    <>
      {el.document ? (
        <div className="fileCard">
          <div className="fileCard--top">
            <Document file={el.document} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height="230" width="230" pageNumber={pageNumber} />
            </Document>
          </div>
          <div className="fileCard--bottom">
            <Avatar className="imgs" src={PDF} alt="User Photo" />
            <a
              // data-title={el.name.length > 20 && el.name}
              href={el.document}
              target="_blank"
              className="links"
            >
              {el.name && el.name.substring(0, 20)}
              {el.name && el.name.length > 20 && "..."}
            </a>
          </div>
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
