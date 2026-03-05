import "./listagem_prestadores.css";
import Link from "next/link";
export default function ListagemPrestadores() {
    const prestadores = [
        { nome: "Carlos Silva", funcao: "Eletricista", categoria: "Reparos e Manutenção", descricao: "Especialista em instalação elétrica residencial e manutenção de quadros de energia." },

        { nome: "João Pereira", funcao: "Encanador", categoria: "Reparos e Manutenção", descricao: "Realiza consertos de vazamentos, troca de encanamentos e instalação de torneiras." },

        { nome: "Marcos Souza", funcao: "Pedreiro", categoria: "Construção", descricao: "Experiência em reformas, construção de paredes e acabamento de obras." },

        { nome: "André Oliveira", funcao: "Pintor", categoria: "Acabamento", descricao: "Serviços de pintura interna e externa com ótimo acabamento." },

        { nome: "Lucas Fernandes", funcao: "Montador de Móveis", categoria: "Serviços Domésticos", descricao: "Montagem e desmontagem de móveis planejados e convencionais." },

        { nome: "Felipe Costa", funcao: "Jardineiro", categoria: "Jardinagem", descricao: "Cuidados com jardins, poda de plantas e manutenção de áreas verdes." },

        { nome: "Rafael Martins", funcao: "Técnico em Informática", categoria: "Tecnologia", descricao: "Formatação de computadores, remoção de vírus e instalação de programas." },

        { nome: "Bruno Rocha", funcao: "Instalador de Ar Condicionado", categoria: "Climatização", descricao: "Instalação e manutenção de ar condicionado residencial." },

        { nome: "Gabriel Alves", funcao: "Marceneiro", categoria: "Móveis", descricao: "Produção e reparo de móveis de madeira sob medida." },

        { nome: "Daniel Ribeiro", funcao: "Serralheiro", categoria: "Metalurgia", descricao: "Fabricação de portões, grades e estruturas metálicas." },

        { nome: "Ricardo Gomes", funcao: "Motorista Particular", categoria: "Transporte", descricao: "Serviço de transporte seguro e confortável para viagens e compromissos." },

        { nome: "Eduardo Carvalho", funcao: "Diarista", categoria: "Serviços Domésticos", descricao: "Limpeza geral de casas e apartamentos com organização completa." },

        { nome: "Paulo Mendes", funcao: "Chaveiro", categoria: "Segurança", descricao: "Abertura de portas, cópia de chaves e troca de fechaduras." },

        { nome: "Thiago Batista", funcao: "Técnico em Celulares", categoria: "Tecnologia", descricao: "Conserto de telas, baterias e problemas de software em smartphones." },

        { nome: "Rodrigo Teixeira", funcao: "Designer Gráfico", categoria: "Design", descricao: "Criação de logos, artes para redes sociais e identidade visual." },

        { nome: "Vinicius Nogueira", funcao: "Fotógrafo", categoria: "Eventos", descricao: "Fotografia profissional para eventos, ensaios e produtos." },

        { nome: "Leonardo Araujo", funcao: "Videomaker", categoria: "Audiovisual", descricao: "Produção e edição de vídeos para empresas e redes sociais." },

        { nome: "Fernando Barbosa", funcao: "Professor de Matemática", categoria: "Educação", descricao: "Aulas particulares para ensino fundamental e médio." },

        { nome: "Gustavo Freitas", funcao: "Personal Trainer", categoria: "Saúde e Fitness", descricao: "Treinamento personalizado para condicionamento físico." },

        { nome: "Matheus Correia", funcao: "Entregador", categoria: "Logística", descricao: "Entrega rápida de encomendas e documentos." },

        { nome: "Diego Santana", funcao: "Lavador de Carros", categoria: "Automotivo", descricao: "Lavagem completa e detalhamento automotivo." },

        { nome: "Igor Lopes", funcao: "Instalador de Internet", categoria: "Tecnologia", descricao: "Configuração de redes Wi-Fi e instalação de roteadores." },

        { nome: "Alexandre Pires", funcao: "Técnico em TV", categoria: "Eletrônicos", descricao: "Conserto e instalação de televisores e sistemas de som." },

        { nome: "Marcelo Duarte", funcao: "Segurança Particular", categoria: "Segurança", descricao: "Serviço de proteção pessoal e segurança em eventos." },

        { nome: "Renato Farias", funcao: "Chef de Cozinha", categoria: "Gastronomia", descricao: "Preparação de refeições especiais para eventos e jantares." },

        { nome: "Claudio Moraes", funcao: "Barbeiro", categoria: "Beleza", descricao: "Cortes modernos, barba e cuidados masculinos." },

        { nome: "Henrique Tavares", funcao: "Massagista", categoria: "Saúde e Bem-estar", descricao: "Massagens relaxantes e terapêuticas." },

        { nome: "Samuel Cardoso", funcao: "Cuidador de Idosos", categoria: "Cuidados Pessoais", descricao: "Assistência diária e acompanhamento para idosos." },

        { nome: "Wesley Andrade", funcao: "Dog Walker", categoria: "Pets", descricao: "Passeios e cuidados com cães durante o dia." },

        { nome: "Julio Cesar", funcao: "Instalador de Câmeras", categoria: "Segurança", descricao: "Instalação de sistemas de monitoramento e câmeras de segurança." }
    ];

    return (
        <div>

            {/* HEADER */}
            <header className="headerListaPres">
                <ul>
                    <li>automoveis </li>
                    <li>Design e Tecnologia</li>
                    <li>Reforma e Reparos </li>
                    <li>Serviços domesticos </li>
                    <li>Saúde</li>
                    <li>Assistencia técnica </li>
                </ul>

                <div className="botaoPerfil">
                    <Link href="perfil_usuarios" class="list-group-item list-group-item-action">Perfil</Link>
                </div>
            </header>

            {/* CATEGORIA 1 */}
            <section className="categoria">
                <h2 className="categoria-titulo">Programadores</h2>

                <div className="cards">

                    {prestadores.map(
                        prestador => <div className="card">

                                        <div className="card-top">
                                            <img src="https://placehold.co/50x50" />
                                            <h3>{prestador.nome}</h3>
                                        </div>

                                        <div className="card-info">
                                            <p className="label">Função</p>
                                            <span>{prestador.funcao}</span>
                                        </div>

                                        <div className="card-desc">
                                            <p className="label">Descrição</p>
                                            <p className="descricao">
                                                {prestador.descricao}
                                            </p>
                                        </div>

                                        <div className="card-action">
                                            <button>Ver contato</button>
                                        </div>

                                     </div>
                    )}
                </div>
            </section>


            {/* CATEGORIA 2 */}
            <section className="categoria">
                <h2 className="categoria-titulo">Eletricistas</h2>

                <div className="cards">

                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>


                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>


                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-top">
                            <img src="https://placehold.co/50x50" />
                            <h3>João</h3>
                        </div>

                        <div className="card-info">
                            <p className="label">Função</p>
                            <span>Eletricista</span>
                        </div>

                        <div className="card-desc">
                            <p className="label">Descrição</p>
                            <p className="descricao">
                                Especialista em instalações e manutenção elétrica residencial.
                            </p>
                        </div>

                        <div className="card-action">
                            <button>Ver contato</button>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
}