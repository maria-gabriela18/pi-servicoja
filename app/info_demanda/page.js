import "./info_demanda.css"

function Demanda() {

    return (
        <div className="centralizar">
            <div>

                <h1> Detalhes da Demanda </h1>
                <hr />

                <div className="cardProposta">

                    <div className="row">

                        <div className="col-8">
                            <h2> Conserto de torneira na cozinha </h2>
                        </div>


                        <div className="col-4">
                            <h3>Status: em aberto</h3>
                        </div>

                    </div>

                    <hr />

                    <p> Torneira da cozinha está vazando e precisa de conserto urgente. Necessito de um profissional com experiência em hidráulica para resolver o problema </p>

                    <hr />

                    <div className="row">

                        <div className="col-4">
                            <p> <strong> ⭕ Categoria: </strong> hidráulica </p>
                        </div>

                        <div className="col-4">
                            <p> <strong> 📍 Localização: </strong> São Carlos-SP </p>
                        </div>

                        <div className="col-4">
                            <p> <strong> 📅 Data de criação: </strong> 19/03/2026 </p>
                        </div>

                    </div>

                </div>

                <br />
                <h3> Propostas Recebidas </h3>
                <hr />

                <div className="cardPrestador">

                    <div className="cabecalho">
                        <img className="foto" src="https://placehold.co/50x50" />

                        <div className="info">
                            <h3>Carlos Silva</h3>
                            <p className="avaliacao">⭐ 4.8 | 120 serviços realizados</p>
                        </div>
                    </div>

                    <hr />

                    <div className="detalhes">
                        <p><strong>Valor:</strong> R$ 120,00</p>
                        <p><strong>Prazo:</strong> 2 dias</p>
                    </div>

                    <hr />

                    <p className="mensagem">
                        "Posso resolver seu problema rapidamente, tenho experiência com isso."
                    </p>

                    <hr />

                    <div className="acoes">
                        <button className="aceitar">Aceitar Proposta</button>
                        <button className="recusar">Recusar Proposta</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Demanda;