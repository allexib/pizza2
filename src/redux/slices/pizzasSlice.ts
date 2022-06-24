import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: number;
}

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string
    search: string
    currentPage: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus',
    async (params ) => {
    const {
        sortBy,
        order,
        category,
        search,
        currentPage
    } = params
    const {data} = await axios.get<Pizza[]>(
        `https://62a9d80d3b314385543cca25.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
})

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
})

export const selectPizzaData = (state: RootState) => state.pizzaSlice

export default pizzaSlice.reducer