'use client'

import "./dashboard.css";

export default function Dashboard() {

    const servicos = [
        { id: 1, nome: "Conserto de chuveiro", status: "Aberto" },
        { id: 2, nome: "Pintura de parede", status: "Em andamento" },
        { id: 3, nome: "Instalação elétrica", status: "Concluído" },
    ];

    return (
        <div className="container">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <h2>Service<span>Hub</span></h2>

                <ul>
                    <li className="active">🏠 Dashboard</li>
                    <li>📋 Meus Serviços</li>
                    <li>💰 Orçamentos</li>
                    <li>⭐ Avaliações</li>
                    <li>⚙️ Configurações</li>
                </ul>
            </aside>

            {/* MAIN */}
            <main className="main">

                {/* HEADER */}
                <div className="header">
                    <h1>Olá, Rafael 👋</h1>
                    <button className="logout">Sair</button>
                </div>

                {/* CARDS */}
                <div className="cards">
                    <div className="card">
                        <h3>Serviços</h3>
                        <p>{servicos.length}</p>
                    </div>

                    <div className="card">
                        <h3>Orçamentos</h3>
                        <p>5</p>
                    </div>

                    <div className="card">
                        <h3>Concluídos</h3>
                        <p>
                            {servicos.filter(s => s.status === "Concluído").length}
                        </p>
                    </div>
                </div>

                {/* BOTÃO */}
                <div className="novo-servico">
                    <button>+ Novo Serviço</button>
                </div>

                {/* TABELA */}
                <div className="tabela">
                    <h2>Seus serviços</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td>{servico.nome}</td>
                                    <td className={
                                        servico.status === "Aberto" ? "aberto" :
                                        servico.status === "Em andamento" ? "andamento" :
                                        "concluido"
                                    }>
                                        {servico.status}
                                    </td>
                                    <td>
                                        <button>Ver</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>

        </div>
    );
}






















