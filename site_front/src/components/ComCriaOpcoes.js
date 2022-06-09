import * as React from "react"
import { toast } from "react-toastify";

export function ComCriaOpcoes(){
    const[nome, setNome] = React.useState();
    const[preco, setPreco] = React.useState();
    const[descricao, setDescricao] = React.useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const opcao = {nome, preco, descricao};
        fetch("http://localhost:5000/opcaoDePrato", {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(opcao)
        }).then(()=>{
            console.log("Opção adicionada.");
            toast.success("Opção adicionada!");
            setNome("");
            setPreco("");
            setDescricao("");
        }).catch((e)=>
        console.log(e.message));
    }

    return(
        <div>
            <h1>Criador de cardapio</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label for="nome">Nome:</label>
                    <input 
                    id="nome"
                    type="text" 
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label for="nome">Preço:</label>
                    <input 
                    id="nome"
                    type="number"
                    step=".01" 
                    required
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label for="descricao">Descrição:</label>
                    <textarea 
                    id="descricao"
                    required
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    ></textarea>
                </div>
                <button>Adicionar opção</button>
            </form>
        </div>
    );
}


export default ComCriaOpcoes;