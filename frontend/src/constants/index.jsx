import { IoHome, IoCreateOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { CiHeart, CiSettings } from "react-icons/ci";

export const links = [
  { icon: <IoHome />, title: "HomePage", path: "/" },
  { icon: <IoCreateOutline />, title: "Create", path: "/create" },
  { icon: <FaRegCompass />, title: "Discover", path: "/discover" },
  { icon: <CiHeart />, title: "Favorites", path: "/fav" },
  { icon: <CiSettings />, title: "Help", path: "/help" },
];
