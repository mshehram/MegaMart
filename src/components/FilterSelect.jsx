import Select from "react-select";
import { products } from "../utils/products";

const options = [
  { value: "sofa", label: "Sofa" },
  { value: "chair", label: "Chair" },
  { value: "watch", label: "Watch" },
  { value: "mobile", label: "Mobile" },
  { value: "wireless", label: "Wireless" },
];

const FilterSelect = ({ setFilterList }) => {
  const handleChange = (selectedOption) => {
    setFilterList(
      products.filter((item) => item.category === selectedOption.value)
    );
  };

  return (
    <div className="w-[200px] h-[40px]">
      <Select
        options={options}
        defaultValue={{ value: "", label: "Filter By Category" }}
        onChange={handleChange}
        classNamePrefix="custom-select"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "#0f3460",
            border: "none",
            borderRadius: "0.375rem",
            height: "40px",
            cursor: "pointer",
            boxShadow: "none",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "white",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: "white",
            ':hover': {
              color: "white",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#0f3460"
              : state.isFocused
              ? "#dbe4f5"
              : "white",
            color: state.isSelected
              ? "white"
              : state.isFocused
              ? "#0f3460"
              : "#0f3460",
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s",
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: "0.375rem",
            overflow: "hidden",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#dbe4f5",
            primary: "#0f3460",
          },
        })}
      />
    </div>
  );
};

export default FilterSelect;
