import "./routerPrivate.scss";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
import { dataRoutersAdminPrivate } from "./dataRouter";
import { FloatButton } from "antd";
import { Navbar } from "../components/navbar/Navbar";
import userStore from "../store/userStore";

export const RouterPrivate = () => {
  const [expanded, setExpanded] = useState(false);
  const userTienda = userStore((state) => state);

  return (
    <div className="App">
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
            {dataRoutersAdminPrivate.map((ruta, i) => (
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
    </div>
  );
};
