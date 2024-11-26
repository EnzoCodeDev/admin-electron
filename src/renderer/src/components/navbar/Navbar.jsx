import "./navbar.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../menu/Menu";
import { authServices } from "../../services/authServices";
import { messagesInfo } from "../messages/Messages";
import userStore from "../../store/userStore";
import { LogoutOutlined } from "@ant-design/icons";

export const Navbar = ({ expanded, setExpanded }) => {
  let navigate = useNavigate();
  const userTienda = userStore((state) => state);
  console.log(userTienda);

  const logoutSection = () => {
    authServices
      .logoutByToken()
      .then((response) => {
        userTienda.resetState();
        navigate("/login");
        messagesInfo.success("Se ha cerrado la sesión correctamente");
      })
      .catch((error) => {
        userTienda.resetState();
        messagesInfo.success("Se ha cerrado la sesión correctamente");
      });
  };

  return (
    <div>
      <Menu expanded={expanded} setExpanded={setExpanded} />
      <div className="topBar">
        <div className="wrapper">
          <div className="right">
            <div className="hamburger" onClick={() => setExpanded(!expanded)}>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
          </div>
          <div className="right">
            <div className="logoutSection">
              <span className="userName">
                {userTienda.user.name}
              </span>
              <div className="logoutButton" onClick={logoutSection}>
                <LogoutOutlined className="logoutIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
