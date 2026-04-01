'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';
import { useRouter } from "next/navigation"


export default function Painel(){

    const router = useRouter()

    // DADOS DO USUÁRIO PARA EDIÇÃO
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpfCnpj] = useState("")
    const [nascimento, setDataNascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [senha, setSenha] = useState("")

    const [editando, setEditando] = useState(null)

    const [listaCategorias, alteraListaCategorias] = useState([])

    // DADOS DO PORTFÓLIO
    const [descricao, setDescricao] = useState("")
    const [historico, setHistorico] = useState("")
    const [funcao, setFuncao] = useState("")
    const [id_usuarios, setIdUsuarios] = useState("")

    // DADOS DA DEMANDA
    const [titulo, setTitulo] = useState("");
    const [descricaoDemanda, setDescricaoDemanda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [localizacao, setLocalizacao] = useState("")
    const [demandas, setDemandas] = useState([]);

    const id_usuario = localStorage.getItem("id_usuario")

    const [ usuario, alteraUsuario ] = useState(null)
    const [ portfolio, alteraPortfolio ] = useState(null)

    async function buscaCategorias() {
        const { data, error } = await supabase
            .from('categorias')
            .select()
        alteraListaCategorias(data)
    }

    async function buscaUsuario(){
        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario)

            console.log("essa é a data")
            
            console.log(data[0])
        alteraUsuario(data[0])

    }

    async function buscarDemanda() {

        const { data, error } = await supabase
            .from('demandas')
            .select(`*, 
                    id_usuario(
                    *) 
                `)
            .eq("id_usuario", id_usuario)
        setDemandas(data)
    };

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            nome: nome,
            cpf_cnpj: cpf,
            nascimento: nascimento,
            telefone: telefone,
            endereco: endereco,
        
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

    async function salvarDemanda(e){
        e.preventDefault()
        
        const demanda = {
            titulo: titulo,
            descricao: descricaoDemanda,
            id_categoria: categoria,
            id_usuario: id_usuario,
            localizacao: localizacao
        }

        // VALIDAÇÃO DE DADOS
        if(demanda.titulo.length < 5){
            alert("Título muito curto")
            return
        }
        if(demanda.descricao.length < 10){
            alert("Descrição muito curta")
            return
        }
        if(demanda.localizacao.length < 5){
            alert("Localização muito curta")
            return
        }

        const { error } = await supabase
        .from('demandas')
        .insert(demanda);

        if(error == null){
            alert("Demanda cadastrada com sucesso!")
            location.reload()
        }else{
            alert("Dados inválidos...")
        }

        
        

    }

   async function salvarPortfolio(e){


        // VALIDAÇÃO DE DADOS

        e.preventDefault()
        const objeto = {
            descricao: descricao,
            funcao: funcao,
            historico: historico,
            id_usuario: id_usuario
        }

        if(objeto.descricao.length < 10){
            alert("Descrição muito curta...")
            return
        }
        if(objeto.funcao.length < 3){
            alert("Tipo muito curto...")
            return
        }
        if(objeto.historico.length < 10){
            alert("Histórico de experiência muito curta...")
            return
        }


        if(portfolio == null){
            const {data, error} = await supabase
            .from('servicos')
            .insert(objeto)

            if (error == null) {
                alert("Portfólio cadastrado com sucesso!")
            }else{
                alert("Dados inválidos")
            }

        }else{
            delete objeto.id_usuario
            const {data, error} = await supabase
            .from('servicos')
            .update(objeto)
            .eq('id_usuario', id_usuario)

            if (error == null) {
                alert("Modificaçõs salvas com sucesso!")
            }else{
                alert("Dados inválidos")
            }

        }

        location.reload()
        
    }

    function editar(usuario) {
        
        setEditando(usuario.id)

        setNome(usuario.nome)
        setEmail(usuario.email)
        setCpfCnpj(usuario.cpf_cnpj)
        setDataNascimento(usuario.nascimento)
        setTelefone(usuario.telefone)
        setEndereco(usuario.endereco)
        setSenha(usuario.senha)
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

    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("id_usuario")
        location.reload()
    }

    async function buscaPortfolio(){
        const { data, error } = await supabase
        .from('servicos')
        .select()
        .eq('id_usuario', id_usuario)

        if(data == null || data.length <= 0)
            return

        const portfolio = data[0]

        setDescricao(portfolio.descricao)
        setHistorico(portfolio.historico)
        setFuncao(portfolio.funcao)

        alteraPortfolio(portfolio)

    }

    useEffect(() => {
        buscaUsuario()
        buscarDemanda()
        buscaPortfolio()
        buscaCategorias()
    }, [])

    return(

 <div>
        {
            usuario == null ?
                <div className="text-center"><p>Faça <Link href="/login_usuarios">login</Link> para continuar...</p></div>
            :
                <div className="container-fluid">


                    <div className="row">

                        <div className="col-2 menuLateral vh-100 d-flex flex-column justify-content-between">
                            <div className="text-center mt-5">
                                <img class="rounded-circle mb-3" src={"https://ui-avatars.com/api/?name="+usuario.nome+"&background=random"} />
                                <h1 className="fs-5"> {usuario.nome} </h1>
                            </div>

                            <div className="list-group list-group-flush fs-5">
                                <Link href="/" className="list-group-item list-group-item-action">Página inicial</Link>
                                <Link href="listagem_demandas" className="list-group-item list-group-item-action">Todas as demandas</Link>
                                <Link href="propostas" className="list-group-item list-group-item-action">Porpostas</Link>
                                <button onClick={desconectar} className="list-group-item list-group-item-action">Desconectar</button>
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
                                <h2 className=" p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3 ">Painel administrativo {usuario.tipo} </h2>
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

                                
                                {
                                    usuario.tipo == 'cliente' ?
                                        <button className="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#modalDemanda">Criar Demanda</button>
                                    :
                                        <button type="button" className="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#modalPortfolio">Meu portfólio</button>
                                }

                                <button className="btn btn-outline-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Histórico</button>
                                <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal2"onClick={() => editar(usuario)}>Editar dados</button>
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
                                                        <th scope="row">{item.id_usuario.nome}</th>
                                                        <td>{item.descricao}</td> {/* td: coluna*/}
                                                        <td> {formataCategoria(item.categoria)}</td>
                                                        <td><button>Cancelar</button> 
                                                            <button onClick={() => location.href="/demanda/"+item.id} >Concluir</button> 
                                                            <button onClick={() => router.push("/painel/" + item.id)}>Detalhes</button>
                                                        </td>
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
                                                            <th scope="row">{item.id_usuario.nome}</th>
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

                    <div className="modal fade" id="modalPortfolio" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel1">Meu Portfólio</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={salvarPortfolio} >
                                        
                                        {
                                            portfolio == null ?
                                                <div class="alert alert-info">Você ainda não tem um portfólio cadastrado.<br/>Cadastre-se abaixo:</div>
                                            : 
                                                <></>
                                        }

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

                                    

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="submit" className="btn btn-primary">Salvar</button>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

                    {/* MODAL PARA CRIAR UMA DEMANDA*/}

                    <div className="modal fade" id="modalDemanda" tabIndex="-1">
                        <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                            <h5 className="modal-title">Nova Demanda</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                            <form id="formCadastro" onSubmit={salvarDemanda}>

                                <div className="mb-3">
                                <label className="form-label fw-bold">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                                </div>

                                <div className="mb-3">
                                <label className="form-label fw-bold">Categoria</label>
                                {/*<input
                                    type="text"
                                    className="form-control"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                />*/}

                                <select onChange={(e) => setCategoria(Number(e.target.value))} >
                                    <option> Selecione </option>

                                    {
                                        listaCategorias.map(
                                            item => <option value={item.id} > {item.categoria} </option>
                                        )
                                    }
                                </select>

                                </div>

                                <div className="mb-3">
                                <label className="form-label fw-bold">Descrição</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={descricaoDemanda}
                                    onChange={(e) => setDescricaoDemanda(e.target.value)}
                                ></textarea>
                                </div>

                                <div className="mb-3">
                                <label className="form-label fw-bold">Localização</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={localizacao}
                                    onChange={(e) => setLocalizacao(e.target.value)}
                                />
                                </div>


                            </form>
                            </div>

                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Fechar
                            </button>

                            <button type="submit" form="formCadastro" className="btn btn-primary">
                                Salvar
                            </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    
                    {/* MODAL EDIÇÃO DADOS */}

                    <div className="modal fade" id="exampleModal2" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel2">Editar Dados</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={salvar}>
                                        
                                        <p> Nome: </p>
                                        <input value={nome} onChange={e => setNome(e.target.value)} className="form-control" placeholder="Seu nome completo" />

                                        <p> E-mail: </p>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="seu@email.com" />
                                        
                                        <p> CPF ou CNPJ: </p>
                                        <input value={cpf} onChange={e => setCpfCnpj(e.target.value)} className="form-control" placeholder="00011122233" />
                                        
                                        <p> Data de Nascimento: </p>
                                        <input value={nascimento} onChange={e => setDataNascimento(e.target.value)} className="form-control" type="date" />
                                        
                                        <p> Telefone: </p>
                                        <input value={telefone} onChange={e => setTelefone(e.target.value)} className="form-control" placeholder="11999998888" type="tel" />
                                        
                                        <p> Endereço: </p>
                                        <input value={endereco} onChange={e => setEndereco(e.target.value)} className="form-control" placeholder="Rua, Bairro, Cidade" minLength="10" />
                                        
                                        <p>Senha:</p>
                                        <input value={senha} onChange={e => setSenha(e.target.value)} className="form-control" placeholder="Digite sua nova senha"/>


                                        {
                                            editando == null ?
                                                <div>
                                                    <br/>
                                                    <button onClick={() => atualizar()} className="btn btn-secondary me-2" data-bs-dismiss="modal">Atualizar</button>
                                                    <button onClick={ () => cancelarEdicao()} className="btn btn-primary">Cancelar</button>
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
        }
          
        </div>       

    )
}