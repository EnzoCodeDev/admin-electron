import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterPrivate } from "./RouterPrivate";
import { RoutersPublic } from "./dataRouter";
import { authServices } from "../services/authServices";
import { Login } from "../view/login/Login";
import { LoadingPages } from "../components/atomos/loadingPages/LoadingPages";
import userStore from "../store/userStore";
import axios from "axios";

export const Router = () => {
  const userTienda = userStore((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Si el usuario viene de la pantalla de el qr de la mesa
    let token = localStorage.getItem("token_bearer") || null;
    if (token) {
      authServices
        .loginByToken(token)
        .then((res) => {
          axios.defaults.headers["Authorization"] = `Bearer ${res["data"]['token']}`;
          userTienda.setState({
            login: true,
            user: res["data"]['user'],
            token: res["data"]['token'],
            token_type: res["data"]['type'],
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          userTienda.resetState();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPages />
      ) : (
        <BrowserRouter>
          <Routes>
            <React.Fragment>
              <Route
                path="/*"
                element={
                  <div
                    className={
                      "animate__animated animate__fadeIn animate__faster"
                    }
                  >
                    <>
                      {!userTienda["login"] && (
                        <Routes>
                          {RoutersPublic.map((ruta, i) => (
                            <React.Fragment key={i}>
                              <Route
                                path={`/${ruta["path"]}`}
                                element={ruta["element"]}
                              />
                            </React.Fragment>
                          ))}
                          **<Route path="*" element={<Login />}></Route>**
                        </Routes>
                      )}
                    </>
                    <>{userTienda["login"] && <RouterPrivate />}</>
                  </div>
                }
              />
            </React.Fragment>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
