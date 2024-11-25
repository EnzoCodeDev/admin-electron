import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../AxiosClient/axiosClient";

export default function Repositiorio(){
const [users, setUsers] = useState([]);
const [Loading, setLoading] = useState(false);

useEffect(()=>{
  getUsers();
},[])

 const getUsers=()=> {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <div>
      Instituciones
      </div>
      <Link to="/users"> Agregar Nueva Institucion</Link>
      </div>
  )
}

