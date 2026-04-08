'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import Link from "next/link"
import "./listagem_demandas.css"

const supabase = createClient(
  "https://ynxzquxbnbdesqknhbte.supabase.co",
  "sb_publishable_NFhvutPRUhEg0xdbFhkflA_UV_NXWFu"
)





export default function ListagemDemandas() {

  const [demandas, setDemandas] = useState([])
  const [userSelecionado, setUserSelecionado] = useState()

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
      alert("Erro ao enviar proposta")
    } else {
      alert("Proposta enviada com sucesso!")

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
          <div className="text-center"><p>Faça <Link href="/login_usuarios">login</Link> para continuar...</p></div>
          :
          <div>

            <section className="categoria">

              <div className='divFiltrar'>
                <h3><i className="bi bi-funnel"></i> Filtrar</h3>

                <label>Demandas:</label>
                <div className='divFiltrarBotoes'>
                  <div>
                    <button onClick={() => filtrar('1')}>
                      <i className="bi bi-hammer"></i> Construção e Reforma
                    </button>

                    <button onClick={() => filtrar('2')}>
                      <i className="bi bi-house"></i> Serviços Domésticos
                    </button>

                    <button onClick={() => filtrar('6')}>
                      <i className="bi bi-tools"></i> Manutenção e Reparos
                    </button>

                    <button onClick={() => filtrar('7')}>
                      <i className="bi bi-laptop"></i> Tecnologia e Informática
                    </button>

                    <button onClick={() => filtrar('3')}>
                      <i className="bi bi-megaphone"></i> Marketing e Vendas
                    </button>

                    <button onClick={() => filtrar('5')}>
                      <i className="bi bi-truck"></i> Transporte e Logística
                    </button>
                  </div>

                  <div>
                    <button onClick={() => filtrar('9')}>
                      <i className="bi bi-balloon"></i> Eventos e Festas
                    </button>

                    <button onClick={() => filtrar('8')}>
                      <i className="bi bi-book"></i> Educação e Aulas
                    </button>

                    <button onClick={() => filtrar('4')}>
                      <i className="bi bi-heart-pulse"></i> Saúde e Cuidados
                    </button>

                    <button onClick={() => filtrar('13')}>
                      <i className="bi bi-car-front"></i> Serviços Automotivos
                    </button>

                    <button onClick={() => filtrar(null)}>
                      <i className="bi bi-grid"></i> Todos
                    </button>
                  </div>
                </div>
              </div>




              <h2 className="categoria-titulo">Demandas em aberto</h2>

              <div className="cards">



                {demandas.map((demanda) => (

                  <div className="card" key={demanda.id}>

                    <div>

                      <div className="card-top">
                        <img
                          src={
                            "https://ui-avatars.com/api/?name=" +
                            demanda.id_usuario.nome +
                            "&background=random"
                          }
                        />
                        <h3>{demanda.id_usuario.nome}</h3>
                      </div>

                      <div className="card-info">
                        <p className="label">Categoria</p>
                        <span>{demanda.id_categoria.categoria}</span>
                      </div>

                      <div className="card-info">
                        <p className="label">Título</p>
                        <span>{demanda.titulo}</span>
                      </div>

                      <div className="card-desc">
                        <p className="label">Descrição</p>
                        <p className="descricao">
                          {demanda.descricao}
                        </p>
                      </div>

                      <div className='caixaStatus'>
                        <p>{demanda.status}</p>
                      </div>

                      <div className="data">
                        criado em: {formataData(demanda.created_at)}
                      </div>

                    </div>

                    <div className="card-action">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setUserSelecionado(demanda)}
                      >
                        ver demanda
                      </button>
                    </div>

                  </div>

                ))}




              </div>
            </section>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content modal-css">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">informações</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    {userSelecionado ? (
                      <div className='modalInfo'>
                        <div>
                          <p><span>NOME:</span></p>
                          <p>{userSelecionado.id_usuario.nome}</p>
                        </div>

                        <div>
                          <p><span>TITULO:</span></p>
                          <p>{userSelecionado.titulo}</p>
                        </div>

                        <div>
                          <p><span>ENDEREÇO:</span> </p>
                          <p>{userSelecionado.id_usuario.endereco}</p>
                        </div>

                        <div>
                          <p><span>TELEFONE:</span></p>
                          <p>{userSelecionado.id_usuario.telefone}</p>
                        </div>

                        <div>
                          <p><span>E-MAIL:</span> </p>
                          <p>{userSelecionado.email}</p>
                        </div>



                        <div className='modalDescricao'>
                          <p><span>DESCRIÇÃO:</span> </p>
                          <p>{userSelecionado.descricao}</p>
                        </div>
                      </div>
                    ) : (
                      <p>Nenhum prestador selecionado</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary  button-css" data-bs-dismiss="modal">Fechar</button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalProposta">
                      enviar uma proposta
                    </button>

                  </div>
                </div>
              </div>
            </div>



            <div className="modal fade" id="modalProposta" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content modal-proposta">

                  <div className="modal-header">
                    <h5 className="modal-title">Enviar proposta</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body formProposta">

                    <div className="inputGroup">
                      <label>Preço</label>
                      <input type="text" placeholder="Ex: R$ 500" onChange={e => setPrecoProposta(e.target.value)} />
                    </div>

                    <div className="inputGroup">
                      <label>Prazo</label>
                      <input type="text" placeholder="Ex: 3 dias" onChange={e => setPrazoProposta(e.target.value)} />
                    </div>

                    <div className="inputGroup">
                      <label>Descrição</label>
                      <textarea placeholder="Descreva sua proposta..." onChange={e => setDescricaoProposta(e.target.value)} />

                    </div>

                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-voltar"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        const modal = new window.bootstrap.Modal(
                          document.getElementById('exampleModal')
                        );
                        modal.show();
                      }}
                    >
                      Voltar
                    </button>

                    <button type="button" className="btn-enviar" onClick={enviarProposta}>
                      Enviar proposta
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
