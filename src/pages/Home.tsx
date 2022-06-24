import React, {useEffect, useRef} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import SortPopup, {sortList} from "../components/SortPopup";
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import {FilterSliceState, selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzasSlice";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const dispatch = useAppDispatch();


    const onChangeCategory = React.useCallback ((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }


    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage: String(currentPage)
        }))
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
            const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
            dispatch(setFilters(
                {
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    searchValue: params.search,
                    sort: sort || sortList[0]}
            ))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <SortPopup value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>Произошла ошибка <span>😕</span></h2>
                        <p>
                            Не удалось получить пиццы.
                        </p>
                    </div> : <div className="content__items">
                        {
                            status === 'loading'
                                ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                                : items.map((obj: any) => (
                                    <PizzaBlock key={obj.id}  {...obj} />
                                ))
                        }
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;