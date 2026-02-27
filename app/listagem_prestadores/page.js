import "./listagem_prestadores.css";

export default function ListagemPrestadores() {
    return (
        <div>

            <header className="headerListaPres">

                <ul>
                    <li>automoveis </li>
                    <li>Design e Tecnologia</li>
                    <li>Reforma e Reparos </li>
                    <li>Serviços domesticos </li>
                    <li>Saúde</li>
                    <li>Assistencia técnica </li>
                </ul>

            </header>


            <section className="cards">
                <div>
                    <img src="https://placehold.co/50x50"></img>
                    <h3>Rafael</h3>
                    <p>FUNÇÃO:</p>
                    <span>Programador</span>
                    <p>Descrição:</p>
                    <textarea placeholder="eu sou um programador"></textarea>
                    <button>Ver contato</button>
                </div>
            </section>

        </div>
    );
}
