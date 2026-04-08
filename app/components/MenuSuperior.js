'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";


export default function MenuSuperior() {

    const [id_usuario, setIdUsuario] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState("")


    async function usuario() {
        const { data, error } = await supabase.auth.getUser()
        //console.log("essa aqui é a data do menu", data)

        const { data: userData, error: userError } = await supabase
            .from("usuarios")
            .select("nome")
            .eq("id", data.user.id)
            .single();

        if (userError) {
            //console.log(userError)
            return
        }

        setNomeUsuario(userData.nome)

    }


    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("id_usuario")
        location.reload()
     
    }

    useEffect(() => {
        const id = localStorage.getItem("id_usuario");
        const prest = localStorage.getItem("prestador")
        setIdUsuario(id);
        //console.log(setIdUsuario)
        setPrestador(prest)

        usuario()

    }, []);

    return (
        <header className="header">
            <div className="menuNav">
                <ul>
                    <li><Link href="/">Pagina inicial</Link></li>
                    
                    {
                        prestador == "false" ?
                            <>
                                <li><Link href="/listagem_prestadores">Prestadores</Link></li>
                                <li><Link href="/painel"> Minhas demandas</Link></li>
                            </>

                            :
                            <>
                                <li><Link href="/painel"> Meus trabalhos</Link></li>
                                <li><Link href="/listagem_demandas">Demandas</Link></li>


                            </>

                    }

                </ul>
            </div>

            <div className="acoesHeader">
                {
                    id_usuario == null ? (
                        <>
                            <Link href="/login_usuarios">
                                <button><i className="bi bi-box-arrow-in-right"></i> Login</button>
                            </Link>
                            <Link href="/cadastro_usuarios">
                                <button><i className="bi bi-person-plus"></i> Cadastro</button>
                            </Link>
                        </>
                    ) : (

                        < div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
                                <img src={`https://ui-avatars.com/api/?name=${nomeUsuario}&background=random`} className="avatarUser" />
                                {nomeUsuario}
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={desconectar}>Sair</a></li>

                            </ul>
                        </div>


                    )
                }
            </div>

        </header >
    )
}