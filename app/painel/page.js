'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';
import { useRouter } from "next/navigation"
import "./painel.css"


export default function Painel() {

    if (typeof window === "undefined") return null

    const router = useRouter()

    // DADOS DO USUÁRIO PARA EDIÇÃO
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpfCnpj] = useState("")
    const [nascimento, setDataNascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [tipo, setTipo] = useState("")

    const [editando, setEditando] = useState(null)

    const [listaCategorias, alteraListaCategorias] = useState([])

    // DADOS DO PORTFÓLIO
    const [descricao, setDescricao] = useState("")
    const [historico, setHistorico] = useState("")
    const [funcao, setFuncao] = useState("")


    // DADOS DA DEMANDA
    const [titulo, setTitulo] = useState("");
    const [descricaoDemanda, setDescricaoDemanda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [localizacao, setLocalizacao] = useState("")
    const [demandas, setDemandas] = useState([]);

    // PESQUISA
    const [inputPesquisa, setInputPesuisa] = useState()

    const [propostas, setPropostas] = useState([])

    const [todasPropostas, setTodasPropostas] = useState([])
    const [todasDemandas, setTodasDemandas] = useState([])


    const id_usuario = localStorage.getItem("id_usuario")

    const [usuario, alteraUsuario] = useState(null)

    const [portfolio, alteraPortfolio] = useState(null)

    // RETIRAR DA TABELA
    const [ocultarIds, setOcultarIds] = useState(() => {
        try {
            const salvo = localStorage.getItem('itensOcultos');
            return salvo ? JSON.parse(salvo) : [];
        } catch {
            return [];
        }
    });

    const ocultarItem = (id) => {
        setOcultarIds(prev => {
            const atualizado = [...prev, id];
            localStorage.setItem('itensOcultos', JSON.stringify(atualizado));
            return atualizado;
        });
    };


    async function buscaCategorias() {
        const { data, error } = await supabase
            .from('categorias')
            .select()
        alteraListaCategorias(data)
    }

    async function buscaUsuario() {
        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario)

        alteraUsuario(data[0])

    }

    // CLIENTES
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

    async function buscarTodasDemandas() {

        const { data, error } = await supabase
            .from('demandas')
            .select(`*, 
                    id_usuario(
                    *) 
                `)
            .eq("id_usuario", id_usuario)
        setTodasDemandas(data)
    };

    // PRESTADORES
    async function buscarProposta() {

        const { data, error } = await supabase
            .from('propostas')
            .select(`*, 
                    id_usuario(
                    *) 
                `)
            .eq("id_usuario", id_usuario)
        setPropostas(data)
    };

    async function buscarTodasPropostas() {
        const { data, error } = await supabase
            .from('propostas')
            .select(`*, id_usuario(*)`)
            .eq("id_usuario", id_usuario)

        setTodasPropostas(data)
    }

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
        } else {
            alert("Dados inválidos. Verifique os campos e tente novamente.")

        }

    }

    async function salvarDemanda(e) {
        e.preventDefault()

        const demanda = {
            titulo: titulo,
            descricao: descricaoDemanda,
            id_categoria: categoria,
            id_usuario: id_usuario,
            localizacao: localizacao
        }

        // VALIDAÇÃO DE DADOS
        if (demanda.titulo.length < 5) {
            alert("Título muito curto")
            return
        }
        if (demanda.descricao.length < 10) {
            alert("Descrição muito curta")
            return
        }
        if (demanda.localizacao.length < 5) {
            alert("Localização muito curta")
            return
        }

        const { error } = await supabase
            .from('demandas')
            .insert(demanda);

        if (error == null) {
            alert("Demanda cadastrada com sucesso!")
            location.reload()
        } else {
            alert("Dados inválidos...")
        }




    }

    async function salvarPortfolio(e) {


        // VALIDAÇÃO DE DADOS

        e.preventDefault()
        const objeto = {
            descricao: descricao,
            funcao: funcao,
            historico: historico,
            id_usuario: id_usuario,
            categoria: categoria
        }

        if (objeto.descricao.length < 10) {
            alert("Descrição muito curta...")
            return
        }
        if (objeto.funcao.length < 3) {
            alert("Tipo muito curto...")
            return
        }
        if (objeto.historico.length < 10) {
            alert("Histórico de experiência muito curta...")
            return
        }


        if (portfolio == null) {
            const { data, error } = await supabase
                .from('servicos')
                .insert(objeto)

            if (error == null) {
                alert("Portfólio cadastrado com sucesso!")
                location.reload()
            } else {
                alert("Dados inválidos")
            }

        } else {
            delete objeto.id_usuario
            const { data, error } = await supabase
                .from('servicos')
                .update(objeto)
                .eq('id_usuario', id_usuario)

            if (error == null) {
                alert("Modificaçõs salvas com sucesso!")

            } else {
                alert("Dados inválidos")
            }

        }



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

    function cancelarEdicao() {
        setEditando(null)

        setNome("")
        setEmail("")
        setCpfCnpj("")
        setDataNascimento("")
        setTelefone("")
        setEndereco("")
        setSenha("")
    }

    async function atualizar() {

        const objeto = {
            nome: nome,
            email: email,
            cpf_cnpj: cpf,
            nascimento: nascimento,
            telefone: telefone,
            endereco: endereco,
            tipo: tipo
        }

        const { error } = await supabase
            .from('usuarios')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            alert("Atualização realizada com sucesso!!")
            cancelarEdicao()
            console.log(objeto)
        } else {
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

    async function buscaPortfolio() {
        const { data, error } = await supabase
            .from('servicos')
            .select()
            .eq('id_usuario', id_usuario)

        if (data == null || data.length <= 0)
            return

        const portfolio = data[0]

        setDescricao(portfolio.descricao)
        setHistorico(portfolio.historico)
        setFuncao(portfolio.funcao)

        alteraPortfolio(portfolio)

    }

    // FILTRAR DATAS DO PRESTADOR
    async function filtraData(ascending) {
        const { data, error } = await supabase
            .from('propostas')
            .select(`*, id_usuario(*)`)
            .order('created_at', { ascending: ascending })

        setPropostas(data)
    }

    // FILTROS INPUT
    async function pesquisa() {
        const { data, error } = await supabase
            .from('propostas')
            .select(`*, id_usuario(*)`)
            .ilike('descricao', '%' + inputPesquisa + "%")

        setPropostas(data)
    }

    useEffect(() => {
        buscaUsuario()
        buscarDemanda()
        buscarTodasDemandas()
        buscaPortfolio()
        buscaCategorias()
        buscarProposta()
        buscarTodasPropostas()
    }, [])

    return (

        <div className="painel-bg min-vh-100">
            {
                usuario == null ?
                    //location.href="/"
                    <div className="text-center mt-5"><p className="fs-5 text-muted">Faça <Link href="/login_usuarios" className="text-primary fw-bold text-decoration-none">login</Link> para continuar...</p></div>
                    :
                    <div className="container-fluid">

                        <div className="row">

                            <div className="col-12 col-md-2 menuLateral vh-100 d-flex flex-column justify-content-between py-4">
                                <div className="text-center mt-3">
                                    <img className="rounded-circle mb-3 shadow-sm border border-light border-3" src={"https://ui-avatars.com/api/?name=" + usuario.nome + "&background=random"} width="80" height="80" />
                                    <h1 className="fs-5 fw-bold text-dark"> {usuario.nome} </h1>
                                    <span className="badge rounded-pill text-bg-light text-secondary border">{usuario.tipo}</span>
                                </div>

                                <div className="list-group list-group-flush fs-6 mt-4 flex-grow-1">
                                    <Link href="/" className="list-group-item list-group-item-action d-flex align-items-center">
                                        <i className="bi bi-house-door me-3 fs-5"></i> Página inicial
                                    </Link>

                                    <button onClick={desconectar} className="list-group-item list-group-item-action text-danger d-flex align-items-center mt-auto">
                                        <i className="bi bi-box-arrow-right me-3 fs-5"></i> Sair
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Conteúdo principal --> */}
                            <div className="col-12 col-md-10 py-4 px-md-5">
                                {/* <!-- Introdução --> */}
                                <div className="card-custom p-4 mb-4 d-flex justify-content-between align-items-center bg-white">
                                    <div>
                                        <h2 className="mb-1 text-dark fw-bold fs-3">Painel Administrativo</h2>
                                        <p className="text-muted mb-0">Bem-vindo(a) de volta {usuario.nome},  gerencie suas informações abaixo.</p>
                                    </div>
                                    <div className="fs-1 text-primary opacity-25">
                                        <i className="bi bi-layout-text-window-reverse"></i>
                                    </div>
                                </div>

                                {/* <!-- Pesquisa e filtro --> */}
                                <div className="row mb-4 align-items-center">
                                    <div className="col-md-5">
                                        <div className="input-group">
                                            <input onChange={e => setInputPesuisa(e.target.value)} className="form-control form-control-custom input-pesquisa-custom" placeholder="Pesquisar..." />
                                            <button onClick={pesquisa} className="btn btn-primary px-4 btn-pesquisa-custom shadow-sm" >
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-3"></div> {/* Para criar espaço vazio entre as colunas*/}

                                    <div className="col-md-4">
                                        <select className="form-select form-control-custom shadow-sm"
                                            onChange={(e) => filtraData(e.target.value == "2")}
                                        >
                                            <option defaultValue={null}> Filtrar ordem </option>
                                            <option value="1"> Mais recentes </option>
                                            <option value="2"> Mais antigas </option>
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- Cadastro --> */}
                                <div className="d-flex justify-content-end mb-4 gap-2">

                                    {
                                        usuario.tipo == 'cliente' ?
                                            <button className="btn btn-primary btn-custom shadow-sm" data-bs-toggle="modal" data-bs-target="#modalDemanda">
                                                <i className="bi bi-plus-lg"></i> Criar Demanda
                                            </button>
                                            :
                                            <button type="button" className="btn btn-primary btn-custom shadow-sm" data-bs-toggle="modal" data-bs-target="#modalPortfolio">
                                                <i className="bi bi-briefcase"></i> Meu Portfólio
                                            </button>
                                    }

                                    <button className="btn btn-outline-secondary btn-custom bg-white shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="bi bi-clock-history"></i> Histórico
                                    </button>
                                    <button className="btn btn-dark btn-custom shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => editar(usuario)}>
                                        <i className="bi bi-person-gear"></i> Editar Dados
                                    </button>
                                </div>

                                {/* LISTA DE DEMANDAS EM ABERTO */}
                                {/* Tabela */}
                                <div className="table-responsive bg-white card-custom p-3 pb-0">
                                    <table className="table table-custom mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col">Categoria</th>
                                                <th scope="col" className="text-center">Ações</th>
                                            </tr>
                                        </thead>

                                        {
                                            usuario.tipo == 'cliente' ?

                                                demandas
                                                    .filter(item => !ocultarIds.includes(item.id))
                                                    .map(
                                                        (item, index) => (
                                                            <tbody key={item.id}>
                                                                <tr>
                                                                    <td className="fw-bold text-muted">{index + 1}</td>
                                                                    <td className="fw-semibold text-dark d-flex align-items-center gap-2">
                                                                        <img src={"https://ui-avatars.com/api/?name=" + item.id_usuario.nome + "&background=random"} width="30" height="30" className="rounded-circle" />
                                                                        {item.id_usuario.nome}
                                                                    </td>
                                                                    <td className="text-secondary text-truncate" style={{ maxWidth: "200px" }}>{item.descricao}</td>
                                                                    <td> {formataCategoria(item.categoria)}</td>
                                                                    <td className="text-center">
                                                                        <div className="btn-group shadow-sm">
                                                                            <button className="btn btn-sm btn-light border" title="Cancelar" onClick={() => ocultarItem(item.id)} >
                                                                                <i className="bi bi-x-circle text-danger"></i>
                                                                            </button>
                                                                            <button className="btn btn-sm btn-light border" title="Concluir" onClick={() => ocultarItem(item.id)} >
                                                                                <i className="bi bi-check-circle text-success"></i>
                                                                            </button>
                                                                            <button className="btn btn-sm btn-light border" title="Detalhes" onClick={() => router.push("/painel/" + item.id)}>
                                                                                <i className="bi bi-eye text-primary"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))

                                                :

                                                propostas
                                                    .filter(item => !ocultarIds.includes(item.id))
                                                    .map(
                                                        (item, index) => (
                                                            <tbody key={item.id}>
                                                                <tr>
                                                                    <td className="fw-bold text-muted">{index + 1}</td>
                                                                    <td className="fw-semibold text-dark d-flex align-items-center gap-2">
                                                                        <img src={"https://ui-avatars.com/api/?name=" + item.id_usuario.nome + "&background=random"} width="30" height="30" className="rounded-circle" />
                                                                        {item.id_usuario.nome}
                                                                    </td>
                                                                    <td className="text-secondary text-truncate" style={{ maxWidth: "200px" }}>{item.descricao}</td>
                                                                    <td> {formataCategoria(item.categoria)}</td>
                                                                    <td className="text-center">
                                                                        <div className="btn-group shadow-sm">
                                                                            <button className="btn btn-sm btn-light border" title="Cancelar" onClick={() => ocultarItem(item.id)} >
                                                                                <i className="bi bi-x-circle text-danger"></i>
                                                                            </button>
                                                                            <button className="btn btn-sm btn-light border" title="Concluir" onClick={() => ocultarItem(item.id)} >
                                                                                <i className="bi bi-check-circle text-success"></i>
                                                                            </button>
                                                                            <button className="btn btn-sm btn-light border" title="Detalhes" onClick={() => router.push("/painel/" + item.id_demanda)}>
                                                                                <i className="bi bi-eye text-primary"></i>
                                                                            </button>
                                                                        </div>
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
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content modal-content-custom">

                                    <div className="modal-header modal-header-custom align-items-center">
                                        <h5 className="modal-title fw-bold text-dark"><i className="bi bi-clock-history me-2 text-primary"></i>Histórico</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    <div className="modal-body modal-body-custom overflow-auto" style={{ maxHeight: '60vh' }}>
                                        <div className="table-responsive">
                                            <table className="table table-custom">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col">Descrição</th>
                                                        <th scope="col">Categoria</th>
                                                    </tr>
                                                </thead>

                                                {
                                                    usuario.tipo == 'cliente' ?

                                                        todasDemandas.map
                                                            ((item, index) => (
                                                                <tbody key={index}>
                                                                    <tr>
                                                                        <td className="fw-bold">{index + 1}</td>
                                                                        <td className="fw-semibold">{item.id_usuario.nome}</td>
                                                                        <td className="text-secondary">{item.descricao}</td>
                                                                        <td> {formataCategoria(item.categoria)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            ))
                                                        :
                                                        todasPropostas.map(
                                                            (item, index) => (
                                                                <tbody key={index}>
                                                                    <tr>
                                                                        <td className="fw-bold">{index + 1}</td>
                                                                        <td className="fw-semibold">{item.id_usuario.nome}</td>
                                                                        <td className="text-secondary">{item.descricao}</td>
                                                                        <td> {formataCategoria(item.categoria)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            ))

                                                }
                                            </table>
                                        </div>
                                    </div>

                                    <div className="modal-footer modal-footer-custom">
                                        <button type="button" className="btn btn-secondary btn-custom bg-light text-dark border-0 shadow-sm" data-bs-dismiss="modal">
                                            Fechar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* MODAL CRIAR  PORTIFÓLIO funciona*/}

                        <div className="modal fade" id="modalPortfolio" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content modal-content-custom">
                                    <div className="modal-header modal-header-custom align-items-center">
                                        <h5 className="modal-title fw-bold text-dark" id="exampleModalLabel1"><i className="bi bi-briefcase me-2 text-primary"></i>Meu Portfólio</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body modal-body-custom">
                                        <form onSubmit={salvarPortfolio} >

                                            {
                                                portfolio == null ?
                                                    <div className="alert alert-primary bg-primary bg-opacity-10 border-0 rounded-3 d-flex align-items-center">
                                                        <i className="bi bi-info-circle-fill text-primary me-3 fs-4"></i>
                                                        <div>Você ainda não tem um portfólio cadastrado.<br />Cadastre-se abaixo:</div>
                                                    </div>
                                                    :
                                                    <></>
                                            }

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Descrição:</label>
                                                <textarea rows="3" value={descricao} onChange={e => setDescricao(e.target.value)} className='form-control form-control-custom' placeholder="Fale um pouco sobre você..." />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Experiência:</label>
                                                <textarea rows="3" value={historico} onChange={e => setHistorico(e.target.value)} className='form-control form-control-custom' placeholder="Seu histórico profissional..." />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Função:</label>
                                                <input value={funcao} onChange={e => setFuncao(e.target.value)} className='form-control form-control-custom' placeholder="Ex: Pintor Automotivo" />
                                            </div>

                                            <div>
                                                <select className="form-select form-control-custom" onChange={(e) => setCategoria(Number(e.target.value))} >
                                                    <option> Selecione </option>
                                                    {
                                                        listaCategorias.map(
                                                            item => <option key={item.id} value={item.id} > {item.categoria} </option>
                                                        )
                                                    }
                                                </select>                                            </div>

                                            <div className="modal-footer modal-footer-custom px-0 pb-0 pt-3">
                                                <button type="button" className="btn btn-light btn-custom shadow-sm" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="submit" className="btn btn-primary btn-custom shadow-sm"><i className="bi bi-check2-circle"></i> Salvar</button>
                                            </div>

                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* MODAL PARA CRIAR UMA DEMANDA*/}

                        <div className="modal fade" id="modalDemanda" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content modal-content-custom">

                                    <div className="modal-header modal-header-custom align-items-center">
                                        <h5 className="modal-title fw-bold text-dark"><i className="bi bi-plus-circle me-2 text-primary"></i>Nova Demanda</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    <div className="modal-body modal-body-custom">
                                        <form id="formCadastro" onSubmit={salvarDemanda}>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Título</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-custom"
                                                    value={titulo}
                                                    onChange={(e) => setTitulo(e.target.value)}
                                                    placeholder="Ex: Reforma na cozinha"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Categoria</label>
                                                <select className="form-select form-control-custom" onChange={(e) => setCategoria(Number(e.target.value))} >
                                                    <option> Selecione </option>
                                                    {
                                                        listaCategorias.map(
                                                            item => <option key={item.id} value={item.id} > {item.categoria} </option>
                                                        )
                                                    }
                                                </select>

                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Descrição</label>
                                                <textarea
                                                    className="form-control form-control-custom"
                                                    rows="3"
                                                    value={descricaoDemanda}
                                                    onChange={(e) => setDescricaoDemanda(e.target.value)}
                                                    placeholder="Descreva com detalhes a sua necessidade..."
                                                ></textarea>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Localização</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white form-control-custom border-end-0 text-muted"><i className="bi bi-geo-alt"></i></span>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-custom border-start-0"
                                                        value={localizacao}
                                                        onChange={(e) => setLocalizacao(e.target.value)}
                                                        placeholder="Cidade, Bairro"
                                                    />
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                    <div className="modal-footer modal-footer-custom">
                                        <button type="button" className="btn btn-light btn-custom shadow-sm" data-bs-dismiss="modal">
                                            Fechar
                                        </button>

                                        <button type="submit" form="formCadastro" className="btn btn-primary btn-custom shadow-sm">
                                            <i className="bi bi-check2-circle"></i> Salvar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* MODAL EDIÇÃO DADOS */}

                        <div className="modal fade" id="exampleModal2" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content modal-content-custom">
                                    <div className="modal-header modal-header-custom align-items-center">
                                        <h5 className="modal-title fw-bold text-dark" id="exampleModalLabel2"><i className="bi bi-person-lines-fill me-2 text-primary"></i>Editar Dados</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body modal-body-custom">
                                        <form onSubmit={salvar}>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> Nome: </label>
                                                <input readOnly value={nome} onChange={e => setNome(e.target.value)} className="form-control form-control-custom bg-light" placeholder="Seu nome completo" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> E-mail: </label>
                                                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control form-control-custom" placeholder="seu@email.com" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> CPF ou CNPJ: </label>
                                                <input readOnly value={cpf} onChange={e => setCpfCnpj(e.target.value)} className="form-control form-control-custom bg-light" placeholder="00011122233" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> Data de Nascimento: </label>
                                                <input readOnly value={nascimento} onChange={e => setDataNascimento(e.target.value)} className="form-control form-control-custom bg-light" type="date" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> Telefone: </label>
                                                <input value={telefone} onChange={e => setTelefone(e.target.value)} className="form-control form-control-custom" placeholder="11999998888" type="tel" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider"> Endereço: </label>
                                                <input value={endereco} onChange={e => setEndereco(e.target.value)} className="form-control form-control-custom" placeholder="Rua, Bairro, Cidade" minLength="10" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold text-secondary small text-uppercase tracking-wider">Tipo:</label>
                                                <input value={tipo} onChange={e => setTipo(e.target.value)} className="form-control form-control-custom" />
                                            </div>

                                            <div className="modal-footer modal-footer-custom px-0 pb-0 pt-3">
                                                {
                                                    editando != null ?
                                                        <>
                                                            <button onClick={() => cancelarEdicao()} type="button" className="btn btn-light btn-custom shadow-sm" data-bs-dismiss="modal" >Cancelar</button>
                                                            <button onClick={() => atualizar()} type="button" className="btn btn-success btn-custom shadow-sm" data-bs-dismiss="modal"><i className="bi bi-arrow-clockwise"></i> Atualizar</button>
                                                        </>
                                                        :
                                                        <button className="btn btn-primary btn-custom shadow-sm w-100"><i className="bi bi-check2-circle"></i> Salvar</button>
                                                }
                                            </div>

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