import * as React from "react"
import { ErrorMessage, Formik, Form, Field, setIn } from 'formik'
import axios from 'axios';
import { toast } from 'react-toastify';
import { BrowserRouter ,useNavigate , Routes, Route, Navigate, useLocation } from 'react-router-dom';




export default function ComPegaMenu() {
    let navigate = useNavigate();
    const { state } = useLocation();
    console.log("a"+state);

    React.useEffect(() => {
        funcaoAssync();
    }, [])

    const [opcoes, setOpcoes] = React.useState([]);
    const [init, setInit] = React.useState({});

    const funcaoAssync = async () => {
        console.log("func async")
        const resultado = await fetch("http://localhost:5000/opcaoDePrato");
        const json = await resultado.json();
        setOpcoes(json);
        let valoresIniciais = {};
        json.forEach((o)=>{
            valoresIniciais[o._id]=1
        })

        setInit(valoresIniciais);
        console.log(init);
    };

    async function pegaValores(){
        const resultado = await fetch("http://localhost:5000/opcaoDePrato");
        const json = await resultado.json();
        let valoresIniciais = {};
        json.forEach((o, i )=>{
            valoresIniciais[o._id]=1
        })
        console.log(valoresIniciais)
        return valoresIniciais;
    }

    const handleSubmit = (values) => {
        console.log(JSON.parse(sessionStorage.getItem("currentUser")).email)
        values.email = JSON.parse(sessionStorage.getItem("currentUser")).email
        console.log('SUBMIT', values);
        axios.post("http://localhost:5000/pedido/", values)
            .then((response)=>{
                console.log(response.data)
                toast.success("Pedido efetuado!");
                navigate("/pedir/efetuado", {state:{pedido: response.data.pedido}});
        })
    }

    return (
        <div>
            <h1>Eu carreguei!</h1>
            <Formik onSubmit={handleSubmit} initialValues={{}} >
                <Form>
                    {opcoes.map((op, i) => {
                        return (
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
                        )
                    })}
                <button type="submit">Adicionar opção</button>
                </Form>
            </Formik>
        </div>
    );
};