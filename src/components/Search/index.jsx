import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="поиск пиццы"
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          baseProfile="tiny"
          height="32px"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Guides__x26__Forms" />
          <g id="Icons">
            <polygon points="21.657,8.929 16,14.586 10.343,8.929 8.929,10.343 14.586,16 8.929,21.657 10.343,23.071 16,17.414 21.657,23.071    23.071,21.657 17.414,16 23.071,10.343  " />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
