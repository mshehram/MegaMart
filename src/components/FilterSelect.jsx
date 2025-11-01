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
    setFilterList(products.filter((item) => item.category === selectedOption.value));
  };

  return (
    <div className="w-[200px] h-[40px]">
      <Select
        options={options}
        defaultValue={{ value: "", label: "Filter By Category" }}
        onChange={handleChange}
        classNames={{
          control: () =>
            "bg-[#0f3460] text-white rounded-md border-none shadow-none h-[40px] cursor-pointer",
          singleValue: () => "text-white",
          option: (state) =>
            `text-[#0f3460] hover:bg-[#0f3460] hover:text-white ${
              state.isSelected ? "bg-[#0f3460] text-white" : "bg-white"
            }`,
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#0f3460",
            primary: "#0f3460",
          },
        })}
      />
    </div>
  );
};

export default FilterSelect;


