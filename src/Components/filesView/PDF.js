// import React, { useState } from "react";
// import coursPdf from "../../media/Cours.pdf";
// import { Document, Page } from "react-pdf";

// const PDF = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <nav>
//         <button onClick={goToPrevPage}>Prev</button>
//         <button onClick={goToNextPage}>Next</button>
//       </nav>

//       <div style={{ width: 600 }}>
//         <Document file={coursPdf} onLoadSuccess={onDocumentLoadSuccess}>
//           <Page pageNumber={state.pageNumber} width={600} />
//         </Document>
//       </div>

//       <p>
//         Page {state.pageNumber} of {state.numPages}
//       </p>
//     </div>
//   );
// };

// export default PDF;
