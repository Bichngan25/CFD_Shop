import React from "react";
import Select from "../../components/Select";
import { SORT_OPTIONS } from "../../constants/general";

const ProductToolbox = ({ showNumb, totalNumb, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };
  return (
    <div>
      <div className="toolbox">
        <div className="toolbox-left">
          <div className="toolbox-info">
            {" "}
            Showing{" "}
            <span>
              {showNumb || 0} of {totalNumb || 0}
            </span>{" "}
            Products{" "}
          </div>
        </div>
        <div className="toolbox-right">
        <label for="sortby ">Sort by: </label>
          <Select
            label="sort by:"
            className="toolbox-sort"
            value={activeSort}
            defautValue={SORT_OPTIONS.popularity.value}
            options={[
              SORT_OPTIONS.popularity,
              SORT_OPTIONS.pricelow,
              SORT_OPTIONS.pricehigh,
              SORT_OPTIONS.newest,
              SORT_OPTIONS.rating,
            ]}
            onChange={onSelectChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductToolbox;
