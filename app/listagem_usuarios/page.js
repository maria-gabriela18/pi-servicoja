'use client';
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ynxzquxbnbdesqknhbte.supabase.co', 'sb_publishable_NFhvutPRUhEg0xdbFhkflA_UV_NXWFu')

function Listagem() {

    const [usuarios, setUsuarios] = useState([])
    
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


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">CPF ou CNPJ</th>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Localizacao</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Senha</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        usuarios.map(
                            item => <tr>
                                <th scope="row">{item.nome}</th>
                                <td>{item.email}</td>
                                <td>{item.cpf_cnpj}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.endereco}</td>
                                <td>{item.telefone}</td>
                                <td>{item.senha}</td>
                            </tr>
                        )
                    }


                </tbody>
            </table>

        </div>
    );
}

export default Listagem;