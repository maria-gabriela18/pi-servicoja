'use client'

import supabase from "@/app/conexao/supabase";
import Propostas from "@/app/propostas/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="container mt-5 mb-5">

            <h1 className="mb-4">Detalhes da Demanda</h1>

            {/* Card principal da demanda */}
            <div className="card p-4 shadow-sm border-0 rounded-3">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <h2 className="mb-0">{demanda.titulo}</h2>
                    <span className={`badge fs-6 px-3 py-2 ${
                        demanda.status === 'em andamento'
                            ? 'bg-primary'
                            : demanda.status === 'concluída'
                            ? 'bg-success'
                            : 'bg-secondary'
                    }`}>
                        {demanda.status}
                    </span>
                </div>

                <hr />
                <p className="text-secondary">{demanda.descricao}</p>
                <hr />

                <div className="row g-3">
                    <div className="col-md-4">
                        <small className="text-muted d-block">Categoria</small>
                        <strong>{demanda.categorias?.categoria}</strong>
                    </div>
                    <div className="col-md-4">
                        <small className="text-muted d-block">Localização</small>
                        <strong>{demanda.localizacao}</strong>
                    </div>
                    <div className="col-md-4">
                        <small className="text-muted d-block">Data</small>
                        <strong>{new Date(demanda.created_at).toLocaleDateString('pt-BR')}</strong>
                    </div>
                </div>

                {/* Painel da proposta aceita — aparece dentro do card da demanda */}
                {propostaAceita && (
                    <div className="mt-4 p-4 rounded-3 border border-success bg-success bg-opacity-10">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="badge bg-success fs-6 px-3 py-2">Proposta aceita</span>
                        </div>
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <img
                                src="https://placehold.co/50x50"
                                className="rounded-circle"
                                alt={propostaAceita.id_usuario?.nome}
                            />
                            <div>
                                <h5 className="mb-0">{propostaAceita.id_usuario?.nome}</h5>
                                <small className="text-muted">⭐ 4.8 | 120 serviços</small>
                            </div>
                        </div>
                        <p className="mb-3 text-secondary">{propostaAceita.descricao}</p>
                        <div className="row g-3">
                            <div className="col-auto">
                                <small className="text-muted d-block">Valor acordado</small>
                                <span className="fs-4 fw-semibold text-success">{propostaAceita.preco}</span>
                            </div>
                            <div className="col-auto">
                                <small className="text-muted d-block">Prazo</small>
                                <span className="fs-5 fw-semibold">{propostaAceita.prazo}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista de propostas */}
            <h3 className="mt-5 mb-3">Propostas Recebidas</h3>
            <hr />

            <div className="row g-3">
                {proposta.map(item => {
                    const isAceita = propostaAceita?.id === item.id
                    const isRecusada = propostasRecusadas.has(item.id)
                    const bloqueado = temDecisao || isRecusada

                    return (
                        <div key={item.id} className="col-md-4">
                            <div className={`card p-3 h-100 shadow-sm border-0 rounded-3 ${
                                isAceita ? 'border border-success border-2' : ''
                            } ${isRecusada ? 'opacity-50' : ''}`}>

                                {/* Badge de status no topo */}
                                {isAceita && (
                                    <div className="alert alert-success py-2 px-3 mb-3 rounded-2">
                                        <small><strong>Proposta aceita</strong></small>
                                    </div>
                                )}
                                {isRecusada && (
                                    <div className="alert alert-danger py-2 px-3 mb-3 rounded-2">
                                        <small><strong>Proposta recusada</strong></small>
                                    </div>
                                )}

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <img
                                        src="https://placehold.co/50x50"
                                        className="rounded-circle"
                                        alt={item.id_usuario?.nome}
                                    />
                                    <div>
                                        <h5 className="mb-0">{item.id_usuario?.nome}</h5>
                                        <small className="text-muted">⭐ 4.8 | 120 serviços</small>
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex gap-4 mb-3">
                                    <div>
                                        <small className="text-muted d-block">Valor</small>
                                        <strong className="fs-5">{item.preco}</strong>
                                    </div>
                                    <div>
                                        <small className="text-muted d-block">Prazo</small>
                                        <strong>{item.prazo}</strong>
                                    </div>
                                </div>

                                <p className="text-secondary small flex-grow-1">{item.descricao}</p>

                                <hr />

                                <div className="d-flex gap-2 mt-auto">
                                    <button
                                        className="btn btn-success w-100"
                                        disabled={bloqueado || loading}
                                        onClick={() => aceitarProposta(item.id)}
                                    >
                                        {loading ? 'Salvando...' : 'Aceitar'}
                                    </button>
                                    <button
                                        className="btn btn-outline-danger w-100"
                                        disabled={bloqueado}
                                        onClick={() => recusarProposta(item.id)}
                                    >
                                        Recusar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}