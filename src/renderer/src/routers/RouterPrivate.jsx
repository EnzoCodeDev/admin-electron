import "./routerPrivate.scss";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
import { dataRoutersAdminPrivate, dataRoutersUserPrivate } from "./dataRouter";
import { FloatButton } from "antd";
import { Navbar } from "../components/navbar/Navbar";
import userStore from "../store/userStore";

export const RouterPrivate = () => {
  const [expanded, setExpanded] = useState(false);
  const userTienda = userStore((state) => state);

  let RouterValidate =
    userTienda["typeUser"] === "admin"
      ? dataRoutersAdminPrivate
      : dataRoutersUserPrivate;

  return (
    <div className="App">
      {userTienda["typeUser"] === "admin" && (
        <div className="container-pages">
          <Navbar
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <div
            className={
              "container-app animate__animated animate__fadeIn animate__faster " +
              (expanded && " active")
            }
          >
            <Routes>
              {RouterValidate.map((ruta, i) => (
                <React.Fragment key={i}>
                  <Route
                    exact
                    path={`/${ruta["path"]}`}
                    element={ruta["element"]}
                    className={
                      "animate__animated animate__fadeIn animate__faster"
                    }
                  />
                </React.Fragment>
              ))}
              *<Route path="" element={<h1>Not found</h1>}></Route>**
            </Routes>
          </div>
        </div>
      )}
      {userTienda["typeUser"] === "user" && (
        <div className="container-pages">
          <Routes>
            {RouterValidate.map((ruta, i) => (
              <React.Fragment key={i}>
                <Route
                  exact
                  path={`/${ruta["path"]}`}
                  element={ruta["element"]}
                  className={
                    "animate__animated animate__fadeIn animate__faster"
                  }
                />
              </React.Fragment>
            ))}
            *<Route path="" element={<h1>Not found</h1>}></Route>**
          </Routes>
          <CallPedidos
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
          <FloatButton
            badge={{
              count: "Llamado de mesas (1)",
              color: "green",
            }}
            icon={<PhoneOutlined />}
            style={{ right: 24, bottom: 100 }}
            onClick={(e) => setOpenDrawer(true)}
          />
        </div>
      )}
    </div>
  );
};
