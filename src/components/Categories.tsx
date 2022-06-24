import React from 'react';

type CategoriesPropsType = {
    value: number;
    onChangeCategory: (idx: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesPropsType> = React.memo( ({ value, onChangeCategory }) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => (
                        <li key={index} onClick={() => onChangeCategory(index)}
                            className={value === index ? "active" : ""}>{categoryName}</li>
                    ))
                }
            </ul>
        </div>
    );
});

export default Categories;