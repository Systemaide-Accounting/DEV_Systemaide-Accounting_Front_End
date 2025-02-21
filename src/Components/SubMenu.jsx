import { Link } from "react-router-dom";

export function SubMenu({ items, icons, isActiveLink }) {
  return (
    <>
      {items.map((item, index) => (
        <li key={index} className="ml-5">
          <Link to={item.path}>
            <div
              className={`flex items-center w-full p-2 ${
                isActiveLink(item.path)
                  ? "text-gray-900 bg-gray-100"
                  : "text-white hover:text-gray-900 hover:bg-gray-100"
              } transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700`}
            >
              {icons[index].svg}
              <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}