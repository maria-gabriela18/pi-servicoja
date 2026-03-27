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
  const [proposta, setProposta] = useState()

  async function buscarDemanda() {

    const { data, error } = await supabase
      .from('demandas')
      .select(`*, 
                    id_usuarios(*) 
                   `)
    console.log(data)

    if (error) {
      console.log("Error", error)

    } else {
      setDemandas(data)
    }

  };


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

      {/* HEADER */}


      {/* CATEGORIA */}
      <section className="categoria">
        <h2 className="categoria-titulo">Demandas em aberto</h2>

        <div className="cards">

          <div className="card">

            <div className="card-top">
              <img src="https://placehold.co/50x50" />
              <h3>Rafael Rodrigues</h3>
            </div>

            <div className="card-info">
              <p className="label">titulo</p>
              <span>Pedreiro</span>
            </div>

            <div className="card-desc">
              <p className="label">Descrição</p>
              <p className="descricao">
                preciso de um pedreiro que coloque piso na minha garagem.
              </p>
            </div>


            <div className="card-action">

              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserSelecionado(demanda)}>
                ver demanda
              </button>
            </div>

          </div>

          {demandas.map((demanda) => (

            <div className="card" key={demanda.id}>

              <div className="card-top">
                <img src="https://placehold.co/50x50" />
                <h3>{demanda.id_usuarios.nome}</h3>
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

              {/* <div>
                <p>{demanda.status} </p>
              </div> */}

              {/* <div>
                <p>criado em: {formataData(demanda.created_at)}</p>
                <p>as {formataHoras(demanda.created_at)}</p>
              </div> */}

              <div className="card-action">

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserSelecionado(demanda)}>
                  ver demanda
                </button>
              </div>

            </div>

          ))}




        </div>
      </section>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content modal-css">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">informações</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">

              <div className="modalInfo">

                <div className="infoItem">
                  <span>NOME</span>
                  <p>Rafael Rodrigues</p>
                </div>

                <div className="infoItem">
                  <span>TÍTULO</span>
                  <p>Pedreiro</p>
                </div>

                <div className="infoItem">
                  <span>ENDEREÇO</span>
                  <p>São Carlos - SP</p>
                </div>

                <div className="infoItem">
                  <span>TELEFONE</span>
                  <p>(16) 99999-9999</p>
                </div>

                <div className="infoItem">
                  <span>E-MAIL</span>
                  <p>rafael@email.com</p>
                </div>

                <div className="modalDescricao">
                  <span>DESCRIÇÃO</span>
                  <p>
                    Preciso de um pedreiro que coloque piso na minha garagem com acabamento profissional.
                  </p>
                </div>

              </div>



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



      {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <p>{userSelecionado.id_usuarios.nome}</p>
                  </div>

                  <div>
                    <p><span>TITULO:</span></p>
                    <p>{userSelecionado.titulo}</p>
                  </div>

                  <div>
                    <p><span>ENDEREÇO:</span> </p>
                    <p>{userSelecionado.id_usuarios.endereco}</p>
                  </div>

                  <div>
                    <p><span>TELEFONE:</span></p>
                    <p>{userSelecionado.id_usuarios.telefone}</p>
                  </div>

                  <div>
                    <p><span>E-MAIL:</span> </p>
                    <p>{userSelecionado.id_usuarios.email}</p>
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
      </div> */}



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
          <input type="text" placeholder="Ex: R$ 500" />
        </div>

        <div className="inputGroup">
          <label>Prazo</label>
          <input type="text" placeholder="Ex: 3 dias" />
        </div>

        <div className="inputGroup">
          <label>Descrição</label>
          <textarea placeholder="Descreva sua proposta..." />
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

        <button type="button" className="btn-enviar">
          Enviar proposta
        </button>
      </div>

    </div>
  </div>
</div>


    </div>


  )
}

