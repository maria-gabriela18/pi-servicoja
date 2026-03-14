'use client';
import Link from "next/link";
import "./login_usuario.css";
import { useEffect, useState } from "react";

export default function Login() {

    const [autenticado, alteraAutenticado] = useState(false) // Controla se está logado ou não

    const [usuario, alteraUsuario] = useState("")
    const [senha, alteraSenha] = useState("")

    function autenticar() {

        if (usuario == "admin" && senha == "123123") {
            alert("Você se conectou!")
            localStorage.setItem("logado", "true")
            alteraAutenticado(true)
        } else {
            alert("Erro! Algum dado está errado...")
        }

    }

    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("logado")
        alteraAutenticado(false)
    }

    useEffect(() => {

        const logado = localStorage.getItem("logado")
        if (logado == "true") {
            alteraAutenticado(true)
        }

    }, [])

    return (

        <div className="card">

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
                        <button onClick={desconectar} > Sair da conta </button>

                    </div>
            }

        </div>

    )
}