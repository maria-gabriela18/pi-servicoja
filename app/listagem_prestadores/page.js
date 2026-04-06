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




  async function filtrar(categoria) {

    let query = supabase
      .from("servicos")
      .select(`*, id_usuario(*)`)

    if (categoria) {
      query = query.eq("categoria", categoria)
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
    <div className='divGeral'>


      <div className='divFiltrar'>
        <h3>Filtrar</h3>

        <label>Categorias de Serviços:</label>
        <div className='divFiltrarBotoes'>
          <div>
            <button onClick={() => filtrar('Construção e Reforma')}>Construção e Reforma</button>
            <button onClick={() => filtrar('Serviços Domésticos')}>Serviços Domésticos</button>
            <button onClick={() => filtrar('Manutenção e Reparos')}>Manutenção e Reparos</button>
            <button onClick={() => filtrar('Tecnologia e Informática')}>Tecnologia e Informática</button>
            <button onClick={() => filtrar('Beleza e Bem-estar')}>Beleza e Bem-estar</button>
            <button onClick={() => filtrar('Transporte e Logística')}>Transporte e Logística</button>
          </div>

          <div>
            <button onClick={() => filtrar('Eventos e Festas')}>Eventos e Festas</button>
            <button onClick={() => filtrar('Educação e Aulas')}>Educação e Aulas</button>
            <button onClick={() => filtrar('Saúde e Cuidados')}>Saúde e Cuidados</button>
            <button onClick={() => filtrar('Serviços Automotivos')}>Serviços Automotivos</button>
            <button onClick={() => filtrar(null)}>Todos</button>
          </div>
        </div>

      </div>





      <section className="categoria">

        <h2 className="categoria-titulo">Prestadores</h2>

        <div className="cards_prestadores">

          {prestadores.map((prestador) => (

            <div className="card_prestador" key={prestador.id}>

              <div className="card-top">
                <img src={"https://ui-avatars.com/api/?name=" + prestador.id_usuario.nome + "&background=random"} />
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

                  <div className='caixa-info'>

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

                  </div>

                  <div className='caixa-info'>
                    <div>
                      <p><span>E-MAIL:</span> </p>
                      <p>{userSelecionado.id_usuario.email}</p>
                    </div>

                    <div>
                      <span>CRIADO EM:</span>
                      <p>{formataData(userSelecionado.id_usuario.created_at)}</p>
                    </div>

                    <div>
                      <span>aqui vai alguma coisa</span>
                    </div>

                    

                  </div>
                  
                  <div>
                    <div className='modalDescricao'>
                      <p><span>DESCRIÇÃO:</span> </p>
                      <p>{userSelecionado.descricao}</p>
                    </div>
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

