import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function SubMenu({ items, icons, isActiveLink }) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 w-full pl-12 pr-4 py-1.5 text-xs text-gray-500 font-poppins rounded-lg transition duration-200 ${
            isActiveLink(item.path)
              ? "text-blue-600 bg-blue-50/50"
              : "hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <span className={`${
            isActiveLink(item.path)
              ? "text-blue-600"
              : "text-gray-400 group-hover:text-gray-500"
          }`}>
            {icons[index].svg}
          </span>
          <span className={isActiveLink(item.path) ? "text-blue-600" : ""}>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

SubMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      svg: PropTypes.node.isRequired,
    })
  ).isRequired,
  isActiveLink: PropTypes.func.isRequired,
};