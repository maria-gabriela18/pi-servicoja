'use client';
import Link from "next/link";
import { useState } from "react";
import ListPrest from "../list_prest/page";



export default function CadPrest() {

  const[nomecompleto, setnomecompleto] = useState("")
  const[telefone, settelefone] = useState("")
  const[email, setemail] = useState("")
  const[endereco, setendereco] = useState("")
  const[cidade, setcidade] = useState("")
  const[estado, setestado] = useState("")
  const[cep, setcep] = useState("")
  const[senha, setsenha] = useState("")


  function salvar(e){
        e.preventDefault()

        const objeto = {
            nome: nomecompleto,
            telefone: telefone,
            email: email,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            cep: cep,
            senha: senha            
        }
        console.log(objeto)
    }


  return (
    <div className="col-8 mx-auto mt-5 border border-secondary">
      <div className="text-center mx-auto mt-3" >
        <h2>Cadastro de prestador</h2>
      </div>


      <form onSubmit = {salvar} className="row g-3 mx-auto mt-5 p-4 border rounded">
        <div className="col-md-12">
            Nome completo
          <input onChange={e => setnomecompleto(e.target.value) } className="form-control" />
        </div>

        <div className="col-md-12">
            Telefone
          <input onChange={e => settelefone(e.target.value) } className="form-control" />
        </div>

        <div className="col-md-12">
            E-mail
          <input onChange={e => setemail(e.target.value) } type="email" className="form-control" />
        </div>

        <div className="col-12">
            Endereço
          <input onChange={e => setendereco(e.target.value) } className="form-control" placeholder="Av São Carlos 223, centro" />
        </div>

        <div className="col-md-12">
            Cidade
          <input onChange={e => setcidade(e.target.value) } type="text" className="form-control" />
        </div>

        <div className="col-md-12">
            Estado
          <select value={estado} onChange={e => setestado(e.target.value) } className="form-select">
            <option>Rio de Janeiro</option>
            <option>São Paulo</option>
            <option>Minas Gerais</option>
            <option>Pernambuco</option>
            <option>Amazonas</option>
            <option>Sergipe</option>
          </select>
        </div>

        <div className="col-md-12">
            CEP
          <input onChange={e => setcep(e.target.value) } type="text" className="form-control" id="inputZip" />
        </div>

        <div className="col-md-12">
            Senha
          <input onChange={e => setsenha(e.target.value) } className="form-control" />
        </div>

        <div className="col-12">
          <div>
            <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Cadastrar
            </button>
          </div>
        </div>

      </form>

      <div className="modal fade" id="exampleModal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h5 className="modal-title">Cadastro realizado</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body">
        Prestador cadastrado com sucesso!
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="#exampleModal">
          Fechar
        </button>
      </div>

    </div>
  </div>
</div>

    </div>
  )

    
}

