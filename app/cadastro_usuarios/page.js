"use client";
import Link from "next/link";
import "./cadastro_usuarios.css";
import { useState } from "react";

export default function Cadastro() {

    const [nome, alteraNome] = useState()
    const [email, alteraEmail] = useState()
    const [cpf, alteraCpf] = useState()
    const [dataNascimento, alteraDataNascimento] = useState()
    const [telefone, alteraTelefone] = useState()
    const [endereco, alteraEndereco] = useState()
    const [senha, alteraSenha] = useState()

    function salvar(e) {
        e.preventDefault()

        const objeto = {
            nome: nome,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            telefone: telefone,
            endereco: endereco,
            senha: senha,
        }

        console.log(objeto)

    }


    return (

        <div className="card">

            <h1> Criar conta </h1>

            <hr/> <br />

            <form onSubmit={salvar} >

            <div class="row">

                <div class="col-6">

                    <p> Nome: </p>
                    <input onChange={e => alteraNome(e.target.value)} class="form-control" placeholder="Seu nome completo" />

                </div>

                <div class="col-6">

                    <p> E-mail: </p>
                    <input onChange={e => alteraEmail(e.target.value)} class="form-control" placeholder="seu@email.com" />

                </div>

            </div>

            <br />

            <div class="row">

            <div class="col-4">
            <p> CPF: </p>
            <input onChange={e => alteraCpf(e.target.value)} class="form-control" placeholder="00011122233" />
            </div>

            <div class="col-4">
            <p> Data de Nascimento: </p>
            <input onChange={e => alteraDataNascimento(e.target.value)} class="form-control" type="date" />
            </div>

            <div class="col-4">
            <p> Telefone: </p>
            <input onChange={e => alteraTelefone(e.target.value)} class="form-control" placeholder="11999998888" type="tel" />
            </div>

            </div>

            <br />

            <p> Endereço: </p>
            <input onChange={e => alteraEndereco(e.target.value)} class="form-control" placeholder="Rua, Bairro, Cidade" minlength="10" />

            <br />

            <p> Insira sua senha: </p>
            <input onChange={e => alteraSenha(e.target.value)} class="form-control" type="password" placeholder="•••••••" />

            <br/>

            <div className="demo">
                <strong>Sua senha deve conter:</strong><br /><br/>
                <p>
                    • 8 e 12 caracteres;<br />
                    • Ao menos uma letra maiúscula;<br />
                    • Ao menos 1 caratere especial (@; *; #);<br />
                    • Ao menos 4 números.
                </p>
            </div>

            <br />

            <div class="text-center row">

                <div class="col-6">
                <button class="btn btn-primary">Cadastrar</button>
                </div>

                <div class="col-6">
                <Link k href="login_usuarios"> <button class="btn btn-danger">Cancelar</button> </Link>
                </div>

            </div>

            </form>

        </div>
    )
}