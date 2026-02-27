import Link from "next/link";

export default function CadPrest() {
  return (
    <div class="col-8 mx-auto mt-5 border border-secondary">
      <div class="text-center mx-auto mt-3" >
        <h2>Cadastro de prestador</h2>
      </div>


      <form class="row g-3 mx-auto mt-5 p-4 border rounded">
        <div class="col-md-12">
          <label class="form-label">
            Nome completo
          </label>
          <input class="form-control" />
        </div>

        <div class="col-md-12">
          <label class="form-label">
            E-mail
          </label>
          <input type="email" class="form-control" />
        </div>

        <div class="col-12">
          <label class="form-label">
            Endereço
          </label>
          <input class="form-control" placeholder="Av São Carlos 223, centro" />
        </div>

        <div class="col-md-12">
          <label class="form-label">
            Cidade
          </label>
          <input type="text" class="form-control" />
        </div>

        <div class="col-md-12">
          <label class="form-label">
            Estado
          </label>
          <select class="form-select">
            <option selected>Rio de Janeiro</option>
            <option>São Paulo</option>
            <option>Minas Gerais</option>
            <option>Pernambuco</option>
            <option>Amazonas</option>
            <option>Sergipe</option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputZip" class="form-label">
            CEP
          </label>
          <input type="text" class="form-control" id="inputZip" />
        </div>

        <div class="col-md-12">
          <label class="form-label">
            Senha
          </label>
          <input class="form-control" />
        </div>

        <div class="col-12">
          <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Cadastrar
            </button>
          </div>
        </div>

      </form>


    </div>

  )
}

