import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios/index";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://629636a1810c00c1cb718672.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
  //
  //   if(data.length ===0) {
  //     return thunkApi.rejectWithValue('empty pizza')
  //   }
  //
  //   return thunkApi.fulfillWithValue(data);
  // } расширенная информация получение
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading|success|error
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    //найти элемент в массиве увеличь его на ++ и в итоге рисуй. если не нашелся то добваляй новый объекст
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});
export const selectPizzaData=(state) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
