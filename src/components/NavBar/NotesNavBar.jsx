import { RxHamburgerMenu } from "react-icons/rx";
import { FiColumns } from "react-icons/fi";
import { useSideBar } from "../../context/SideBarProvider";
import { useNotes } from "../../context/NotesProvider";

const NotesNavBar = () => {
  const { toggleSideBar } = useSideBar();
  const { search, setSearch } = useNotes();

  return (
    <>
      <div className="flex rounded-full bg-blue-100 p-3 items-center justify-between m-3">
        <div className="flex gap-2 items-center cursor-pointer">
          <RxHamburgerMenu onClick={() => toggleSideBar()} />
          <div className="flex items-center">
            <input
              placeholder="Buscar tus notas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent focus:border-none focus:outline-none focus:bg-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FiColumns />
          <span className="bg-violet-700 rounded-full w-6 h-6"></span>
        </div>
      </div>
    </>
  );
};

export default NotesNavBar;
