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
      id_usuario(*) 
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
      descricao: descricaoProposta

    }
    const { data, error } = await supabase
      .from('propostas')
      .insert(objProposta)

    if (error) {
      console.log(error)
      alert("Erro ao enviar proposta")
    } else {
      alert("Proposta enviada com sucesso!")
      console.log(data)
    }

  }

  

  function formataData(data) {
    let data_formatada = new Date(data)
    data_formatada = data_formatada.toLocaleDateString()
    return data_formatada
  }

  function formataHoras(horas) {
    let horas_formatadas = new Date(horas)
    horas_formatadas = horas_formatadas.toLocaleTimeString()
    return horas_formatadas
  }



  useEffect(() => {
    buscarDemanda()
  }


    , [])

  return (
    <div>

      {/* CATEGORIA */}
      <section className="categoria">




        <h2 className="categoria-titulo">Demandas em aberto</h2>

        <div className="cards">



          {demandas.map((demanda) => (

            <div className="card" key={demanda.id}>

              <div className="card-top">
                <img src="https://placehold.co/50x50" />
                <h3>{demanda.id_usuario.nome}</h3>
              </div>

              <div className="card-info">
                <p className="label">titulo</p>
                <span>{demanda.titulo}</span>
              </div>

              {<div className="card-desc">
                <p className="label">Descrição</p>
                <p className="descricao">
                  {demanda.descricao}
                </p>
              </div>}

              <div>
                <p>{demanda.status} </p>
              </div>

              <div>
                <p>criado em: {formataData(demanda.created_at)}</p>

              </div>

              <div className="card-action">

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserSelecionado(demanda)}>
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


  )
}

