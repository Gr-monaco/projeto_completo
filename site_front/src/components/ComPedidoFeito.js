import * as React from "react";
import { BrowserRouter, useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "./ComPedidoFeito.css"


export function ComPedidoFeito(PedidoRealizado) {
    const { state } = useLocation();
    console.log(state);
    console.log(PedidoRealizado);
    return (
        <>
            {(state === null) ? (<h2>Está nulo</h2>)
                :
                (
                    <div className="pedido_container">
                        <div className="pedido">
                            <div className="divisor">
                                <div className="pedido_fundo_escuro">

                                    <h1 className="pedido_title">Dados do cliente</h1>
                                    <p>E-mail: {state.pedido.cliente}</p>
                                    <p>Endereço: {state.pedido.endereco}</p>
                                    <br></br>
                                    <h1 className="pedido_title">Dados do pedido</h1>
                                    {state.pedido.opcoes.map((op) => {
                                        return (<><br></br><label>{op.nomePrato} : {op.quantidade} unidades</label></>);

                                    })}
                                    <br></br><br></br><label>Valor total: R$ {state.pedido.valorTotal.toFixed(2)}</label>
                                    <p>Forma de pagamento: {state.pedido.formaPagamento}</p>
                                </div>
                            </div>
                            
                        </div>

                    </div>)}

        </>
    );
}