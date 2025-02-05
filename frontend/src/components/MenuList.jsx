
import PropTypes from "prop-types"; // Import PropTypes

const MenuList = ({ menu }) => {
  return (
    <ul>
      {menu.map((item) => (
        <li key={item._id}>
          <strong>{item.name}</strong> - ${item.price}
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

// PropTypes validation
MenuList.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default MenuList;
