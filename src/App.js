import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { getAllDocs } from "./reduxToolkit/Mayanslice/MayanSlice";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
const Component1 = lazy(() => import("./Components/evidance/Evidance"));
const Component2 = lazy(() => import("./Components/filesView/FilesView"));

function App() {
  const dispatch = useDispatch();
  // const docs = useSelector((state) => state.MayanDoc.allDocuments);
  useEffect(() => {
    dispatch(getAllDocs());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="app__main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<Component1 />} />
            <Route path="/:name/:id" element={<Component2 />} />
          </Routes>
        </Suspense>                 
      </div>
    </div>
  );
}

export default App;
