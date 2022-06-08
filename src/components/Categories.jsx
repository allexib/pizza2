import React from "react";

function Categories({ value, onChangeCategory }) {
  // console.log(value);
  // const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  /*const onClickCategory = (index) => {
    setActiveIndex(index);
  };*/

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
        {/*<li onClick={()=>onClickCategory(0)} className={activeIndex === 0 ? "active" : ""}>Все</li>*/}
      </ul>
    </div>
  );
}

export default Categories;
