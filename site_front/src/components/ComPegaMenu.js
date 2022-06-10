import * as React from "react";
import { ErrorMessage, Formik, Form, Field, setIn } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BrowserRouter, useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';




export default function ComPegaMenu() {
    let navigate = useNavigate();
    const { state } = useLocation();
    console.log("a" + state);

    React.useEffect(() => {
        funcaoAssync();
    }, []);

    const [opcoes, setOpcoes] = React.useState([]);
    const [init, setInit] = React.useState({});

    const funcaoAssync = async () => {
        console.log("func async");
        const resultado = await fetch("http://localhost:5000/opcaoDePrato");
        const json = await resultado.json();
        setOpcoes(json);
        let valoresIniciais = {};
        json.forEach((o) => {
            valoresIniciais[o._id] = 1;
        });

        setInit(valoresIniciais);
        console.log(init);
    };

    async function pegaValores() {
        const resultado = await fetch("http://localhost:5000/opcaoDePrato");
        const json = await resultado.json();
        let valoresIniciais = {};
        json.forEach((o, i) => {
            valoresIniciais[o._id] = 1;
        });
        console.log(valoresIniciais);
        return valoresIniciais;
    }

    const handleSubmit = (values) => {
        console.log(JSON.parse(sessionStorage.getItem("currentUser")).email);
        values.email = JSON.parse(sessionStorage.getItem("currentUser")).email;
        console.log('SUBMIT', values);
        axios.post("http://localhost:5000/pedido/", values)
            .then((response) => {
                console.log(response.data);
                toast.success("Pedido efetuado!");
                navigate("/pedir/efetuado", { state: { pedido: response.data.pedido } });
            });
    };

    return (
        <div>
            <h1>Eu carreguei!</h1>
            <Formik onSubmit={handleSubmit} initialValues={{}} >
                <Form>
                    <h1>Sushis</h1>
                    {opcoes.map((op, i) => {
                        if (op.tipo === "sushi") return (
                            <div className="menuDeOp">
                                <ul>
                                    <li className="lista">
                                        <strong className="forte">{op.nome}</strong>
                                        <div className="preco">
                                            <strong>R$:</strong><label className="numero_preco">{op.preco.toFixed(2)}</label>
                                        </div>
                                        <Field id={op.id} name={op._id} type="number" ></Field>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                    <h1>Porções</h1>
                    {opcoes.map((op, i) => {
                        if (op.tipo === "porcao") return (
                            <div className="menuDeOp">
                                <ul>
                                    <li className="lista">
                                        <strong className="forte">{op.nome}</strong>
                                        <div className="preco">
                                            <strong>R$:</strong><label className="numero_preco">{op.preco.toFixed(2)}</label>
                                        </div>
                                        <Field id={op.id} name={op._id} type="number" ></Field>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                    <h1>Bebidas</h1>
                    {opcoes.map((op, i) => {
                        if (op.tipo === "bebida") return (
                            <div className="menuDeOp">
                                <ul>
                                    <li className="lista">
                                        <strong className="forte">{op.nome}</strong>
                                        <div className="preco">
                                            <strong>R$:</strong><label className="numero_preco">{op.preco.toFixed(2)}</label>
                                        </div>
                                        <Field id={op.id} name={op._id} type="number" ></Field>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                    <h1>Dados de entrega</h1>
                    <label>Endereço</label><Field type="text" name="endereco" required></Field>
                    <button type="submit">Adicionar opção</button>
                    <div id="my-radio-group">Picked</div>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                            <Field type="radio" name="formaPagamento" value="credito" required />
                            Cartão de Crédito
                        </label>
                        <label>
                            <Field type="radio" name="formaPagamento" value="debito" />
                            Cartão de Débito
                        </label>
                        <label>
                            <Field type="radio" name="formaPagamento" value="dinheiro" />
                            Dinheiro
                        </label>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};