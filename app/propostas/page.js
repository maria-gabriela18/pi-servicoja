'use client'

import "./propostas.css";

export default function Propostas() {

    const propostas = [
        {
            id: 1,
            nome: "João Silva",
            avaliacao: 4.8,
            preco: 120,
            descricao: "Posso resolver hoje mesmo, tenho experiência."
        },
        {
            id: 2,
            nome: "Maria Souza",
            avaliacao: 4.5,
            preco: 100,
            descricao: "Faço com garantia e material incluso."
        },
    ];

    function aceitar(id) {
        alert("Proposta aceita: " + id);
    }

    function recusar(id) {
        alert("Proposta recusada: " + id);
    }

    return (
        <div className="container">

            <h1>Propostas recebidas</h1>
        
            <div className="lista">

                {propostas.map((proposta) => (
                    <div className="card" key={proposta.id}>

                        <div className="topo">
                            <h2>{proposta.nome}</h2>
                            <span>⭐ {proposta.avaliacao}</span>
                        </div>

                        <p className="preco">R$ {proposta.preco}</p>

                        <p className="descricao">{proposta.descricao}</p>

                        <div className="acoes">
                            <button className="aceitar" onClick={() => aceitar(proposta.id)}>
                                Aceitar
                            </button>

                            <button className="recusar" onClick={() => recusar(proposta.id)}>
                                Recusar
                            </button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}