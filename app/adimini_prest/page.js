'use client'
import { createClient } from '@supabase/supabase-js'
// postgresql://postgres:[OBok2BcuYLAUGKj3]@db.ynxzquxbnbdesqknhbte.supabase.co:5432/postgres
import Link from "next/link";
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';

export default function AdiminiPrest() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpfCnpj] = useState("")
    const [nascimento, setDataNascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [senha, setSenha] = useState("")

    const [editando, setEditando] = useState(null)

    const [descricao, setDescricao] = useState("")
    const [historico, setHistorico] = useState("")
    const [funcao, setFuncao] = useState("")
    const [id_usuarios, setIdUsuarios] = useState("")

    const [demandas, setDemandas] = useState([])

    async function buscarDemanda() {

        const { data, error } = await supabase
            .from('demandas')
            .select(`*, 
                    id_usuarios(
                    *) 
                `)
        console.log(data)
        setDemandas(data)
    };

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            nome: nome,
            email: email,
            cpf_cnpj: cpf,
            nascimento: nascimento,
            telefone: telefone,
            endereco: endereco,
            senha: senha
        }
        const { error } = await supabase
        .from('usuarios')
        .insert(objeto)

        console.log(error)

        if (error == null) {
            alert("Usuario cadastrado com sucesso")
        }else {
            alert("Dados inválidos. Verifique os campos e tente novamente.")

        }

    }

   async function salvarPortfolio(e){
        e.preventDefault()
        const objeto = {
            
            descricao: descricao,
            funcao: funcao,
            historico: historico,
            id_usuarios: id_usuarios
        }
        const {data, error} = await supabase
        .from('servicos')
        .insert(objeto)
        console.log(data)

        console.log(error)
        if (error == null) {
            alert("Portfólio cadastrado com sucesso")
        }else{
            alert("Dados inválidos")
        }
    }

    function editar(objeto) {
        
        setEditando(objeto.id)

        setNome(objeto.nome)
        setEmail(objeto.email)
        setCpfCnpj(objeto.cpf_cnpj)
        setDataNascimento(objeto.nascimento)
        setTelefone(objeto.telefone)
        setEndereco(objeto.endereco)
        setSenha(objeto.senha)
    }

    function cancelarEdicao(){
        setEditando(null)

        setNome("")
        setEmail("")
        setCpfCnpj("")
        setDataNascimento("")
        setTelefone("")
        setEndereco("")
        setSenha("")
    }

    async function atualizar(){

        const objeto ={
            nome: nome,
            email: email,
            cpf_cnpj: cpf,
            nascimento: nascimento,
            telefone: telefone,
            endereco: endereco,
            senha: senha
        }

        const { error } = await supabase
        .from('usuarios')
        .update(objeto)
        .eq('id', editando)

        if(error == null){
            alert("Atualização realizada com sucesso!!")
            cancelarEdicao()
        }else{
            alert("Dados inválidos. Verifique os campos e tente novamente")
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
                        <Link href="/" className="list-group-item list-group-item-action">Página inicial</Link>
                        <Link href="listagem_demandas" className="list-group-item list-group-item-action">Todas as demandas</Link>
                        <Link href="propostas" className="list-group-item list-group-item-action">Porpostas</Link>
                   </div>


                    {/* <div className="text-center menuLateralPerfil ">
                        <img className="me-2" src="https://placehold.co/40" />
                        <div>
                            <button type="button" >Editar</button>
                        </div>

                    </div> */}
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
                        <button type="button" class="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                            Criar portfólio
                        </button>
                        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal2"onClick={() => editar(objeto)}>Editar dados</button>
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
                                                <td><button>Cancelar</button> <button onClick={() => location.href="/demanda/"+item.id} >Concluir</button></td>
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

            <div className="modal fade" id="exampleModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel1">Novo portfólio</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={salvarPortfolio} >
                                
                                ID:
                                <br />
                                <input value={id_usuarios} onChange={e => setIdUsuarios(e.target.value)} className='form-control' />
                                <br />
                                Descrição:
                                <br />
                                <input value={descricao} onChange={e => setDescricao(e.target.value)}  className='form-control' />
                                <br />
                                Experiência:
                                <br />
                                <input value={historico} onChange={e => setHistorico(e.target.value)}  className='form-control' />
                                <br />
                                Função:
                                <br />
                                <input value={funcao}  onChange={e => setFuncao(e.target.value)} className='form-control' />

                               

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-primary">Salvar</button>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
            
            {/* MODAL EDIÇÃO DADOS */}

             <div class="modal fade" id="exampleModal2" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel2">Editar Dados</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={salvar}>
                                
                                <p> Nome: </p>
                                <input value={nome} onChange={e => setNome(e.target.value)} class="form-control" placeholder="Seu nome completo" />

                                <p> E-mail: </p>
                                <input value={email} onChange={e => setEmail(e.target.value)} class="form-control" placeholder="seu@email.com" />
                                
                                <p> CPF ou CNPJ: </p>
                                <input value={cpf} onChange={e => setCpfCnpj(e.target.value)} class="form-control" placeholder="00011122233" />
                                
                                <p> Data de Nascimento: </p>
                                <input value={nascimento} onChange={e => setDataNascimento(e.target.value)} class="form-control" type="date" />
                                
                                <p> Telefone: </p>
                                <input value={telefone} onChange={e => setTelefone(e.target.value)} class="form-control" placeholder="11999998888" type="tel" />
                                
                                <p> Endereço: </p>
                                <input value={endereco} onChange={e => setEndereco(e.target.value)} class="form-control" placeholder="Rua, Bairro, Cidade" minlength="10" />
                                
                                <p>Senha:</p>
                                <input value={senha} onChange={e => setSenha(e.target.value)} class="form-control" placeholder="Digite sua nova senha"/>


                                {
                                    editando == null ?
                                        <div>
                                            <br/>
                                            <button onClick={() => atualizar()} class="btn btn-secondary me-2" data-bs-dismiss="modal">Atualizar</button>
                                            <button onClick={ () => cancelarEdicao()} class="btn btn-primary">Cancelar</button>
                                        </div>
                                    :
                                        <button>Salvar</button>
                                }

            
                            

                            </form>


                        </div>

                    </div>
                </div>
            </div>
            

        </div >
    )

}