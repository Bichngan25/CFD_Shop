import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { styled } from "styled-components";

// bỏ style mặc định của input
const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-animation: textfield;
`;

const QuantityInput = (
  {
    className,
    defaultValue,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);
  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue ?? 1);
      },
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const _onInputChange = (e) => {
    setCurrentQuantity(_modifyValue(Number(e.target.value)));
  };

  const _onIncrease = () => {
    const value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };

  const _onDecrease = () => {
    const value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };
  const _modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };
  return (
    <div className={className}>
      <div className="input-group input-snipnner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            onClick={_onDecrease}
          >
            <i className="icon-minus"></i>
          </button>
        </div>
        <InputNumberStyle
          type="number"
          className="form-control"
          style={{ textAlign: "center" }}
          value={currentQuantity}
          onChange={_onInputChange}
          max={max}
          {...inputProps}
          // defaultValue={1}
          // min={1}
          // max={10}
          // step={1}
          // data-decimals={0}
          // required
        />
        <div className="input-group-append">
          <button
            style={{ minWid: 26 }}
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={_onIncrease}
          >
            <i className="icon-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
