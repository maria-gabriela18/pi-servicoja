import Link from "next/link";
import "./login_usuario.css";

export default function Login() {
    return (


        <div className="card">


            <h1> Login </h1>

            <hr/> <br />

            <p> Insira seu e-mail: </p>
            <input class="form-control" type="email" placeholder="seu@email.com" />

            <br />

            <p> Insira sua senha: </p>
            <input class="form-control" type="password" placeholder="•••••••" />

            <br /><br />

            <div className="botaoEntrarLogin">
            <Link href="dashboard"> <button class="btn btn-primary">Entrar</button> </Link>
            </div>

            <br />

            <div className="semconta">
                <Link href="cadastro_usuarios" > Não tem conta? Criar </Link>
            </div>

        
        </div>


    )
}