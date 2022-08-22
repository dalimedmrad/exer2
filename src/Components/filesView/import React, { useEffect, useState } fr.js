import React, { useEffect, useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button";
import {
  addNewAttachment,
  fetchAttachments,
} from "../../../reduxToolkit/features/attachment/AttachmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation, Trans } from "react-i18next";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileUploader(props) {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const dispatch = useDispatch();

  const handleSubmission = () => {
    // let resource=id
    let resource_id = props.id;
    let model = "courseAssessmentMethod";
    let resource = "courseAssessmentMethod";
    let document = selectedFile;
    let name = selectedFile.name.slice(0, 25);
    const uploadData = new FormData();
    uploadData.append("resource_id", resource_id);
    uploadData.append("resource", resource);
    uploadData.append("model", model);
    uploadData.append("document", document);
    uploadData.append("name", name);

    // console.log("{model,resource,document,name }", { model, resource, document, name })
    // console.log("uploadData", uploadData)

    dispatch(addNewAttachment(uploadData));
  };

  useEffect(() => {
    dispatch(fetchAttachments());
  }, [dispatch]);
  //   let filteredPeople = people.filter(function (currentElement) {
  // 	// the current value is an object, so you can check on its properties
  // 	return currentElement.country === "America" && currentElement.age < 25;
  //   });

  const attachments = useSelector((state) => state.attachment.attachments);

  const filteredAttachments =
    attachments &&
    attachments.filter(
      (attachment) =>
        attachment.model === "courseAssessmentMethod" &&
        attachment.resource_id == props.id
    );

  // console.log("attachments", attachments)
  const error = useSelector((state) => state.program.error);
  // console.log("filteredAttachments", filteredAttachments)
  // console.log("props.id", props.id)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />

      <div>
        <Button color="primary" onClick={handleSubmission}>
          Submit
        </Button>
      </div>
      <GridContainer direction="row" alignItems="baseline">
        {filteredAttachments &&
          filteredAttachments.map((attachment) => {
            return (
              <GridItem xs={12} sm={12} md={3} key={attachment.id}>
                <a href={attachment.document} target="_blank">
                  <Document
                    file={attachment.document}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page height="200" width="200" pageNumber={pageNumber} />
                  </Document>
                </a>

                <div>
                  <p>
                    {/* Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} */}
                    {attachment.name}
                  </p>
                  <Button
                    color="primary"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    style={{ width: "98px" }}
                  >
                    Previous
                  </Button>
                  <Button
                    color="primary"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    style={{ width: "98px" }}
                  >
                    Next
                  </Button>
                </div>
              </GridItem>
            );
          })}
      </GridContainer>
    </div>
  );
}

// import React, { useEffect, useState } from 'react'
// import { addNewAttachment, fetchAttachments } from '../../../reduxToolkit/features/attachment/AttachmentsSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import {
// 	BrowserRouter as Router,
// 	Link,
// 	Switch,
// 	Route,
// 	useParams
//   } from "react-router-dom";
// export default function FileUploader(props){

// 		const [selectedFile, setSelectedFile] = useState();
// 		const [isSelected, setIsSelected] = useState(false);
// 		// let { id } = useParams();

// 		const changeHandler = (event) => {
// 			setSelectedFile(event.target.files[0]);
// 			setIsSelected(true);
// 		};
// 		const dispatch = useDispatch()

// 		const handleSubmission = () => {
// 			// let resource=id
// 			let resource=props.id
// 			let model = "courseAssessmentMethod"
// 			let document= selectedFile
// 			let name=selectedFile.name.slice(0, 25)
// 			const uploadData = new FormData();
// 			uploadData.append('resource', resource);
// 			uploadData.append('model', model);
// 			uploadData.append('document', document);
// 			uploadData.append('name', name);

// 			console.log("{model,resource,document,name }",{model,resource,document,name })
// 			console.log("uploadData",uploadData)

// 			dispatch(addNewAttachment(uploadData))
// 		};

// 		const attachmentsStatus = useSelector(state => state.attachment.attachmentsStatus)

// 		useEffect(() => {
// 		  if (attachmentsStatus === 'idle') {
// 			dispatch(fetchAttachments())
// 		  }
// 		}, [
// 			attachmentsStatus,
// 		  dispatch])
// 		//   let filteredPeople = people.filter(function (currentElement) {
// 		// 	// the current value is an object, so you can check on its properties
// 		// 	return currentElement.country === "America" && currentElement.age < 25;
// 		//   });

// 		const attachments = useSelector(state => state.attachment.attachments)
// 		const filteredAttachments=attachments.filter(attachment=>{
// 		return attachment.model === "courseAssessmentMethod"  && attachment.resource === props.id;
// 		}
// 		)
// 		console.log("attachments", attachments)
// 		const error = useSelector(state => state.program.error)
// 		console.log("filteredAttachments", filteredAttachments)

// 		// if (programsStatus === 'loading') {
// 		//   content = <div className="loader">Loading...</div>
// 		// } else if (programsStatus === 'succeeded') {
// 		//   content = programs && programs.map(program => (
// 		// 	program.active &&
// 		// 	<ProgramExcerpt key={program.id} program={program} />
// 		//   ))
// 		// } else if (programsStatus === 'failed') {
// 		//   content = <div>{error}</div>
// 		// }

// 		return(
// 	   <div>
// 				<input type="file" name="file" onChange={changeHandler} />
// 				{/* {isSelected ? (
// 					<div>
// 						<p>Filename: {selectedFile.name}</p>
// 						<p>Filetype: {selectedFile.type}</p>
// 						<p>Size in bytes: {selectedFile.size}</p>
// 						<p>
// 							lastModifiedDate:{' '}
// 							{selectedFile.lastModifiedDate.toLocaleDateString()}
// 						</p>
// 					</div>
// 				) : (
// 					<p>Select a file to show details</p>
// 				)} */}
// 				<div>
// 					<button onClick={handleSubmission}>Submit</button>
// 				</div>
// 				<div>
// 				{filteredAttachments && filteredAttachments.map((attachment) => {
//                 return <div><a href={attachment.document} target="_blank">{attachment.name}</a></div>

//               }
//               )}
// 				</div>
// 			</div>
// 		)
// 	}

// import React, { useEffect, useState } from 'react'
// import { addNewAttachment, fetchAttachments } from '../../../reduxToolkit/features/attachment/AttachmentsSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import "antd/dist/antd.css";
// import { Upload, message, Button } from 'antd';

// const props = {
//   name: 'file',
// };

// export default function FileUploader() {

// 			const [selectedFile, setSelectedFile] = useState();
// 		const [isSelected, setIsSelected] = useState(false);
// 		// let { id } = useParams();

// 		const changeHandler = (event) => {
// 			setSelectedFile(event.file);
// 			setIsSelected(true);
// 			console.log('selectedFile',selectedFile)

// 			console.log('event.file',event.file)
// 		};
// 		const dispatch = useDispatch()

// 		const handleSubmission = () => {
// 			// let resource=id
// 			let resource=1
// 			let model = "courseAssessmentMethod"
// 			let document= selectedFile
// 			const uploadData = new FormData();
// 			uploadData.append('resource', resource);
// 			uploadData.append('model', model);
// 			uploadData.append('document', document);

// 			console.log("{model,resource,document }",{model,resource,document })
// 			dispatch(addNewAttachment(uploadData))
// 		};
//   return (
//     <div style={{
//       display: 'block', width: 700, padding: 30
//     }}>
//       <>
//         <Upload  onChange={event => {changeHandler(event); handleSubmission() }}
//         >
//           <Button>Upload File</Button>
//         </Upload>
//       </>
//     </div>
//   );
// }
