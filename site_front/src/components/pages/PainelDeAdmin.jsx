import React from 'react'
import ComCriaOpcoes from '../ComCriaOpcoes'
import ComEditaOpcoes from '../ComEditaOpcoes'
import { BrowserRouter, useNavigate, Routes, Route, Navigate } from 'react-router-dom';


export function PainelDeAdmin(){
    
    const verificaUsuario = () =>{
        if(sessionStorage.getItem("currentUser") !== null){
          return true;
        }
        else{
          return false;
        }
      }

      const verificaUsuarioAdmin = () =>{
        if (!verificaUsuario()) return false;
        if(JSON.parse(sessionStorage.getItem("currentUser")).isAdmin) return true;
        return false;
      }

    return(
        <div>
            {verificaUsuarioAdmin() ? <ComCriaOpcoes></ComCriaOpcoes> : <Navigate to="/"></Navigate>}
            {verificaUsuarioAdmin() ? <ComEditaOpcoes></ComEditaOpcoes> : <Navigate to="/"></Navigate>}

        </div>
    )
}