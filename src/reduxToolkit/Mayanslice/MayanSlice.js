import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDocs = createAsyncThunk("allDocs", async () => {
  // let opts = {
  //   headers: {
  //     Authorization: "Token 9c7bb56e9d68f8d799a9ead3a868229c8e477689",
  //     Accept: "application/json",
  //   },
  // };
  try {
    const { data } = await axios.get(
      "http://152.228.211.15:8000/api/attachment/filteredBy/?model=courseAssessmentMethod&resource_id=5"
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const PostDoc = createAsyncThunk("postDoc", async (doc) => {
  console.log(doc);
  let opts = {
    headers: {
      Authorization: "Token e8f05680d9120729507e640c7958bdac50eec31a",
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      "http://152.228.211.15:8000/api/attachment/create/",
      { opts, doc }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});
export const PostDoc1 = createAsyncThunk("postDoc", async (doc) => {
  // console.log(doc);
  // let opts = {
  //   headers: {
  //     Authorization: "Token e8f05680d9120729507e640c7958bdac50eec31a",
  //     Accept: "application/json",
  //   },
  // };
  try {
    const result = await axios.post(
      "http://localhost:8080/api/multipleFiles",
      doc
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  document: null,
  allDocuments: null,
  status: null,
};

export const MayanSlice = createSlice({
  name: "MayanDoc",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllDocs.pending]: (state) => {
      state.status = "pending";
    },
    [getAllDocs.fulfilled]: (state, action) => {
      state.status = "success";
      state.allDocuments = action.payload;
    },
    [getAllDocs.rejected]: (state) => {
      state.status = "failed";
    },
    [PostDoc.pending]: (state) => {
      state.status = "pending";
    },
    [PostDoc.fulfilled]: (state, action) => {
      state.status = "success";
      // state.allDocuments = action.payload;
    },
    [PostDoc.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default MayanSlice.reducer;
