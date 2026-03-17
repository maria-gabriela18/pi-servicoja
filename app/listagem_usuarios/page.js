'use client';
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";

function Listagem() {

    const [usuarios, setUsuarios] = useState([])

    function formataData(data) {
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString()
        return data_formatada
    }

    function formataHora(horas){
        let horas_formatadas = new Date(horas)
        horas_formatadas = horas_formatadas.toLocaleTimeString()
        return horas_formatadas // o return é usado para entregar algo. Quando é usado sozinho, ele "para" o código porque está entregando nulo
    }

    useEffect(() => {
        async function buscarUsuarios() {

            const { data, error } = await supabase
                .from("usuarios")
                .select("*")

            if (error) {
                console.log("Erro:", error)
            } else {
                setUsuarios(data)
            }

        }

        buscarUsuarios()
    }, [])

    return (
        <div>
            <h1> Listagem de usuários cadastrados </h1>
            <hr />


            <table className="table">
                <thead>
                    <tr>
                        <th> # </th>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">CPF ou CNPJ</th>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Localizacao</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Senha</th>
                        <th scope="col">Data de criação</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        usuarios.map(
                            (item, indice) => <tr>
                                <th> {indice+1} </th>
                                <th scope="row">{item.id}</th>
                                <th scope="row">{item.nome}</th>
                                <td>{item.email}</td>
                                <td>{item.cpf_cnpj}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.endereco}</td>
                                <td>{item.telefone}</td>
                                <td>{item.senha}</td>
                                <td>{formataData(item.created_at)} às {formataHora(item.created_at)}</td>
                            </tr>
                        )
                    }


                </tbody>
            </table>

        </div>
    );
}

export default Listagem;