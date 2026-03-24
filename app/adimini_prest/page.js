'use client'
import { createClient } from '@supabase/supabase-js'
// postgresql://postgres:[OBok2BcuYLAUGKj3]@db.ynxzquxbnbdesqknhbte.supabase.co:5432/postgres
import Link from "next/link";
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';

export default function AdiminiPrest() {

    
    const [descricao, setDescricao] = useState("")
    const [experiencia, setExperiencia] = useState()
    const [funcao, setFuncao] = useState("")

    const [demandas, setDemandas] = useState([])

    async function buscarDemanda() {

        const { data, error } = await supabase
            .from('demandas')
            .select(`*, 
                    id_usuarios(
                    *) 
                `)
        console.log(data)

        if (error) {
            console.log("Error", error)

        } else {
            setDemandas(data)
        }

    };

    async function salvar(e) {
        e.preventDefault()

          const objeto = {
            descricao: descricao,
            funcao: funcao,
            historico: experiencia
        }
        
        const { data, error } = await supabase
        .from('servicos')
        .insert(objeto)
        console.log(data)
       

        console.log(error)
        console.log(objeto)


        if (error == null) {
            alert("Usuario cadastrado com sucesso")
            setDescricao("")
            setExperiencia("")
            setFuncao("")

        }else {
            alert("Dados inválidos. Verifique os campos e tente novamente.")

         }

    }


    function formataCategoria(categoria) {
        if (categoria == "pintor") {
            return <span className='basge text-bg-primary'>PINTOR</span>
        }
        if (categoria == "mecânico") {
            return <span className='basge text-bg-danger'>MECÂNICO</span>
        }
    }

    useEffect(() => {
        buscarDemanda()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-2 menuLateral vh-100 d-flex flex-column justify-content-between">
                    <div className="text-center mt-5">
                        <img src="https://placehold.co/40" />
                        <h1 className="fs-5"> Service Hub </h1>
                    </div>


                    <div className="list-group list-group-flush fs-5">
                        <Link href="perfil_usuarios" className="list-group-item list-group-item-action">Perfil</Link>
                        <Link href="#" className="list-group-item list-group-item-action">Descrição</Link>
                        <Link href="listagem_demandas" className="list-group-item list-group-item-action">Demandas em aberto</Link>
                    </div>


                    <div className="text-center menuLateralPerfil ">
                        <img className="me-2" src="https://placehold.co/40" />
                        <div className="btn-group dropend ">
                            <button type="button" className="btn dropdown-toggle  p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 " data-bs-toggle="dropdown">Perfil</button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                                <li><a className="dropdown-item" href="#">Sair</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* <!-- Conteúdo principal --> */}
                <div className="col-9">
                    {/* <!-- Introdução --> */}
                    <div className="mt-5">
                        <h2 className=" p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 ">Painel administrativo</h2>
                        <hr />
                    </div>
                    {/* <!-- Pesquisa e filtro --> */}
                    <div className="row">
                        <div className="col-4">

                            <div className="input-group mb-3">
                                <input className="form-control" placeholder="Pesquisar.." />
                                <button className="btn btn-outline-secondary">🔎</button>
                            </div>

                        </div>

                        <div className="col-4"></div> {/* Para criar espaço vazio entre as colunas*/}

                        <div className="col-4">
                            <select className="form-select p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
                                <option defaultValue={null}> Filtro </option>
                                <option value="1"> Ativo </option>
                                <option value="2"> Finalizado </option>
                            </select>
                        </div>

                    </div>
                    {/* <!-- Cadastro --> */}
                    <div className="text-end my-5">

                        <button className="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Histórico</button>
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                            Criar portfólio
                        </button>

                    </div>
                    {/* LISTA DE DEMANDAS EM ABERTO */}

                    {/* Tabela */}
                    <div>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Visualização</th>

                                </tr>
                            </thead>

                            {
                                demandas.map(
                                    (item, index) => (
                                        <tbody>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <th scope="row">{item.id_usuarios.nome}</th>
                                                <td>{item.descricao}</td> {/* td: coluna*/}
                                                <td> {formataCategoria(item.categoria)}</td>
                                                <td><button>Cancelar</button> <button>Aceitar</button></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">{index + 1} </th>
                                                <th scope="row">{item.id_usuarios.nome}</th>
                                                <td>{item.descricao}</td>
                                                <td> {formataCategoria(item.categoria)} </td>
                                                <td><button>Cancelar</button> <button>Aceitar</button></td>

                                            </tr>
                                            <tr>

                                                <th scope="row">{index + 1}</th>
                                                <th scope="row">{item.id_usuarios.nome}</th>
                                                <td>{item.descricao}</td>
                                                <td> {formataCategoria(item.categoria)} </td>
                                                <td><button>Cancelar</button> <button>Aceitar</button></td>

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
            <div class="modal fade" id="exampleModal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h2 className="modal-title">Histórico</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div>
                                <table className="table table-success table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Categoria</th>
                                            <th scope="col">Visualização</th>

                                        </tr>
                                    </thead>
                                    {
                                        demandas.map((item, index) => (
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <th scope="row">{item.id_usuarios.nome}</th>
                                                    <td>{item.descricao}</td> {/* td: coluna*/}
                                                    <td> {formataCategoria(item.categoria)}</td>
                                                    <td><button>Cancelar</button> <button>Aceitar</button></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <th scope="row">{item.id_usuarios.nome}</th>
                                                    <td>{item.descricao}</td>
                                                    <td> {formataCategoria(item.categoria)} </td>
                                                    <td><button>Cancelar</button> <button>Aceitar</button></td>

                                                </tr>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <th scope="row">{item.id_usuarios.nome}</th>
                                                    <td>{item.descricao}</td>
                                                    <td> {formataCategoria(item.categoria)} </td>
                                                    <td><button>Cancelar</button> <button>Aceitar</button></td>

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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="exampleModal">
                                Fechar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* MODAL CRIAR  PORTIFÓLIO funciona*/}

            <div class="modal fade" id="exampleModal1" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel1">Novo portfólio</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={salvar}>

                                Descrição:
                                <br />
                                <input onChange={e => setDescricao(e.target.value)} />
                                <br />
                                Experiência:
                                <br />
                                <input onChange={e => setExperiencia(e.target.value)} />
                                <br />
                                Função:
                                <br />
                                <input onChange={e => setFuncao(e.target.value)} />

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-primary">Salvar</button>
                                </div>
                            </form>


                        </div>

                    </div>
                </div>
            </div>

        </div >
    )

}


