'use client';
import Link from "next/link";
import { useState } from "react";

function DemandaCadastro() {

  //aqui fica o usestates, antes do return 

  const [cliente, setCliente] = useState("")
  const [descricao, setDescricao] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [status, setStatus] = useState("")

      function salvar(e){
        e.preventDefault ();
      
      const demanda = {

          cliente: cliente,
          descricao: descricao,
          localizacao: localizacao,
          status: status,




      };
      
      console.log(demanda);
      
      
      }




  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* Sidebar */}
        <div className="col-md-3 bg-light d-flex justify-content-center p-4">
          <div className="card text-center shadow-sm w-100 h-100">
            <div className="card-body">

              <img
                src="https://via.placeholder.com/150"
                alt="Foto de Perfil"
                className="rounded-circle img-fluid border border-3 border-light shadow-sm"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />

              <h5 className="card-title mt-3">Nome</h5>
              <p className="card-text text-muted small">
                Descrição
              </p>
              <a href="#" className="btn btn-primary btn-sm">
                Editar
              </a>

            </div>
          </div>
        </div>

        {/* Conteúdo da direita */}
        <div className="col-md-9 p-4">
          <h1>Precisa de uma solução para seus problemas?</h1>

          <div className="d-flex gap-3 mb-4">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn text-white px-4 py-2"
              style={{ backgroundColor: "#1e4d5b", borderRadius: "10px" }}
            >
              Criar nova demanda
            </button>

            <button
              className="btn text-white px-4 py-2"
              style={{ backgroundColor: "#2c5d7d", borderRadius: "10px" }}
            >
              Histórico
            </button>
          </div>

          {/* Seção de Propostas */}
          <div className="border border-dark p-3">
            <h6 className="fw-bold mb-3">Suas propostas</h6>

            <div className="d-flex flex-column gap-2">
              <div className="border border-dark p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-secondary" style={{ width: "30px", height: "30px" }}></div>
                  <span>João fez uma proposta para você</span>
                </div>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>
                  ver
                </button>
              </div>

              <div className="border border-dark p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-secondary" style={{ width: "30px", height: "30px" }}></div>
                  <span>Hugo Souza fez uma proposta para você</span>
                </div>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>
                  ver
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5">Cadastro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <form onSubmit={salvar}>
                <label>Cliente:</label><br />
                <input type="text"
                  className="inputCliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}

                /><br /><br />



                <label>Descrição:</label><br />
                <textarea className="inputDescricao"
                  rows="4"
                  cols="30"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}

                ></textarea><br /><br />



                <label>Localização:</label><br />
                <input type="text"
                  className="inputLocalizacao"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}


                /><br /><br />





                <label>Status:</label><br />
                <select className="inputStatus"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}

                >


                  <option value="">Selecione</option>
                  <option value="Aberto">Aberto</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Finalizado">Finalizado</option>
                </select><br /><br />

                <button type="submit">Salvar</button>
              </form>




            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}





export default DemandaCadastro;