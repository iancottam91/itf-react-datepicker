import React, { CSSProperties } from "react";
import Select, { components } from "react-select";
import { dropdownType } from "./types";
import "./index.scss";

export const customStyles = {
  container: (provided: CSSProperties) => ({
    ...provided,
    textTransform: "uppercase" as "uppercase",
    fontWeight: 900
  }),
  control: (provided: CSSProperties) => ({
    ...provided,
    height: 44,
    cursor: "pointer",
    border: "solid 2px #54565a",
    borderRadius: 0,
    margin: 0
  }),
  menu: (provided: CSSProperties) => ({
    ...provided,
    border: "solid 2px #54565a",
    borderWidth: "0 2px 2px",
    borderRadius: 0,
    zIndex: 999,
    margin: 0
  }),
  option: (provided: CSSProperties, state: any) => ({
    ...provided,
    height: 44,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#54565a" : "white",
    "&:hover": {
      backgroundColor: state.isDisabled
        ? "white"
        : state.isSelected
        ? "#54565a"
        : "#EFEFEF",
      color: state.isDisabled
        ? "hsl(0,0%,80%)"
        : state.isSelected
        ? "white"
        : "#54565a"
    }
  }),
  placeholder: (provided: CSSProperties) => ({
    ...provided,
    color: "#54565a"
  }),
  menuList: (provided: CSSProperties) => ({
    ...provided,
    padding: 0
  }),
  singleValue: (provided: CSSProperties) => ({
    ...provided,
    color: "#54565a"
  }),
  dropdownIndicator: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: "#54565a",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined
  })
};

const DropdownIndicator = (props: any) => {
  return (
    // @ts-ignore
    <components.DropdownIndicator className="dropdown-indicator" {...props}>
      <span className="icon" />
    </components.DropdownIndicator>
  );
};

const Dropdown = (props: dropdownType) => {
  const { className } = props;
  return (
    <Select
      isSearchable={false}
      isOptionDisabled={option => option && option.disabled === true}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      options={props.options}
      styles={props.customStyles || customStyles}
      onChange={props.onChange}
      isDisabled={props.isDisabled}
      className={"dropdown-itf" + (className ? ` ${className}` : "")}
      value={props.value}
      menuPortalTarget={props.menuPortalTarget}
      menuPlacement={props.menuPlacement}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator
      }}
    />
  );
};

export default Dropdown;
