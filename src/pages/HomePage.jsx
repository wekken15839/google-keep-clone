import ListsNavBar from "../components/NavBar/NotesNavBar";
import Notes from "../components/Notes/Notes";
import AddNoteButtom from "../components/Notes/AddNoteButtom";
import SelectedNotesMenu from "../components/Notes/SelectedNotesMenu";
import SideBar from "../components/SideBar/SideBar";

const HomePage = () => {
  return (
    <div className="">
      <ListsNavBar />
      <SideBar />
      <Notes />
      <AddNoteButtom />
      <SelectedNotesMenu />
    </div>
  );
};

export default HomePage;
