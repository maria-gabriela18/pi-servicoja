'use client'


import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import "./info_demanda.css"


function Demanda() {

    const [demanda, setDemanda] = useState([])
    const [propostas, setPropostas] = useState([])

    const id_usuario = localStorage.getItem("id_usuario")

    async function pegarInfo() {

        //   PEGAR DADOS DA DEMANDA DO USUARIO
        const { data, error } = await supabase
            .from('demandas')
            .select("*, id_usuario(*)")
            .eq('id_usuario', id_usuario);

        if (error) {
            console.error("Erro ao buscar demandas:", error);
            alert("Não foi possível pegar os dados.");
        } else {
            setDemanda(data[0]);
        }

        // PEGAR AS PROPOSTA

        const resposta = await supabase.from('propostas').select('*, id_usuario(*)').eq('id_demanda', data[0].id)
        setPropostas(resposta.data)


    }

    useEffect(() => {
        pegarInfo()
    }, [])

    return (
        <div className="centralizar">

        {
            id_usuario == null ?
             <div></div> 
            :
                <div>


                    <div className="cardProposta">

                        <div className="row">
                            <div className="col-8">
                                <h2>{demanda.descricao}</h2>
                            </div>

                            <div className="col-4">
                                <h3>Status: {demanda.status}</h3>
                            </div>
                        </div>

                        <hr />

                        <p>{demanda.descricao}</p>

                        <hr />

                        <div className="row">
                            <div className="col-4">
                                <p><strong>⭕ Categoria:</strong> {demanda.categoria}</p>
                            </div>

                            <div className="col-4">
                                <p><strong>📍 Localização:</strong> {demanda.localizacao}</p>
                            </div>

                            <div className="col-4">
                                <p><strong>📅 Data:</strong> {demanda.data}</p>
                            </div>
                        </div>

                    </div>
                  



                    <br />
                    <h3> Propostas Recebidas </h3>
                    <hr />

                    <div class="grupoCards">
                    {
                        propostas.map(
                            item =>
                                
                                <div className="cardPrestador">

                                    <div className="cabecalho">
                                        <img className="foto" src="https://placehold.co/50x50" />

                                        <div className="info">
                                            <h3>Carlos Silva</h3>
                                            <p className="avaliacao">⭐ 4.8 | 120 serviços realizados</p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="detalhes">
                                        <p><strong>Valor:</strong> R$ 120,00</p>
                                        <p><strong>Prazo:</strong> 2 dias</p>
                                    </div>

                                    <hr />

                                    <p className="mensagem">
                                        "Posso resolver seu problema rapidamente, tenho experiência com isso."
                                    </p>

                                    <hr />

                                    <div className="acoes">
                                        <button className="aceitar">Aceitar Proposta</button>
                                        <button className="recusar">Recusar Proposta</button>
                                    </div>
                                </div>
                        )
                    }
                    </div>

                </div>
        


        }

        </div>
    );
}

export default Demanda;