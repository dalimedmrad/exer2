import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getAllDocs } from "./reduxToolkit/Mayanslice/MayanSlice";
import FilesView from "./Components/filesView/FilesView";
import { Route, Routes } from "react-router-dom";
import Evidance from "./Components/evidance/Evidance";
function App() {
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.MayanDoc.allDocuments);
  useEffect(() => {
    dispatch(getAllDocs());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="app__main">
        <Routes>
          <Route exact path="/" element={<Evidance />} />
          <Route path="/" element={<FilesView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
