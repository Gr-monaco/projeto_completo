import React from 'react'
import ComCriaOpcoes from '../ComCriaOpcoes'
import ComEditaOpcoes from '../ComEditaOpcoes'
import { ComLogin } from './Login/ComLogin'

export function PainelDeAdmin(){
    
    const verificaUsuario = () =>{
        if(sessionStorage.getItem("currentUser") !== null){
          return true;
        }
        else{
          return false;
        }
      }


    return(
        <div>
            <ComLogin></ComLogin>
            {verificaUsuario() ? <ComCriaOpcoes></ComCriaOpcoes> : null}
            {verificaUsuario() ? <ComEditaOpcoes></ComEditaOpcoes> : null}

        </div>
    )
}