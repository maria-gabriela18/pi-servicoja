"use client";
import Link from "next/link";
import "./cadastro_usuarios.css";
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";

export default function Cadastro() {

    const [nome, alteraNome] = useState("")
    const [cpf, alteraCpfCnpj] = useState("")
    const [nascimento, alteraDataNascimento] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [endereco, alteraEndereco] = useState("")
    const [tipo, alteraTipo] = useState("cliente")

    const[email, alteraEmail] = useState("")
    const[senha, alteraSenha] = useState("")

    const [usuarios, alteraUsuarios] = useState([])

    async function cadastrar(e){
        e.preventDefault()

        // VALIDAÇÃO DE DADOS
        if(nome.length < 3){
            alert("Preencha o nome corretamente...")
            return
        }
        if(validarCPF(cpf) == false){
            alert("Digite um CPF válido para continuar...")
            return
        }
        if(nascimento == null){
            alert("Preencha a data de nascimento para prosseguir...")
            return
        }
        if(telefone.length < 8){
            alert("Preencha o telefone corretamente para prosseguir...")
            return
        }
        if(endereco.length < 5){
            alert("Preencha o endereço completo...")
            return
        }
        if(senha.length < 8){
            alert("Preencha a senha corretamente...")
            return
        }

        // CADASTRAR NO AUTENTTICATION
        const auth ={
            email: email,
            password: senha
        }
        const { data, error } = await supabase.auth.signUp(auth)

        if(data.user == null){
            alert("Dados inválidos")
            return
        }


        // CADASTRAR NA TABELA USUÁRIOS
        const objeto = {
            id: data.user.id,
            nome: nome,
            cpf_cnpj: cpf,
            nascimento:nascimento,
            telefone: telefone,
            endereco:endereco,
            tipo: tipo

        }

        const resposta = await supabase
            .from('usuarios')
            .insert(objeto)

        console.log(resposta)

        if(resposta.status == 201){
            alert("Cadastrado com sucesso")
            location.href = "/"
        }else{
            alert("Verifique os dados inderidos e tente novamente")
        }

    }

    function validarCPF(cpf) {
        return true
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) return false;

        // elimina CPFs inválidos conhecidos (111111..., 000000..., etc)
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        // 1º dígito verificador
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * (10 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;

        if (resto !== parseInt(cpf[9])) return false;

        // 2º dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;

        if (resto !== parseInt(cpf[10])) return false;

        return true;
    }

    // async function salvar(e) {
    //     e.preventDefault()

    //     const objeto = {
    //         nome: nome,
    //         email: email,
    //         cpf_cnpj: cpf,
    //         nascimento: nascimento,
    //         telefone: telefone,
    //         endereco: endereco,
    //         senha: senha,
    //         tipo: tipo
    //     }

    //     console.log(objeto)

    //     //Validações

    //     const { error } = await supabase.from('usuarios').insert([objeto])

    //     console.log(error)

    //     if (error == null) {
    //         alert("Usuário cadastrado com sucesso!")
    //         alteraNome("")
    //         alteraEmail("")
    //         alteraCpfCnpj("")
    //         alteraDataNascimento("")
    //         alteraTelefone("")
    //         alteraEndereco("")
    //         alteraSenha("")
    //         //location.reload()
    //     } else {
    //         alert("Dados inválidos. Verifique os campos e tente novamente.")
    //     }

    // }

    return (

        <div className="centralizar">


            <div className="card">

                <h1> Criar conta </h1>

                <hr /> <br />

                <div className="btn-group" role="group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="tipo"
                        id="cliente"
                        value="cliente"
                        checked={tipo === "cliente"}
                        onChange={(e) => alteraTipo(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="cliente">
                        Cliente
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="tipo"
                        id="prestador"
                        value="prestador"
                        checked={tipo === "prestador"}
                        onChange={(e) => alteraTipo(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="prestador">
                        Prestador
                    </label>
                </div>


                <br />

                <form onSubmit={cadastrar} >

                    <div className="row">

                        <div className="col-6">

                            <p> Nome: </p>
                            <input onChange={e => alteraNome(e.target.value)} className="form-control" placeholder="Seu nome completo" />

                        </div>

                        <div className="col-6">

                            <p> E-mail: </p>
                            <input onChange={e => alteraEmail(e.target.value)} className="form-control" placeholder="seu@email.com" />

                        </div>

                    </div>

                    <br />

                    <div className="row">

                        <div className="col-4">
                            <p> CPF ou CNPJ: </p>
                            <input onChange={e => alteraCpfCnpj(e.target.value)} className="form-control" placeholder="00011122233" />
                        </div>

                        <div className="col-4">
                            <p> Data de Nascimento: </p>
                            <input onChange={e => alteraDataNascimento(e.target.value)} className="form-control" type="date" />
                        </div>

                        <div className="col-4">
                            <p> Telefone: </p>
                            <input onChange={e => alteraTelefone(e.target.value)} className="form-control" placeholder="11999998888" type="tel" />
                        </div>

                    </div>

                    <br />

                    <p> Endereço: </p>
                    <input onChange={e => alteraEndereco(e.target.value)} className="form-control" placeholder="Rua, Bairro, Cidade" minlength={10} />

                    <br />

                    <p> Insira sua senha: </p>
                    <input onChange={e => alteraSenha(e.target.value)} className="form-control" type="password" placeholder="•••••••" />

                    <br />

                    

                    <div className="text-center row">

                        <div className="col-6">
                            <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </div>

                        <div className="col-6">
                            <Link href="login_usuarios"> <button className="btn btn-danger">Cancelar</button> </Link>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    )
}