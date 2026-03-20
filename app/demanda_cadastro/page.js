'use client';
import { useState } from "react";
import supabase from "../conexao/supabase";

export default function DemandaCadastro() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");

  async function salvar(e) {
    if (e) e.preventDefault();

    // Verificação de segurança para você não esquecer nada
    if (!titulo || !descricao || !status || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    const demanda = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoria: categoria,
      id_usuarios: 5, // ID fixo para teste, igual fizemos antes
      aberta: true    // RESOLVE O ERRO 8: diz que a demanda está ativa
    };

    const { error } = await supabase
      .from('demandas')
      .insert([demanda]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("FINALMENTE! Salvo com sucesso no banco.");
      // Limpa os campos para a próxima
      setTitulo("");
      setDescricao("");
      setStatus("");
      setCategoria("");
    }
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar que você pediu pra não tirar */}
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

        {/* Conteúdo Principal */}
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

          {/* Seção Suas Propostas */}
          <div className="card shadow-sm">
            <div className="card-header bg-white fw-bold">Suas propostas</div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>João fez uma proposta para você</span>
                  <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>ver</button>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Hugo Souza fez uma proposta para você</span>
                  <button className="btn btn-sm text-white" style={{ backgroundColor: "#2c5d7d" }}>ver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Corrigido */}
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
                    placeholder="Ex: Consertar torneira"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ex: Hidráulica"
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
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="Aberto">Aberto</option>
                    <option value="Em andamento">Em andamento</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="submit" form="formCadastro" className="btn btn-primary">Salvar Mudanças</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}