
import "../home.css";
export default function Page() {

    return (
        <div>

            <header className="header">
                <div>
                    <button>Login</button>
                    <button>Cadastrar</button>
                </div>
            </header>

            <section>

                <div className="titulo">
                    <h1><span>Service</span>Hub</h1>
                </div>


                <div className="carrossel">
                    <ul>
                        <li>automoveis </li>
                        <li>Design e Tecnologia</li>
                        <li>Reforma e Reparos </li>
                        <li>Serviços domesticos </li>
                        <li>Saúde</li>
                        <li>Assistencia técnica </li>
                    </ul>
                </div>


                <div>
                    
                    <div className="informacao">

                        <h2>O que é o ServiceHub?</h2>
                        <p>
                            ServiceHub é a sua mais nova e completa plataforma de contratação de serviços do Brasil. Conectamos Profissionais de todo o Brasil com pessoas solicitando serviço, atendendo com qualidade, facilidade e rapidez todos os tipos de necessidade.
                        </p>

                    </div>

                    <div className="cardsFuncionamento">
                        <div>
                            <h2>Faça seu pedido</h2>
                            <p>fale o que precisa</p>
                        </div>

                        <div>
                            <h2>Receba até 5 orçamentos</h2>
                            <p>Profissionais avaliados entram em contato com você em instantes!</p>
                        </div>

                        <div>
                            <h2>Escolha o melhor negocio</h2>
                            <p>Negocie direto com eles. Fácil como nunca foi antes!</p>
                        </div>

                    </div>

                </div>


                <div className="sobreNos">
                    <div>
                    <h2>Sobre nós</h2>
                        <p>
                            Tudo começou quando um grupo de cinco pessoas foram desafiadas a desenvolver um projeto que facilitasse a Vida dos trabalhadores de alguma forma. Pegamos problemas que enfrentamos no dia a dia. imprevistos acontecem o tempo todo, muitas vezes quando menos esperamos. Então pensamos em criar um site, onde de qualquer lugar, qualquer hora, você possa cadastrar o seu problema atual, e prestadores cadastrados no site pode se inscrever para resolver o seu problema. facil,rapido e gratis
                        </p>
                    </div>
                </div>

            </section>


            <footer>
                    <p>© 2026 ServiceHub - Todos os direitos reservados</p>
            </footer>


        </div>
    )
}