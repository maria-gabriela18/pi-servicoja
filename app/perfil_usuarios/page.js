import "./perfil_usuarios.css";

export default function Login() {
    return (

        <div className="card">

            <h1> Editar perfil </h1>

            <hr/> <br />

            <div className="row">

                <div className="col-2">
                    <img className="rounded-circle" width="40" src="https:placehold.co/150" />
                </div>

                <div className="col-10">
                <h3> Nome completo </h3>
                </div>

            </div>

            <br/>

            <div className="text-center row">

                <div className="col-6">
                    <button className="btn btn-primary">Salvar alterações</button>
                </div>

                <div className="col-6">
                    <button className="btn btn-danger">Cancelar</button>
                </div>
            </div>

        </div>



    )
}