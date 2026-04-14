'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import Link from "next/link"
import "./listagem_demandas.css"
import Swal from 'sweetalert2'

const supabase = createClient(
  "https://ynxzquxbnbdesqknhbte.supabase.co",
  "sb_publishable_NFhvutPRUhEg0xdbFhkflA_UV_NXWFu"
)





export default function ListagemDemandas() {

  const [demandas, setDemandas] = useState([])
  const [userSelecionado, setUserSelecionado] = useState(null)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)

  const [precoProposta, setPrecoProposta] = useState("")
  const [descricaoProposta, setDescricaoProposta] = useState("")
  const [prazoProposta, setPrazoProposta] = useState("")

  const [usuario, alteraUsuario] = useState(null)

  const [proposta, setProposta] = useState("")





  async function buscarDemanda() {

    //  PEGA USUÁRIO LOGADO
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.log("Erro usuário:", userError)
    } else {
      console.log("EMAIL:", userData.user?.email)
    }

    // BUSCA DEMANDAS
    const { data: demandasData, error: demandasError } = await supabase
      .from('demandas')
      .select(`*, 
      id_usuario(*), id_categoria(*) 
      `)
    console.log("DEMANDAS:", demandasData)
    console.log("ERRO DEMANDAS:", demandasError)

    if (demandasError) {
      console.log("Error", demandasError)
    } else {
      setDemandas(demandasData)
    }
  }

  async function enviarProposta() {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (!precoProposta || !prazoProposta || !descricaoProposta) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Preencha todos os campos da proposta.',
            confirmButtonColor: '#0d6efd'
        });
        return;
    }

    const objProposta = {
      id_usuario: userData.user.id,
      id_demanda: userSelecionado.id,
      preco: precoProposta,
      prazo: prazoProposta,
      descricao: descricaoProposta,
    }

    const { data, error } = await supabase
      .from('propostas')
      .insert(objProposta)

    if (error) {
      console.log(error)
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao enviar proposta',
          confirmButtonColor: '#dc3545'
      });
    } else {
      Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Enviado com sucesso',
          confirmButtonColor: '#198754',
          timer: 2000
      }).then(() => {
          // Fechar modal atual
          const modalEl = document.getElementById('modalProposta');
          const modal = window.bootstrap.Modal.getInstance(modalEl);
          if (modal) {
              modal.hide();
          }
          // Limpa campos
          setPrecoProposta("");
          setPrazoProposta("");
          setDescricaoProposta("");
      });
    }
  }

  // FILTRA USUARIOS POR CATEGORIA
  async function filtrar(categoria) {

    let query = supabase
      .from("demandas")
      .select(`*, id_usuario(*), id_categoria(*)`)

    if (categoria) {
      query = query.eq("id_categoria", categoria)
      console.log("esse é o id da categoria" + categoria)
    }

    const { data, error } = await query

    if (error) {
      console.log("Erro:", error)
    } else {
      setDemandas(data)
    }

  }


  // ARRUMA A DATA
  function formataData(data) {
    let data_formatada = new Date(data)
    data_formatada = data_formatada.toLocaleDateString()
    return data_formatada
  }

  // ARRUMA O HORARIO
  function formataHoras(horas) {
    let horas_formatadas = new Date(horas)
    horas_formatadas = horas_formatadas.toLocaleTimeString()
    return horas_formatadas
  }



  useEffect(() => {

    async function pegarUsuario() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        alteraUsuario(data.user)
      }
    }

    buscarDemanda()
    pegarUsuario()
  }, [])




  return (
    <div>
      {
        usuario == null ?
          <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center font-sans">
             <div className="card shadow-sm border-0 rounded-4 p-5 text-center bg-white" style={{maxWidth: '500px'}}>
                 <i className="bi bi-person-lock text-primary mb-4" style={{fontSize: '4rem'}}></i>
                 <h3 className="fw-bold text-dark mb-3">Acesso Restrito</h3>
                 <p className="text-secondary mb-4">Faça login para visualizar as demandas disponíveis e enviar suas propostas.</p>
                 <Link href="/login_usuarios" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm">Entrar na minha conta</Link>
             </div>
          </div>
          :
          <div className='container py-5 min-vh-100 font-sans'>
        
            <div className="text-center mb-5">
                <h2 className="fw-bold text-dark d-flex justify-content-center align-items-center gap-2">
                    <i className="bi bi-funnel text-primary"></i> Filtrar Demandas
                </h2>
                <p className="text-muted">Escolha a categoria para encontrar a demanda ideal</p>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
                <button className={`btn ${categoriaSelecionada === '1' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('1'); setCategoriaSelecionada('1')}}><i className="bi bi-hammer me-2"></i>Construção</button>
                <button className={`btn ${categoriaSelecionada === '2' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('2'); setCategoriaSelecionada('2')}}><i className="bi bi-house me-2"></i>Domésticos</button>
                <button className={`btn ${categoriaSelecionada === '6' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('6'); setCategoriaSelecionada('6')}}><i className="bi bi-tools me-2"></i>Reparos</button>
                <button className={`btn ${categoriaSelecionada === '7' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('7'); setCategoriaSelecionada('7')}}><i className="bi bi-laptop me-2"></i>Tecnologia</button>
                <button className={`btn ${categoriaSelecionada === '3' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('3'); setCategoriaSelecionada('3')}}><i className="bi bi-megaphone me-2"></i>Marketing</button>
                <button className={`btn ${categoriaSelecionada === '5' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('5'); setCategoriaSelecionada('5')}}><i className="bi bi-truck me-2"></i>Transporte</button>
                <button className={`btn ${categoriaSelecionada === '9' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('9'); setCategoriaSelecionada('9')}}><i className="bi bi-balloon me-2"></i>Eventos</button>
                <button className={`btn ${categoriaSelecionada === '8' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('8'); setCategoriaSelecionada('8')}}><i className="bi bi-book me-2"></i>Educação</button>
                <button className={`btn ${categoriaSelecionada === '4' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('4'); setCategoriaSelecionada('4')}}><i className="bi bi-heart-pulse me-2"></i>Saúde</button>
                <button className={`btn ${categoriaSelecionada === '13' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar('13'); setCategoriaSelecionada('13')}}><i className="bi bi-car-front me-2"></i>Automotivo</button>
                <button className={`btn ${categoriaSelecionada === null ? 'btn-dark' : 'btn-outline-dark'} rounded-pill px-4 shadow-sm`} onClick={() => {filtrar(null); setCategoriaSelecionada(null)}}><i className="bi bi-grid me-2"></i>Todos</button>
            </div>

            <section className="mb-5">
                <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">Demandas em Aberto</h3>

                <div className="row g-4">
                    {demandas.length > 0 ? (
                        demandas.map((demanda) => (
                            <div className="col-12 col-md-6 col-lg-4 d-flex" key={demanda.id}>
                                <div className="card w-100 shadow-sm border-0 rounded-4 d-flex flex-column h-100 p-4 bg-white" style={{transition: 'all 0.3s ease'}}>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${demanda.id_usuario.nome}&background=random`}
                                                className="rounded-circle shadow-sm"
                                                alt={demanda.id_usuario.nome}
                                                width="50" height="50"
                                            />
                                            <div>
                                                <h6 className="mb-0 fw-bold">{demanda.id_usuario.nome}</h6>
                                                <small className="text-muted">{formataData(demanda.created_at)}</small>
                                            </div>
                                        </div>
                                        <span className={`badge rounded-pill ${demanda.status === 'em andamento' ? 'bg-primary' : demanda.status === 'concluída' ? 'bg-success' : 'bg-secondary'} small shadow-sm`}>{demanda.status}</span>
                                    </div>

                                    <h5 className="fw-bold text-dark mb-3 mt-1">{demanda.titulo}</h5>

                                    <div className="bg-light p-3 rounded-3 mb-4 border border-light">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Categoria</span>
                                            <strong className="fs-6 text-primary">{demanda.id_categoria?.categoria || "N/A"}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex-grow-1">
                                        <h6 className="fw-bold fs-6 text-dark mb-2">Descrição</h6>
                                        <p className="text-secondary small lh-base">{demanda.descricao}</p>
                                    </div>

                                    <div className="mt-auto pt-3 border-top border-light">
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100 fw-bold rounded-pill d-flex align-items-center justify-content-center shadow-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => setUserSelecionado(demanda)}
                                      >
                                        <i className="bi bi-eye-fill me-2 fs-5"></i> Ver Demanda
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
                                        <i className="bi bi-search" style={{fontSize: "4rem"}}></i>
                                    </div>
                                    <h4 className="fw-bold text-dark">Ainda não há demandas nessa categoria</h4>
                                    <p className="text-muted">Tente selecionar outra categoria no filtro acima.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Info Demanda */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="modal-header bg-primary text-white border-0 py-3">
                    <h5 className="modal-title fw-bold d-flex align-items-center" id="exampleModalLabel">
                        <i className="bi bi-card-checklist me-2"></i> Detalhes da Demanda
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body p-4 bg-light">
                    {userSelecionado ? (
                      <div>
                        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border border-light">
                            <h4 className="fw-bold text-dark mb-3">{userSelecionado.titulo}</h4>
                            <span className="badge bg-primary rounded-pill mb-3">{userSelecionado.id_categoria?.categoria}</span>
                            <p className="text-secondary small lh-base">{userSelecionado.descricao}</p>
                        </div>
                        
                        <h6 className="fw-bold text-dark mb-3 px-1">Informações do Cliente</h6>
                        
                        <div className="row g-3">
                            <div className="col-12">
                                <div className="bg-white p-3 rounded-3 border border-light shadow-sm d-flex align-items-center gap-3">
                                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px'}}>
                                        <i className="bi bi-person-fill fs-5"></i>
                                    </div>
                                    <div>
                                        <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Nome</small>
                                        <strong className="fs-6 text-dark">{userSelecionado.id_usuario?.nome}</strong>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-12">
                                <div className="bg-white p-3 rounded-3 border border-light shadow-sm d-flex align-items-center gap-3">
                                    <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px'}}>
                                        <i className="bi bi-whatsapp fs-5"></i>
                                    </div>
                                    <div>
                                        <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Telefone / WhatsApp</small>
                                        <strong className="fs-6 text-dark">{userSelecionado.id_usuario?.telefone || "Não especificado"}</strong>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted">Carregando detalhes...</p>
                    )}
                  </div>
                  <div className="modal-footer bg-white border-top-0 pt-0 pb-3 pe-3 rounded-bottom-4 d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4 fw-semibold" data-bs-dismiss="modal">Fechar</button>
                    <button
                      type="button"
                      className="btn btn-success fw-bold rounded-pill px-4 shadow-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modalProposta">
                      <i className="bi bi-send-fill me-2"></i> Enviar Proposta
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Enviar Proposta */}
            <div className="modal fade" id="modalProposta" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="modal-header bg-success text-white border-0 py-3">
                    <h5 className="modal-title fw-bold d-flex align-items-center">
                        <i className="bi bi-currency-dollar me-1 fs-4"></i> Enviar Proposta
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body p-4 bg-white">
                    <div className="mb-4">
                      <label className="form-label fw-bold text-dark small text-uppercase" style={{letterSpacing: '0.5px'}}>Preço Ofertado (R$)</label>
                      <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                        <span className="input-group-text border-0 bg-light"><i className="bi bi-cash text-success"></i></span>
                        <input type="text" className="form-control border-0 bg-light fw-semibold" placeholder="Ex: R$ 500,00" value={precoProposta} onChange={e => setPrecoProposta(e.target.value)} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold text-dark small text-uppercase" style={{letterSpacing: '0.5px'}}>Prazo de Entrega</label>
                      <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                        <span className="input-group-text border-0 bg-light"><i className="bi bi-clock-history text-primary"></i></span>
                        <input type="text" className="form-control border-0 bg-light fw-semibold" placeholder="Ex: 3 dias úteis" value={prazoProposta} onChange={e => setPrazoProposta(e.target.value)} />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-bold text-dark small text-uppercase" style={{letterSpacing: '0.5px'}}>Detalhes da Proposta</label>
                      <textarea className="form-control shadow-sm border-0 bg-light rounded-3 p-3" rows="4" placeholder="Descreva como você executará o serviço e o que está incluso no valor..." value={descricaoProposta} onChange={e => setDescricaoProposta(e.target.value)}></textarea>
                    </div>
                  </div>

                  <div className="modal-footer bg-light border-top-0 py-3 rounded-bottom-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill px-4 fw-semibold"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        const modal = new window.bootstrap.Modal(
                          document.getElementById('exampleModal')
                        );
                        modal.show();
                      }}
                    >
                      Voltar aos Detalhes
                    </button>
                    <button type="button" className="btn btn-success fw-bold rounded-pill px-4 shadow-sm" onClick={enviarProposta}>
                      <i className="bi bi-check-circle-fill me-2"></i> Confirmar Envio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
