import { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error("useSideBar must be used within a SideBarProvider");
  return context;
};

export default function SideBarProvider({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <SideBarContext.Provider value={{ isSidebarVisible, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}
