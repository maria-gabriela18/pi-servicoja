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

                {propostas.map((p) => (
                    <div className="card" key={p.id}>

                        <div className="topo">
                            <h2>{p.nome}</h2>
                            <span>⭐ {p.avaliacao}</span>
                        </div>

                        <p className="preco">R$ {p.preco}</p>

                        <p className="descricao">{p.descricao}</p>

                        <div className="acoes">
                            <button className="aceitar" onClick={() => aceitar(p.id)}>
                                Aceitar
                            </button>

                            <button className="recusar" onClick={() => recusar(p.id)}>
                                Recusar
                            </button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}