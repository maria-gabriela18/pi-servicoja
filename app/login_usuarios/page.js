'use client';
import Link from "next/link";
import "./login_usuario.css";
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

export default function Login() {

    const route = useRouter();

    const [autenticado, alteraAutenticado] = useState(false) // Controla se está logado ou não

    const [usuario, alteraUsuario] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar() {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: usuario,
            password: senha,
        });

        if (error) {
            alert("Erro ao autenticar");
            return;
        }

        const resposta = await supabase.from('usuarios').select().eq('id',data.user.id).single()

        alert("Autenticado com sucesso")
        // console.log(data) - para ver se está dando certo
        localStorage.setItem("id_usuario", data.user.id)
        localStorage.setItem("prestador", resposta.data.tipo == 'prestador')
        alteraAutenticado(true)
        location.href = "/painel"
    }

    async function sair() {
        await supabase.auth.signOut()
        localStorage.removeItem("prestador")
        localStorage.removeItem("id_usuario")
        alteraAutenticado(false)
    }

    useEffect(() => {

        const logado = localStorage.getItem("logado")
        if (logado == "true") {
            alteraAutenticado(true)
        }else{
            alteraAutenticado(false)
        }

    }, [])

    return (
        <div className="container_login">

            <div className="card pagina_login">

                {
                    autenticado == false ?
                        <div>

                            <h1> Login </h1>

                            <hr /> <br />

                            <p> Insira seu e-mail: </p>
                            <input onChange={e => alteraUsuario(e.target.value)} className="form-control" type="email" placeholder="seu@email.com" />

                            <br />

                            <p> Insira sua senha: </p>
                            <input onChange={e => alteraSenha(e.target.value)} className="form-control" type="password" placeholder="•••••••" />

                            <br /><br />

                            <div className="botaoEntrarLogin">
                                <button onClick={autenticar} className="btn btn-primary">Entrar</button>
                            </div>

                            <br />

                            <div className="semconta">
                                <Link href="cadastro_usuarios" > Não tem conta? Criar </Link>
                            </div>

                        </div>
                        :
                        <div>

                            <p> Você já está logado. </p>
                            <button onClick={sair} > Sair da conta </button>

                        </div>
                }

            </div>

        </div>
    )
}