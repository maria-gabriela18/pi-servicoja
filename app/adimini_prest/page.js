'use client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://ynxzquxbnbdesqknhbte.supabase.co", 'sb_publishable_NFhvutPRUhEg0xdbFhkflA_UV_NXWFu')

// postgresql://postgres:[OBok2BcuYLAUGKj3]@db.ynxzquxbnbdesqknhbte.supabase.co:5432/postgres

import Link from "next/link";
import { useEffect, useState } from 'react';

export default function AdiminiPrest() {

    const [demandas, setDemandas] = useState([])

    async function buscarDemanda() {

        const { data, error } = await supabase
            .from('demandas')
            .select("*")

        if (error) {
            console.log("Error", error)

        } else {
            setDemandas(data)
        }

    };

    function salvar(e) {
        e.preventDefault()

        const objeto = {
            funcao: funcao,
            descricao: descricao

        }

        console.log(objeto)
    }

    useEffect(() => {
        buscarDemanda()
    }, [])

    return (
        <div class="container-fluid">
            <div class="row">

                <div className="col-2 menuLateral vh-100 d-flex flex-column justify-content-between">
                    <div class="text-center mt-5">
                        <img src="https://placehold.co/40" />
                        <h1 class="fs-5"> Service Hub </h1>
                    </div>


                    <div class="list-group list-group-flush fs-5">
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
                        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" id='myModal' >Criar novo portfólio</button>

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
                            
                                {
                                    demandas.map((demanda) => (
                                   <tbody>
                                   <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td> {/* td: coluna*/}
                                    <td> {demanda.categoria}</td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td>
                                    <td> {demanda.categoria} </td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>

                                </tr>
                                <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td>
                                    <td> {demanda.categoria} </td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>

                                </tr>
                                <tr>

                                </tr>
                                </tbody>
                                    ))
                                }

                            
                        </table>


                    </div>
                </div>
            </div>

            {/* MODAL TODAS AS DEMANDAS */}
            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h2 className="modal-title">Todas as demandas</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
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
                                    {
                                    demandas.map((demanda) => (
                                   <tbody>
                                   <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td> {/* td: coluna*/}
                                    <td> {demanda.categoria}</td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td>
                                    <td> {demanda.categoria} </td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>

                                </tr>
                                <tr>
                                    <th scope="row">{demanda.id_usuarios}</th>
                                    <td>{demanda.descricao}</td>
                                    <td> {demanda.categoria} </td>
                                    <td><button>❌</button> <button>👁‍🗨</button></td>

                                </tr>
                                <tr>

                                </tr>
                                </tbody>
                                    ))
                                }
                                </table>


                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="#exampleModal">
                                Fechar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* MODAL CRIAR PORTIFÓLIO ainda não funciona*/}

            <div className="modal fade" id="myModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h2 className="modal-title">Portifólio</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"> Salvar </button>
                        </div>

                        <div className="modal-body">
                            <p>Descrição do serviço</p>
                            <input />

                            <p></p>

                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="#exampleModal">
                            Fechar
                        </button>
                    </div>

                </div>
            </div>


        </div >
    )

}


