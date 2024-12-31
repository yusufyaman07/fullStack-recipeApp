import { NavLink } from "react-router-dom";
import { links } from "../../constants";

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center justify-between h-screen p-3 max-md:p-2 max-md:gap-20 lg:p-10 max-md:justify-normal">
      <img
        className="w-[150px] max-md:w-[90px]"
        src="/recipe_logo.jpg"
        alt="logo"
      />

      <div className="flex flex-col gap-20">
        {links.map((item, index) => (
          <NavLink
            key={index}
            className={"flex gap-4 items-center text-lg text-gray-400"}
            to={item.path}
          >
            <span className="max-md:text-2xl">{item.icon}</span>
            <span className="max-md:hidden">{item.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold">Get Daily News</p>
        <button className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-400">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
