function ListagemDemanda() {

  const demandas = [
    { cliente: "João Silva", descricao: "Instalação de ar-condicionado", localizacao: "São Paulo - SP", status: "Aberto" },
    { cliente: "Maria Oliveira", descricao: "Manutenção elétrica", localizacao: "Rio de Janeiro - RJ", status: "Em andamento" },
    { cliente: "Carlos Souza", descricao: "Reforma de cozinha", localizacao: "Belo Horizonte - MG", status: "Finalizado" },
    { cliente: "Ana Lima", descricao: "Pintura externa", localizacao: "Curitiba - PR", status: "Aberto" },
    { cliente: "Pedro Santos", descricao: "Instalação de câmeras", localizacao: "Salvador - BA", status: "Em andamento" },
    { cliente: "Juliana Rocha", descricao: "Conserto hidráulico", localizacao: "Fortaleza - CE", status: "Finalizado" },
    { cliente: "Lucas Almeida", descricao: "Desenvolvimento de site", localizacao: "Recife - PE", status: "Aberto" },
    { cliente: "Fernanda Costa", descricao: "Manutenção de computador", localizacao: "Porto Alegre - RS", status: "Finalizado" },
    { cliente: "Bruno Martins", descricao: "Limpeza pós-obra", localizacao: "Brasília - DF", status: "Em andamento" },
    { cliente: "Camila Ferreira", descricao: "Instalação de piso", localizacao: "Manaus - AM", status: "Aberto" },
    { cliente: "Rafael Gomes", descricao: "Troca de telhado", localizacao: "Natal - RN", status: "Finalizado" },
    { cliente: "Patrícia Alves", descricao: "Instalação de portão eletrônico", localizacao: "Florianópolis - SC", status: "Em andamento" },
    { cliente: "Diego Ribeiro", descricao: "Montagem de móveis", localizacao: "Goiânia - GO", status: "Aberto" },
    { cliente: "Larissa Mendes", descricao: "Projeto arquitetônico", localizacao: "Vitória - ES", status: "Finalizado" },
    { cliente: "Thiago Carvalho", descricao: "Consultoria financeira", localizacao: "Campo Grande - MS", status: "Em andamento" },
    { cliente: "Aline Barbosa", descricao: "Instalação de energia solar", localizacao: "Maceió - AL", status: "Aberto" },
    { cliente: "Gustavo Pinto", descricao: "Reparo em fachada", localizacao: "Teresina - PI", status: "Finalizado" },
    { cliente: "Renata Dias", descricao: "Criação de logotipo", localizacao: "Aracaju - SE", status: "Em andamento" },
    { cliente: "Marcelo Nunes", descricao: "Automação residencial", localizacao: "João Pessoa - PB", status: "Aberto" },
    { cliente: "Beatriz Teixeira", descricao: "Instalação de drywall", localizacao: "Cuiabá - MT", status: "Finalizado" }
  ];

  console.log(demandas);

  return (
    <div>
      <h1> Lista de demandas </h1>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Localização</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            demandas.map(
              item => <tr>
                <td>{item.cliente}</td>
                <td>{item.descricao}</td>
                <td>{item.localizacao}</td>
                <td>{item.status}</td>
              </tr>
            )
          }
        </tbody>
      </table>


      <h2>Listagem de Demandas</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Localização</th>
            <th>Status</th>
          </tr>
        </thead>

      </table>

            

    </div>
  );
}

export default ListagemDemanda;