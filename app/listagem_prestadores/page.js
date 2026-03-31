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


  useEffect(() => {
    async function buscarPrestadores() {

      const { data, error } = await supabase
        .from("servicos")
        .select(`*,
          id_usuario(*)`)

      if (error) {
        console.log("Erro:", error)
      } else {
        setPrestadores(data)
      }

      console.log(data)
    }





    buscarPrestadores()
  }, [])

  return (
    <div className='divGeral'>


      <div className='divFiltrar'>
        <h3>Filtrar</h3>

        <div>
          <label>
            <input type='checkBox' />
            Construção e Reforma
          </label>

          <label>
            <input type='checkBox' />
            Manutenção e Reparos
          </label>

          <label>
            <input type='checkBox' />
            Limpeza e Serviços Domésticos
          </label>

          <label>
            <input type='checkBox' />
            Transporte e Mudanças
          </label>

          <label>
            <input type='checkBox' />
            Tecnologia e Informática
          </label>

          <label>
            <input type='checkBox' />
            Design e Criatividade
          </label>

          <label>
            <input type='checkBox' />
            Marketing e Vendas
          </label>

          <label>
            <input type='checkBox' />
            Aulas e Educação
          </label>

          <label>
            <input type='checkBox' />
            Serviços Profissionais
          </label>

          <label>
            <input type='checkBox' />
            Saúde e Bem-estar
          </label>

          <label>
            <input type='checkBox' />
            Eventos e Festas
          </label>

          <label>
            <input type='checkBox' />
            Pets
          </label>

          <label>
            <input type='checkBox' />
            Jardim e Área Externa
          </label>

          <label>
            <input type='checkBox' />
            Automotivo
          </label>

          <label>
            <input type='checkbox' />
            Segurança e Vigilância
          </label>
        </div>

      </div>





      <section className="categoria">

        <h2 className="categoria-titulo">Prestadores</h2>

        <div className="cards_prestadores">

          {prestadores.map((prestador) => (

            <div className="card_prestador" key={prestador.id}>

              <div className="card-top">
                <img src="https://placehold.co/50x50" />
                <h3>{prestador.id_usuario.nome}</h3>
              </div>

              <div className="card-info">
                <p className="label">Função</p>
                <span>{prestador.funcao}</span>
              </div>

              <div className="card-desc">
                <p className="label">Descrição</p>
                <p className="descricao">
                  {prestador.descricao}
                </p>
              </div>

              <div className="card-action_prestador">

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserSelecionado(prestador)}>
                  contatos
                </button>
              </div>

            </div>

          ))}




        </div>
      </section>



      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <p><span>FUNÇÃO:</span></p>
                    <p>{userSelecionado.funcao}</p>
                  </div>


                  <div>
                    <p><span>TELEFONE:</span></p>
                    <p>{userSelecionado.id_usuario.telefone}</p>
                  </div>
                  <div>
                    <p><span>E-MAIL:</span> </p>
                    <p>{userSelecionado.id_usuario.email}</p>
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

            </div>
          </div>
        </div>
      </div>


    </div>


  )
}

