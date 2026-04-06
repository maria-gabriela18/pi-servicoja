
import Link from "next/link";
import "../home.css";
import supabase from "./conexao/supabase";
export default function Page() {

  


    return (

        <section>

            

            <div className="titulo">
                <h1><span>Service</span>Hub</h1>
            </div>

            <div className="caixa-input">
                <input placeholder="Que serviço você precisa? Ex: eletricista, encanador.." />
                <button><i className="bi bi-search"></i></button>
            </div>

            <div className="cta">
                <Link href="/cadastro_usuarios">
                    <button className="btn-primario">Solicitar serviço</button>
                </Link>

                <Link href="/cadastro_usuarios">
                    <button className="btn-secundario">Quero ser prestador</button>
                </Link>
            </div>


            <div className="carrossel">
                <ul>
                    <li><i className="bi bi-car-front-fill"></i>automoveis </li>
                    <li><i className="bi bi-pc-display-horizontal"></i>Design e Tecnologia</li>
                    <li><i className="bi bi-hammer"></i>Reforma e Reparos </li>
                    <li><i className="bi bi-house-door"></i>Serviços domesticos </li>
                    <li><i className="bi bi-heart-pulse"></i>Saúde</li>
                    <li><i className="bi bi-wrench-adjustable"></i>Assistencia técnica </li>
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
                        <i className="bi bi-truck"></i>
                        <h2>Faça seu pedido</h2>
                        <p>Descreva seu problema em poucos segundos</p>
                    </div>

                    <div>
                        <i className="bi bi-cash"></i>
                        <h2>Receba até 5 orçamentos</h2>
                        <p>Profissionais avaliados entram em contato com você em instantes!</p>
                    </div>

                    <div>
                        <i className="bi bi-star"></i>
                        <h2>Escolha o melhor negocio</h2>
                        <p>Negocie direto com eles. Fácil como nunca foi antes!</p>
                    </div>

                </div>

            </div>


            <div className="sobreNos">
                <div>
                    <h2>Sobre nós</h2>
                    <p>
                        Tudo começou quando um grupo de cinco pessoas foram desafiadas a desenvolver um projeto que facilitasse a Vida dos trabalhadores de alguma forma. Pegamos problemas que enfrentamos no dia a dia. imprevistos acontecem o tempo todo. muitas vezes quando menos esperamos. Então pensamos em criar um site, onde de qualquer lugar, qualquer hora, você possa cadastrar o seu problema atual, e prestadores cadastrados no site pode se inscrever para resolver o seu problema. facil,rapido e gratuito.
                    </p>
                </div>
            </div>

            <footer>
                <p>© 2026 ServiceHub - Todos os direitos reservados</p>
            </footer>

        </section>




    )
}