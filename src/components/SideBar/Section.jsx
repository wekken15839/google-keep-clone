const Section = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 font-semibold border-b  pb-3 border-b-blue-100">
      {children}
    </div>
  );
};

export default Section;
