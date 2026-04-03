'use client'

import supabase from "@/app/conexao/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConsultaDemandas() {

    const params = useParams()

    const [demanda, setDemanda] = useState(null)

    const [proposta, setProposta] = useState([])

    async function buscaDemanda() {

        //demanda
        const { data, error } = await supabase
            .from('demandas')
            .select(`
                *,
                usuarios (*),
                categorias (*)
            `)
            .eq('id', Number(params.id))
            .single()

        if (error) {
            console.log(error)
            return
        }

        setDemanda(data)

        const resposta = await supabase.from('propostas').select('*, id_usuario(*)').eq('id_demanda', data.id)
        setProposta(resposta.data)

    }



    useEffect(() => {
        if (params?.id) {
            buscaDemanda()
        }
    }, [params])


    if (!demanda) {
        return <p className="text-center mt-5">Carregando...</p>
    }

    return (
        <div className="container mt-5">

            <h1>Detalhes da Demanda</h1>
            <hr />

            <div className="card p-4 shadow">

                <div className="row">
                    <div className="col-8">
                        <h2>{demanda.titulo}</h2>
                    </div>

                    <div className="col-4 text-end">
                        <h4>Status: {demanda.status}</h4>
                    </div>
                </div>

                <hr />

                <p>{demanda.descricao}</p>

                <hr />

                <div className="row">

                    <div className="col-4">
                        <p>
                            <strong>⚙ Categoria:</strong>{" "}
                            {demanda.categorias?.categoria}
                        </p>
                    </div>

                    <div className="col-4">
                        <p>
                            <strong>📍 Localização:</strong> {demanda.localizacao}
                        </p>
                    </div>

                    <div className="col-4">
                        <p>
                            <strong>📅 Data:</strong>{" "}
                            {new Date(demanda.created_at).toLocaleDateString()}
                        </p>
                    </div>

                </div>

            </div>

            <br />

            <h3>Propostas Recebidas</h3>
            <hr />

        
    

            {proposta.map(item => (


                <div className="card p-4 shadow">

                    <div className="d-flex align-items-center gap-3">
                        <img src="https://placehold.co/50x50" className="rounded-circle" />

                        <div>
                            <h5>{item.id_usuario.nome}</h5>
                            <p>⭐ 4.8 | 120 serviços</p>
                        </div>
                    </div>

                    <hr />

                    <p><strong>Valor:</strong> {item.preco} </p>
                    <p><strong>Prazo:</strong>{item.prazo}</p>

                    <hr />

                    <p>
                        {item.descricao}
                    </p>

                    <hr />

                    <div className="d-flex gap-2">
                        <button className="btn btn-success">Aceitar</button>
                        <button className="btn btn-danger">Recusar</button>
                    </div>

                </div>

            ))}

        </div>
    )
}
