'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import Link from "next/link"
import "./listagem_prestadores.css"

const supabase = createClient(
    "https://ynxzquxbnbdesqknhbte.supabase.co",
    "sb_publishable_NFhvutPRUhEg0xdbFhkflA_UV_NXWFu"
)

export default function ListagemPrestadores() {

    const [prestadores, setPrestadores] = useState([])
    const [userSelecionado, setUserSelecionado] = useState()
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)
    const [id_usuario, setIdUsuario] = useState(null)


    useEffect(() => {
        setIdUsuario(localStorage.getItem("id_usuario"));
        async function buscarPrestadores() {

            const { data, error } = await supabase
                .from("servicos")
                .select(`*,
          id_usuario(*), categoria(*)`)

            if (error) {
                console.log("Erro:", error)
            } else {
                setPrestadores(data)
            }

            console.log(data)
        }

        buscarPrestadores()
    }, [])




    async function filtrar(categoria) {

        let query = supabase
            .from("servicos")
            .select(`*, id_usuario(*), categoria(*)`)

        if (categoria) {
            query = query.eq("categoria", categoria)
            console.log(categoria)
        }

        const { data, error } = await query

        if (error) {
            console.log("Erro:", error)
        } else {
            setPrestadores(data)
        }

    }

    function formataData(data) {
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString()
        return data_formatada
    }


    return (
        <div className='container py-5 min-vh-100 font-sans'>

            <div className="text-center mb-5">
                <h2 className="fw-bold text-dark d-flex justify-content-center align-items-center gap-2">
                    <i className="bi bi-funnel text-primary"></i> Filtrar Prestadores
                </h2>
                <p className="text-muted">Escolha a categoria de serviço desejada</p>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
                <button className={`btn ${categoriaSelecionada === '1' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('1'); setCategoriaSelecionada('1') }}><i className="bi bi-hammer me-2"></i>Construção</button>
                <button className={`btn ${categoriaSelecionada === '2' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('2'); setCategoriaSelecionada('2') }}><i className="bi bi-house me-2"></i>Domésticos</button>
                <button className={`btn ${categoriaSelecionada === '6' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('6'); setCategoriaSelecionada('6') }}><i className="bi bi-tools me-2"></i>Reparos</button>
                <button className={`btn ${categoriaSelecionada === '7' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('7'); setCategoriaSelecionada('7') }}><i className="bi bi-laptop me-2"></i>Tecnologia</button>
                <button className={`btn ${categoriaSelecionada === '3' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('3'); setCategoriaSelecionada('3') }}><i className="bi bi-megaphone me-2"></i>Marketing</button>
                <button className={`btn ${categoriaSelecionada === '5' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('5'); setCategoriaSelecionada('5') }}><i className="bi bi-truck me-2"></i>Transporte</button>
                <button className={`btn ${categoriaSelecionada === '9' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('9'); setCategoriaSelecionada('9') }}><i className="bi bi-balloon me-2"></i>Eventos</button>
                <button className={`btn ${categoriaSelecionada === '8' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('8'); setCategoriaSelecionada('8') }}><i className="bi bi-book me-2"></i>Educação</button>
                <button className={`btn ${categoriaSelecionada === '4' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('4'); setCategoriaSelecionada('4') }}><i className="bi bi-heart-pulse me-2"></i>Saúde</button>
                <button className={`btn ${categoriaSelecionada === '13' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar('13'); setCategoriaSelecionada('13') }}><i className="bi bi-car-front me-2"></i>Automotivo</button>
                <button className={`btn ${categoriaSelecionada === null ? 'btn-dark' : 'btn-outline-dark'} rounded-pill px-4 shadow-sm`} onClick={() => { filtrar(null); setCategoriaSelecionada(null) }}><i className="bi bi-grid me-2"></i>Todos</button>
            </div>

            <section className="mb-5">
                <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">Lista de Prestadores</h3>

                <div className="row g-4">
                    {prestadores.length > 0 ? (
                        prestadores.map((prestador) => (
                            <div className="col-12 col-md-6 col-lg-4 d-flex" key={prestador.id}>
                                <div className="card w-100 shadow-sm border-0 rounded-4 d-flex flex-column h-100 p-4 bg-white" style={{ transition: 'all 0.3s ease' }}>
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${prestador.id_usuario.nome}&background=random`}
                                            className="rounded-circle shadow-sm"
                                            width="60"
                                            height="60"
                                            alt={prestador.id_usuario.nome}
                                        />
                                        <div>
                                            <h5 className="mb-0 fw-bold">{prestador.id_usuario.nome}</h5>
                                            <div className="text-warning small mt-1">
                                                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-light p-3 rounded-3 mb-4 border border-light">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Categoria</span>
                                            <strong className="fs-6 text-primary">{prestador.categoria?.categoria || "N/A"}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Função</span>
                                            <strong className="text-dark d-flex align-items-center">{prestador.funcao}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex-grow-1">
                                        <h6 className="fw-bold fs-6 text-dark mb-2">Descrição</h6>
                                        <p className="text-secondary small lh-base">{prestador.descricao}</p>
                                    </div>

                                    <div className="mt-auto pt-3 border-top border-light">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100 fw-bold rounded-pill d-flex align-items-center justify-content-center shadow-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalContato"
                                            onClick={() => setUserSelecionado(prestador)}
                                        >
                                            <i className="bi bi-person-lines-fill me-2 fs-5"></i> Contatos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 mt-4">
                            <div className="bg-white border-0 text-center py-5 shadow-sm rounded-4">
                                <div className="py-4">
                                    <div className="text-primary opacity-25 mb-3">
                                        <i className="bi bi-search" style={{ fontSize: "4rem" }}></i>
                                    </div>
                                    <h4 className="fw-bold text-dark">Ainda não há prestadores nessa categoria de serviço</h4>
                                    <p className="text-muted">Tente selecionar outra categoria no filtro acima.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Contato */}
            <div className="modal fade" id="modalContato" tabIndex="-1" aria-labelledby="modalContatoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="modal-header bg-dark text-white border-0 py-3">
                            <h5 className="modal-title fw-bold d-flex align-items-center" id="modalContatoLabel">
                                <i className="bi bi-info-circle-fill me-2"></i> Informações de Contato
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-4 bg-light">
                            {userSelecionado ? (
                                id_usuario != null ? (
                                    <div>
                                        <div className="d-flex align-items-center gap-3 mb-4 bg-white p-3 rounded-4 shadow-sm">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${userSelecionado.id_usuario?.nome}&background=random`}
                                                className="rounded-circle shadow-sm"
                                                width="65"
                                                height="65"
                                                alt={userSelecionado.id_usuario?.nome}
                                            />
                                            <div>
                                                <h4 className="mb-0 fw-bold">{userSelecionado.id_usuario?.nome}</h4>
                                                <span className="badge bg-primary rounded-pill mt-1">{userSelecionado.funcao}</span>
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="bg-white p-3 rounded-3 border border-light shadow-sm d-flex align-items-center gap-3">
                                                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                                        <i className="bi bi-envelope-fill fs-5"></i>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>E-mail</small>
                                                        <strong className="fs-6 text-dark">{userSelecionado.id_usuario?.email || "Email não disponível"}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="bg-white p-3 rounded-3 border border-light shadow-sm d-flex align-items-center gap-3">
                                                    <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                                                        <i className="bi bi-whatsapp fs-5"></i>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Telefone / WhatsApp</small>
                                                        <strong className="fs-6 text-dark">{userSelecionado.id_usuario?.telefone || "Não informado"}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-4 bg-white p-3 rounded-3 border border-light shadow-sm">
                                            <small className="text-muted d-block text-uppercase fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Descrição Completa</small>
                                            <p className="text-secondary small lh-base mb-0">{userSelecionado.descricao}</p>
                                        </div>

                                        <div className="text-end mt-3">
                                            <small className="text-muted">Membro desde {formataData(userSelecionado.id_usuario?.created_at || new Date())}</small>
                                        </div>
                                    </div>

                                ) : (
                                    <div className="text-center py-4">
                                        <div className="text-warning mb-3">
                                            <i className="bi bi-lock-fill" style={{ fontSize: "3rem" }}></i>
                                        </div>
                                        <h5 className="fw-bold text-black">Acesso Restrito</h5>
                                        <p className="text-muted mb-4 ">Você precisa estar logado para visualizar as informações de contato.</p>
                                        <button
                                            className="btn btn-primary rounded-pill px-4"
                                            data-bs-dismiss="modal"
                                            onClick={() => window.location.href = '/login_usuarios'}
                                        >
                                            Fazer Login
                                        </button>
                                    </div>
                                )
                            ) : (
                                <p className="text-center text-muted">Carregando informações...</p>
                            )}
                        </div>
                        <div className="modal-footer bg-white border-top-0 pt-0 pb-3 pe-3 rounded-bottom-4">
                            <button type="button" className="btn btn-secondary rounded-pill px-4 fw-semibold" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
