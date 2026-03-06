import Link from "next/link";

export default function AdiminiPrest() {

    const listaPrestadores = [
        {
            nome: "Luiz",
            descricao: "Problema na porta do quarto",
            categoria: "Marceneiro"
        },
        {
            nome: "Ana",
            descricao: "Vazamento na pia da cozinha",
            categoria: "Encanador"
        },
        {
            nome: "Carlos",
            descricao: "Instalação de ventilador de teto",
            categoria: "Eletricista"
        },
        {
            nome: "Mariana",
            descricao: "Pintura da sala e corredor",
            categoria: "Pintor"
        },
        {
            nome: "Roberto",
            descricao: "Manutenção no ar-condicionado",
            categoria: "Técnico em Ar-Condicionado"
        },
        {
            nome: "Juliana",
            descricao: "Instalação de piso laminado",
            categoria: "Pedreiro"
        },
        {
            nome: "Fernando",
            descricao: "Conserto de notebook",
            categoria: "Técnico em Informática"
        },
        {
            nome: "Patricia",
            descricao: "Montagem de guarda-roupa",
            categoria: "Montador de Móveis"
        },
        {
            nome: "Ricardo",
            descricao: "Limpeza pós-obra",
            categoria: "Diarista"
        },
        {
            nome: "Camila",
            descricao: "Troca de fechadura",
            categoria: "Chaveiro"
        }
    ];

    return (
        <div class="container-fluid">
            <div class="row">

                <div className="col-2 menuLateral vh-100 d-flex flex-column justify-content-between">
                    <div class="text-center mt-5">
                        <img src="https://placehold.co/40" />
                        <h1 class="fs-5"> Service Hub </h1>
                    </div>


                    <div class="list-group list-group-flush fs-5 ">
                        <Link href="perfil_usuarios" class="list-group-item list-group-item-action">Perfil</Link>
                        <Link href="#" class="list-group-item list-group-item-action">Descrição</Link>
                        <Link href="#" class="list-group-item list-group-item-action">Demandas finalizadas</Link>
                    </div>


                    <div class="text-center menuLateralPerfil ">
                        <img class="me-2" src="https://placehold.co/40" />
                        <div class="btn-group dropend ">
                            <button type="button" class="btn dropdown-toggle  p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 " data-bs-toggle="dropdown">Perfil</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Editar</a></li>
                                <li><a class="dropdown-item" href="#">Sair</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* <!-- Conteúdo principal --> */}
                <div class="col-9">
                    {/* <!-- Introdução --> */}
                    <div class="mt-5">
                        <h2 class=" p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 ">Painel administrativo</h2>
                        <hr />
                    </div>
                    {/* <!-- Pesquisa e filtro --> */}
                    <div class="row">
                        <div class="col-4">

                            <div class="input-group mb-3">
                                <input class="form-control" placeholder="Pesquisar.." />
                                <button class="btn btn-outline-secondary">🔎</button>
                            </div>

                        </div>

                        <div class="col-4"></div> {/* Para criar espaço vazio entre as colunas*/}

                        <div class="col-4">
                            <select class="form-select p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
                                <option selected disabled> Filtro </option>
                                <option value="1"> Ativo </option>
                                <option value="2"> Finalizado </option>
                            </select>
                        </div>

                    </div>
                    {/* <!-- Cadastro --> */}
                    <div class="text-end my-5">

                        <button class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" >Todas demandas</button>
                        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Criar novo portfólio</button>

                    </div>
                    {/* Tabela */}
                    <div>
                        <table class="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Visualização</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaPrestadores.map(
                                        item => <tr>
                                            <th scope="row">{item.nome}</th>
                                            <td>{item.descricao}</td> {/* td: coluna*/}
                                            <td>{item.categoria}</td>
                                            <td><button>❌</button> <button>👁‍🗨</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>            
        </div >
    )

}


