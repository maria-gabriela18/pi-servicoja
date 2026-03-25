import "./info_demanda.css"

function Demanda() {

    return (

        <div>

            <h1> Detalhes da Demanda </h1>
            <hr />

            <div className="card">

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

            <div class="cardPrestador">

                <div class="header">
                    <img class="foto" src="https://placehold.co/50x50" />

                    <div class="info">
                        <h3>Carlos Silva</h3>
                        <p class="avaliacao">⭐ 4.8 | 120 serviços realizados</p>
                    </div>
                </div>

                <hr/>

                <div class="detalhes">
                    <p><strong>Valor:</strong> R$ 120,00</p>
                    <p><strong>Prazo:</strong> 2 dias</p>
                </div>

                <hr/>

                <p class="mensagem">
                    "Posso resolver seu problema rapidamente, tenho experiência com isso."
                </p>

                <hr/>

                <div class="acoes">
                    <button class="aceitar">Aceitar Proposta</button>
                    <button class="recusar">Recusar Proposta</button>
                </div>
            </div>

        </div>

    );
}

export default Demanda;