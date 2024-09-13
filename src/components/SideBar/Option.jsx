const Option = ({ children, isSelected }) => {
  return (
    <div
      className={`flex ${
        isSelected ? "bg-blue-100" : ""
      } rounded-full p-3 pl-5  gap-5  items-center text-center cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default Option;
