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

  useEffect(() => {
    async function buscarPrestadores() {

      const { data, error } = await supabase
        .from("servicos")
        .select("*")

      if (error) {
        console.log("Erro:", error)
      } else {
        setPrestadores(data)
      }

    }

    buscarPrestadores()
  }, [])

  return (
    <div>

      {/* HEADER */}
      <header className="headerListaPres">
        <ul>
          <li>Automóveis</li>
          <li>Design e Tecnologia</li>
          <li>Reforma e Reparos</li>
          <li>Serviços domésticos</li>
          <li>Saúde</li>
          <li>Assistência técnica</li>
        </ul>

        <div className="botaoPerfil">
          <Link href="/perfil_usuarios" className="list-group-item list-group-item-action">
            Perfil
          </Link>
        </div>
      </header>

      {/* CATEGORIA */}
      <section className="categoria">
        <h2 className="categoria-titulo">Prestadores</h2>

        <div className="cards">

          {prestadores.map((prestador) => (

            <div className="card" key={prestador.id}>

              <div className="card-top">
                <img src="https://placehold.co/50x50" />
                <h3>{prestador.nome}</h3>
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

              <div className="card-action">
                <button>Ver contato</button>
              </div>

            </div>

          ))}

        </div>
      </section>

    </div>
  )
}