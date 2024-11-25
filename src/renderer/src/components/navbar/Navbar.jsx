import "./navbar.scss";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Avatar, List, Popover, Whisper, Dropdown } from "rsuite";
// import ExitIcon from "@rsuite/icons/Exit";
// import SettingHorizontalIcon from "@rsuite/icons/SettingHorizontal";
// import QrcodeIcon from "@rsuite/icons/Qrcode";
import { Menu } from "../menu/Menu";
// import { eventoLogout } from "../../redux/Slice/authSlice";
import { authServices } from "../../services/authServices";
import { messagesInfo } from "../messages/Messages";
import userStore from "../../store/userStore";

export const Navbar = ({ expanded, setExpanded }) => {
  const ref = React.useRef();
  // let dispatch = useDispatch();
  let navigate = useNavigate();
  const userTienda = userStore((state) => state);
 
  const logoutSection = () => {
    authServices
      .logoutByToken()
      .then((response) => {
        dispatch(eventoLogout());
        navigate("/login");
        messagesInfo.success("Se ha cerrado la sesión correctamente");
      })
      .catch((error) => {
        dispatch(eventoLogout());
        messagesInfo.success("Se ha cerrado la sesión correctamente");
      });
  };


  // const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  //   <Popover ref={ref} {...rest} full>
  //     <Dropdown.Menu onSelect={onSelect}>
  //       <Dropdown.Item eventKey={1}>Cerrar sesión</Dropdown.Item>
  //     </Dropdown.Menu>
  //   </Popover>
  // ));

  function handleSelectMenu(eventKey, event) {
    if (eventKey === 1) {
      logoutSection();
    };
    ref.current.close();
  }

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
            <div className="itemContainer">
              <div className="name_user">
                <span>
                  {userTienda.user.first_name} {userTienda.user.first_surname}
                </span>
              </div>
            </div>
            <div className="itemContainer">
              {/* <Whisper
                ref={ref}
                placement="bottomEnd"
                trigger="click"
                controlId="control-id-with-dropdown"
                speaker={<MenuPopover onSelect={handleSelectMenu} />}
              >
                <Avatar
                  circle
                  src="https://avatars.githubusercontent.com/u/12592949"
                  alt="@superman66"
                  style={{ cursor: "pointer" }}
                />
              </Whisper> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
