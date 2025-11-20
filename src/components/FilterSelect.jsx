import Select from "react-select";

const FilterSelect = ({ selectedCategory, setSelectedCategory, products }) => {

  // Unique categories extract from admin products
  const uniqueCategories = [
    ...new Set(products.map((item) => item.category))
  ];

  // Create dynamic options list
  const options = [
    { value: "", label: "All Categories" },
    ...uniqueCategories.map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  return (
    <div className="w-[200px] h-[40px]">
      <Select
        options={options}
        value={options.find((opt) => opt.value === selectedCategory)}
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
          singleValue: (provided) => ({ ...provided, color: "white" }),
          placeholder: (provided) => ({ ...provided, color: "white" }),
          dropdownIndicator: (provided) => ({ ...provided, color: "white" }),
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
          }),
          menu: (provided) => ({ ...provided, borderRadius: "0.375rem" }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: { ...theme.colors, primary25: "#dbe4f5", primary: "#0f3460" },
        })}
      />
    </div>
  );
};

export default FilterSelect;
