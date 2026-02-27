import "./login_usuario.css";

export default function Login() {
    return (


        <div className="card">


            <h1> Login </h1>

            <br />

            <p> Insira seu e-mail: </p>
            <input class="form-control" type="email" placeholder="seu@email.com" />

            <br />

            <p> Insira sua senha: </p>
            <input class="form-control" type="password" placeholder="•••••••" />

            <br /><br />

            <button class="btn btn-primary">Entrar</button>

            <br />

            <div className="semconta">
                <a href="./cadastro_usuarios">Não tem conta? Criar</a>
            </div>

        
        </div>


    )
}