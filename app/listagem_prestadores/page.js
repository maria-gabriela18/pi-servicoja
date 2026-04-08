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
    <div className='divGeral'>

      <div className='divFiltrar'>
        <h3><i className="bi bi-funnel"></i> Filtrar</h3>

        <label>Categorias de Serviços:</label>
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





      <section className="categoria">

        <h2 className="categoria-titulo">Prestadores</h2>


        {prestadores.length == 0?
         <p>ainda nao tem prestadores nessa categoria</p>
          
          :
        <div className="cards_prestadores">

          {prestadores.map((prestador) => (

            <div className="card_prestador" key={prestador.id}>

              <div className="card-top">
                <img src={"https://ui-avatars.com/api/?name=" + prestador.id_usuario.nome + "&background=random"} />
                <h3>{prestador.id_usuario.nome}</h3>
              </div>

              <div className="card-info">
                <p className="label">categoria</p>
                <span>{prestador.categoria.categoria}</span>
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
}
        
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

