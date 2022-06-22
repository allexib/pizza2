import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios/index";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { Sort } from "./filterSlice";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading|success|error
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
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

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    //найти элемент в массиве увеличь его на ++ и в итоге рисуй. если не нашелся то добваляй новый объекст
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    //норм вариант если не юзать тс и не типизировать экшены
    // extraReducers: {
    //   [fetchPizzas.pending]: (state) => {
    //     state.status = "loading";
    //     state.items = [];
    //   },
    //   [fetchPizzas.fulfilled]: (state, action) => {
    //     state.items = action.payload;
    //     state.status = "success";
    //   },
    //   [fetchPizzas.rejected]: (state, action) => {
    //     state.status = "error";
    //     state.items = [];
    //   },
  },
});
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
