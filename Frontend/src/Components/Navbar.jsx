import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

function Navbar() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const { data } = useSelector((store) => store.products); 
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const totalCount = data?.filter((e) => e.added === true).length || 0;
    setTotal(totalCount);
  }, [data]); 

  const logout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate('/login');
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.leftnav}>
        <button onClick={() => navigate("/")}>Logo</button>{" "}
      </div>
      <div className={styles.rightnav}>
        <div className={styles.cartdiv} onClick={() => navigate("/cart")}>
          <FaShoppingCart fontSize={"1.5em"} className={styles.carticon} />
          <span>{total}</span>
        </div>
        <div className={styles.profile}>
          {token ? (
            <>
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1713286198~exp=1713289798~hmac=3ebf505d5993ad3d8da0a011747ef1eac22f513979381f272a233a1610f56cbb&w=740"
                alt=""
              />

              <Menu>
                <MenuButton as={Button} variant="link">
                  Menu
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                  <MenuItem onClick={() => navigate('/mystore')}>My Store</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
