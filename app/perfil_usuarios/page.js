import "./perfil_usuarios.css";

export default function Login() {
    return (

        <div className="card">

            <h1> Editar perfil </h1>

            <br />

            <div class="row">

                <div class="col-2">
                    <img class="rounded-circle" width="90" src="https:placehold.co/150" />
                </div>

                <div className="nomeCompleto" class="col-10">
                <h3> Nome completo </h3>
                </div>

            </div>

            <div class="text-center row">

                <div class="col-6">
                    <button class="btn btn-primary">Salvar alterações</button>
                </div>

                <div class="col-6">
                    <button class="btn btn-danger">Cancelar</button>
                </div>
            </div>

        </div>



    )
}