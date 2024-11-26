import UserForm from "../view/UserForm/UserForm";
import Home from "../view/home/Home";
import { Login } from "../view/login/Login";
import { FormUser } from "../view/users/formUser/FormUser";
// import { UserClientList } from "../view/users/listUser/UserClientList";
// import Welcome from "../view/welcome/Welcome";
import Users from "../view/users";
import { PlanAccionComunalForm } from "../view/planAccionComunal/form/PlanAccionComunalForm";

export const RoutersPublic = [
  { path: "login", element: <Login /> },
];

export const dataRoutersAdminPrivate = [
  // { path: "", element: <Welcome /> },
  { path: "", element: <Home /> },
  { path: "accionComunal/form", element: <PlanAccionComunalForm /> },
  // { path: "userClient/form", element: <FormUser /> },
  // { path: "userClient/form/:uuid", element: <FormUser /> },
  // { path: "userClient", element: <UserClientList /> },
  // { path: "Repositorio", element: <Repositiorio /> },
  // { path: "users", element: <Users /> },
  // { path: "users/new", element: <UserForm /> },
];
