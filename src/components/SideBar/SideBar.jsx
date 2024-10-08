import Option from "./Option";
import Section from "./Section";
import { motion } from "framer-motion";
import { FaRegLightbulb } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { MdOutlineLabel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSideBar } from "../../context/SideBarProvider";
import { useNotes } from "../../context/NotesProvider";

const SideBar = () => {
  const { pathname } = useLocation();
  const { labelId } = useParams();
  const { labels } = useNotes();

  const { isSidebarVisible, toggleSideBar } = useSideBar();

  // const labeledNotes = getLabeledNotes();

  useEffect(() => {
    console.log();
  }, []);

  return (
    <motion.div
      animate={isSidebarVisible ? { left: 0 } : { left: "-400px" }}
      className={`flex fixed left-[-400px] top-0 flex-col min-w-[375px]  bg-gray-100 h-screen`}
    >
      <div className="px-4 py-3">
        <h1 className="flex text-2xl gap-2 font-semibold mb-4 justify-between items-center">
          <div className="flex">
            <div className="flex">
              <p className="text-blue-500">G</p>
              <p className="text-red-500">o</p>
              <p className="text-yellow-500">o</p>
              <p className="text-blue-500">g</p>
              <p className="text-green-600">l</p>
              <p className="text-red-500">e</p>{" "}
            </div>

            <span className="text-gray-600">Keep</span>
          </div>
          <IoCloseCircleOutline
            className="flex items-center justify-center text-center cursor-pointer"
            onClick={toggleSideBar}
          >
            X
          </IoCloseCircleOutline>
        </h1>
        <Section>
          <Link to={"/notes"} onClick={toggleSideBar}>
            <Option isSelected={pathname == "/notes" || pathname == "/"}>
              <FaRegLightbulb />
              <div className="">Listas</div>
            </Option>
          </Link>
        </Section>
        <Section>
          <div className="flex justify-between font-semibold p-4">
            <small>Etiquetas</small>
            <small>Editar</small>
          </div>
          {labels.length > 0 &&
            labels.map((label) => (
              <Link
                to={`/labels/${label.id}`}
                key={label.id}
                onClick={toggleSideBar}
              >
                <Option isSelected={label.id == labelId}>
                  <div className="flex gap-5 items-center">
                    <MdOutlineLabel />
                    <div>{label.name}</div>
                  </div>
                </Option>
              </Link>
            ))}
          <Link to={"/labels/create-label"} onClick={toggleSideBar}>
            <Option>
              <FaPlus />
              <div className="">Crear etiqueta nueva</div>
            </Option>
          </Link>
        </Section>
      </div>
    </motion.div>
  );
};
export default SideBar;
