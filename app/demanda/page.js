import Link from "next/link";

export default function Demanda() {
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
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn text-white px-4 py-2" style={{ backgroundColor: "#1e4d5b", borderRadius: "10px" }}>
              Criar nova demanda
            </button>
            <button className="btn text-white px-4 py-2" style={{ backgroundColor: "#2c5d7d", borderRadius: "10px" }}>
              Histórico
            </button>
          </div>

          {/* Seção de Propostas */}
          <div className="border border-dark p-3">
            <h6 className="fw-bold mb-3">Suas propostas</h6>

            {/* Lista de Propostas */}
            <div className="d-flex flex-column gap-2">
              {/* Item 1 */}
              <div className="border border-dark p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-secondary" style={{ width: "30px", height: "30px" }}></div>
                  <span>João fez uma proposta para você</span>
                </div>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>ver</button>
              </div>

              {/* Item 2 */}
              <div className="border border-dark p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-secondary" style={{ width: "30px", height: "30px" }}></div>
                  <span>Hugo Souza fez uma proposta para você</span>
                </div>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>ver</button>
              </div>
            </div>
          </div>

        </div>
      </div>







      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">




              <form>




                <label>Cliente:</label><br />


                <input type="text" class="inputCliente" /><br /><br />



                <label>Descrição:</label><br />

                <textarea class="inputDescricao" rows="4" cols="30"></textarea><br /><br />




                <label>Localização:</label><br />

                <input type="text" class="inputLocalizacao" /><br /><br />


                <label>Status:</label><br />

                <select class="inputStatus">


                  <option value="">Selecione</option>


                  <option value="Aberto">Aberto</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Finalizado">Finalizado</option>
                </select><br /><br />

                <button type="submit">Salvar</button>

              </form>

              <hr />


              <h2>Listagem de Demandas</h2>


              <table border class="tabelaDemandas">




                <tr>


                  <td>Cliente</td>
                  <td>Descrição</td>
                  <td>Localização</td>
                  <td>Status</td>

                </tr>
              </table>



            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
                  
                  


    </div>






  );
}