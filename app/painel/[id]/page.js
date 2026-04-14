'use client'

import supabase from "@/app/conexao/supabase";
import Propostas from "@/app/propostas/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../painel.css";

export default function ConsultaDemandas() {
    const params = useParams()
    const [demanda, setDemanda] = useState(null)
    const [proposta, setProposta] = useState([])
    const [propostaAceita, setPropostaAceita] = useState(null)
    const [propostasRecusadas, setPropostasRecusadas] = useState(new Set())
    const [loading, setLoading] = useState(false)

    async function buscaDemanda() {
        const { data, error } = await supabase
            .from('demandas')
            .select(`*, usuarios (*), categorias (*)`)
            .eq('id', Number(params.id))
            .single()

        if (error) { console.log(error); return }
        setDemanda(data)

        const resposta = await supabase
            .from('propostas')
            .select('*, id_usuario(*)')
            .eq('id_demanda', data.id)

        setProposta(resposta.data || [])

        // Verifica se já existe proposta aceita
        const aceita = resposta.data?.find(p => p.status === 'aceita')
        if (aceita) setPropostaAceita(aceita)

        const recusadas = new Set(
            resposta.data?.filter(p => p.status === 'recusada').map(p => p.id)
        )
        setPropostasRecusadas(recusadas)
    }

    async function aceitarProposta(propId) {
        setLoading(true)
        const prop = proposta.find(p => p.id === propId)

        // Atualiza status da demanda
        await supabase
            .from('demandas')
            .update({ status: 'em andamento' })
            .eq('id', demanda.id)

        // Marca proposta como aceita
        await supabase
            .from('propostas')
            .update({ status: 'aceita' })
            .eq('id', propId)

        setDemanda(prev => ({ ...prev, status: 'em andamento' }))
        setPropostaAceita(prop)
        setLoading(false)
    }

    async function recusarProposta(propId) {
        await supabase
            .from('propostas')
            .update({ status: 'recusada' })
            .eq('id', propId)

        setPropostasRecusadas(prev => new Set([...prev, propId]))
    }

    useEffect(() => {
        if (params?.id) buscaDemanda()
    }, [params])

    if (!demanda) return <p className="text-center mt-5">Carregando...</p>

    const temDecisao = propostaAceita !== null

    return (
        <div className="container py-5 min-vh-100">

            <div className="d-flex align-items-center mb-4 gap-3">
                <button className="btn btn-light shadow-sm btn-custom btn-sm rounded-circle d-flex align-items-center justify-content-center p-0" style={{width: '40px', height: '40px'}} onClick={() => window.history.back()}>
                    <i className="bi bi-arrow-left fs-5 m-0" style={{lineHeight: 0}}></i>
                </button>
                <h1 className="mb-0 fw-bold text-dark"><i className="bi bi-card-text text-primary me-3"></i>Detalhes da Demanda</h1>
            </div>

            {/* Card principal da demanda */}
            <div className="card-custom p-4 p-md-5 mb-5">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <h2 className="mb-0 fw-bold">{demanda.titulo}</h2>
                    <span className={`badge rounded-pill fs-6 px-3 py-2 fw-semibold shadow-sm ${
                        demanda.status === 'em andamento'
                            ? 'bg-primary'
                            : demanda.status === 'concluída'
                            ? 'bg-success'
                            : 'bg-secondary'
                    }`}>
                        {demanda.status}
                    </span>
                </div>

                <hr className="my-4 text-light" />
                <p className="text-secondary fs-5 lh-lg">{demanda.descricao}</p>
                <hr className="my-4 text-light" />

                <div className="row g-4 bg-light p-4 rounded-4 mx-0 shadow-sm border border-light">
                    <div className="col-md-4 d-flex gap-3 align-items-center">
                        <div className="bg-white p-3 rounded-circle shadow-sm text-primary fs-4 d-flex align-items-center justify-content-center" style={{width: '55px', height: '55px'}}><i className="bi bi-tags-fill"></i></div>
                        <div>
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.75rem', letterSpacing: '1px'}}>Categoria</small>
                            <strong className="fs-5 text-dark">{demanda.categorias?.categoria}</strong>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex gap-3 align-items-center">
                        <div className="bg-white p-3 rounded-circle shadow-sm text-primary fs-4 d-flex align-items-center justify-content-center" style={{width: '55px', height: '55px'}}><i className="bi bi-geo-alt-fill"></i></div>
                        <div>
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.75rem', letterSpacing: '1px'}}>Localização</small>
                            <strong className="fs-5 text-dark">{demanda.localizacao}</strong>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex gap-3 align-items-center">
                        <div className="bg-white p-3 rounded-circle shadow-sm text-primary fs-4 d-flex align-items-center justify-content-center" style={{width: '55px', height: '55px'}}><i className="bi bi-calendar-event-fill"></i></div>
                        <div>
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.75rem', letterSpacing: '1px'}}>Data</small>
                            <strong className="fs-5 text-dark">{new Date(demanda.created_at).toLocaleDateString('pt-BR')}</strong>
                        </div>
                    </div>
                </div>

                {/* Painel da proposta aceita — aparece dentro do card da demanda */}
                {propostaAceita && (
                    <div className="mt-5 p-4 rounded-4 border-0 bg-success bg-opacity-10 position-relative mt-4 shadow-sm">
                        <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 border border-success border-opacity-25" style={{pointerEvents: 'none'}}></div>
                        
                        <div className="d-flex align-items-center gap-2 mb-4 mt-2">
                            <span className="badge bg-success shadow-sm fs-6 px-3 py-2 rounded-pill"><i className="bi bi-check-circle-fill me-2"></i>Proposta aceita</span>
                        </div>
                        <div className="d-flex align-items-center gap-3 mb-4 bg-white p-3 rounded-4 shadow-sm mx-0">
                            <img
                                src={`https://ui-avatars.com/api/?name=${propostaAceita.id_usuario?.nome}&background=random`}
                                className="rounded-circle shadow-sm border border-2 border-white"
                                width="60" height="60"
                                alt={propostaAceita.id_usuario?.nome}
                            />
                            <div>
                                <h5 className="mb-1 fw-bold text-dark">{propostaAceita.id_usuario?.nome}</h5>
                                <div className="text-warning small fw-bold">
                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> 
                                    <span className="text-muted ms-2 fw-normal">4.8 | 120 serviços</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-4 shadow-sm">
                            <h6 className="fw-bold text-dark mb-3"><i className="bi bi-journal-text me-2 text-primary"></i>Descrição do profissional</h6>
                            <p className="mb-4 text-secondary lh-lg">{propostaAceita.descricao}</p>
                            
                            <div className="row g-3 bg-light p-3 rounded-3 mt-2 border border-light">
                                <div className="col-md-6 d-flex flex-column">
                                    <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Valor Acordado</small>
                                    <span className="fs-4 fw-bold text-success d-flex align-items-center"><i className="bi bi-currency-dollar me-1"></i>{propostaAceita.preco}</span>
                                </div>
                                <div className="col-md-6 d-flex flex-column border-start border-light ps-md-4">
                                    <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Prazo Final</small>
                                    <span className="fs-5 fw-bold text-dark d-flex align-items-center"><i className="bi bi-clock-history me-2 text-primary"></i>{propostaAceita.prazo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista de propostas */}
            <h3 className="mt-5 mb-4 fw-bold text-dark d-flex align-items-center"><i className="bi bi-inbox-fill text-primary me-3"></i>Propostas Recebidas</h3>

            <div className="row g-4 mb-5">
                {proposta.length > 0 ? (
                    proposta.map(item => {
                        const isAceita = propostaAceita?.id === item.id
                        const isRecusada = propostasRecusadas.has(item.id)
                        const bloqueado = temDecisao || isRecusada

                        return (
                            <div key={item.id} className="col-md-6 col-lg-4">
                                <div className={`card-custom p-4 h-100 d-flex flex-column position-relative overflow-hidden ${
                                    isAceita ? 'border border-success border-2 bg-success bg-opacity-10' : ''
                                } ${isRecusada ? 'opacity-50 grayscale bg-light' : 'bg-white'}`}>

                                    {/* Badge de status no topo */}
                                    {isAceita && (
                                        <div className="position-absolute top-0 end-0 bg-success text-white px-3 py-1 rounded-bottom-start shadow-sm fw-bold small">
                                            <i className="bi bi-check-circle-fill me-1"></i> Aceita
                                        </div>
                                    )}
                                    {isRecusada && (
                                        <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 rounded-bottom-start shadow-sm fw-bold small">
                                            <i className="bi bi-x-circle-fill me-1"></i> Recusada
                                        </div>
                                    )}

                                    <div className="d-flex align-items-center gap-3 mb-4 mt-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${item.id_usuario?.nome}&background=random`}
                                            className="rounded-circle shadow-sm"
                                            width="55" height="55"
                                            alt={item.id_usuario?.nome}
                                        />
                                        <div>
                                            <h5 className="mb-0 fw-bold">{item.id_usuario?.nome}</h5>
                                            <div className="text-warning small mt-1">
                                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-light p-3 rounded-3 mb-4 border border-light">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Valor</span>
                                            <strong className="fs-5 text-success d-flex align-items-center"><i className="bi bi-cash me-2 opacity-50"></i>{item.preco}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Prazo</span>
                                            <strong className="text-dark d-flex align-items-center"><i className="bi bi-clock me-2 text-primary opacity-75"></i>{item.prazo}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex-grow-1">
                                        <h6 className="fw-bold fs-6 text-dark mb-2">Detalhes da Proposta</h6>
                                        <p className="text-secondary small lh-base">{item.descricao}</p>
                                    </div>

                                    <div className="d-flex gap-2 mt-auto pt-3 border-top border-light">
                                        <button
                                            className="btn btn-success fw-bold d-flex flex-grow-1 align-items-center justify-content-center shadow-sm rounded-pill btn-custom"
                                            disabled={bloqueado || loading}
                                            onClick={() => aceitarProposta(item.id)}
                                        >
                                            {loading && !bloqueado ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : <i className="bi bi-check2 me-1 fs-5"></i>}
                                            {loading && !bloqueado ? 'Processando...' : 'Aceitar'}
                                        </button>
                                        <button
                                            className="btn btn-outline-danger shadow-sm rounded-circle d-flex align-items-center justify-content-center bg-white"
                                            style={{width: '44px', height: '44px', padding: 0}}
                                            disabled={bloqueado}
                                            onClick={() => recusarProposta(item.id)}
                                            title="Recusar"
                                        >
                                            <i className="bi bi-x-lg m-0" style={{lineHeight: 0}}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="col-12 mt-2">
                        <div className="card-custom bg-white border-0 text-center py-5 shadow-sm">
                            <div className="py-5">
                                <div className="text-primary opacity-25 mb-4">
                                    <i className="bi bi-inbox-fill" style={{fontSize: "5rem"}}></i>
                                </div>
                                <h4 className="fw-bold text-dark mb-2">Você ainda não tem propostas</h4>
                                <p className="text-muted fs-6">As propostas enviadas pelos prestadores de serviço aparecerão aqui de forma <br /> organizada para que você possa avaliar e tomar sua decisão.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}