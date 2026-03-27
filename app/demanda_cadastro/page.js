'use client';
import { useState, useEffect } from "react";
import supabase from "../conexao/supabase";
import "./cadastro_demanda.css"

export default function DemandaCadastro() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");
  const [demandas, setDemandas] = useState([]);

  // Buscar demandas
  async function carregarDemandas() {
    const { data, error } = await supabase
      .from('demandas')
      .select('*');

    if (error) {
      console.log(error);
    } else {
      setDemandas(data);
    }
  }

  useEffect(() => {
    carregarDemandas();
  }, []);

  async function salvar(e) {
    if (e) e.preventDefault();

    if (!titulo || !descricao || !status || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    const demanda = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoria: categoria,
      id_usuarios: 1, // TODO: pegar usuário logado
      aberta: true
    };

    const { error } = await supabase
      .from('demandas')
      .insert([demanda]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("Salvo com sucesso!");

      setTitulo("");
      setDescricao("");
      setStatus("");
      setCategoria("");

      await carregarDemandas();

      // fecha modal
      document.getElementById('exampleModal').classList.remove('show');
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">


        <div className="col-md-3 bg-light d-flex justify-content-center p-4 border-end">
          <div className="card text-center shadow-sm w-100">
            <div className="card-body">
              <div className="rounded-circle bg-secondary mx-auto mb-3" style={{ width: "120px", height: "120px" }}></div>
              <h5 className="card-title">Seu Perfil</h5>
              <p className="card-text text-muted small">Gerencie suas demandas</p>
              <button className="btn btn-outline-primary btn-sm">Editar</button>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="col-md-9 p-4">
          <h1 className="mb-4">Gerenciador de Demandas</h1>

          <div className="d-flex gap-3 mb-5">
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

          {/* LISTA  */}
          <div className="card shadow-sm">
            <div className="card-header bg-white fw-bold">Suas demandas</div>
            <div className="card-body">
              <div className="list-group list-group-flush">

                {demandas.length === 0 && (
                  <p className="text-muted">Nenhuma demanda cadastrada</p>
                )}

                {demandas.map((d) => (
                  <div key={d.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{d.titulo}</strong><br />
                      <small className="text-muted">{d.status}</small>
                    </div>

                    <button
                      onClick={() => alert(d.descricao)}
                      className="btn btn-sm text-white"
                      style={{ backgroundColor: "#2c5d7d" }}
                    >
                      ver
                    </button>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Nova Demanda</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form id="formCadastro" onSubmit={salvar}>

                <div className="mb-3">
                  <label className="form-label fw-bold">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Descrição</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Status Inicial</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    <option value="Aberto">Aberto</option>
                    <option value="Em andamento">Em andamento</option>
                  </select>
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>

              <button type="submit" form="formCadastro" className="btn btn-primary">
                Salvar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}