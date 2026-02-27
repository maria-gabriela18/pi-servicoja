import Link from "next/link";
import "./cadastro_usuarios.css";

export default function Cadastro() {
    return (

        <div className="card">

            <h1> Criar conta </h1>

            <br />

            <div class="row">

                <div class="col-6">

                    <p> Nome: </p>
                    <input class="form-control" placeholder="Seu nome completo" />

                </div>

                <div class="col-6">

                    <p> E-mail: </p>
                    <input  class="form-control" placeholder="seu@email.com" />

                </div>

            </div>

            <br />

            <div class="row">

            <div class="col-4">
            <p> CPF: </p>
            <input class="form-control" placeholder="00011122233" />
            </div>

            <div class="col-4">
            <p> Data de Nascimento: </p>
            <input class="form-control" type="date" />
            </div>

            <div class="col-4">
            <p> Telefone: </p>
            <input class="form-control" placeholder="11999998888" type="tel" />
            </div>

            </div>

            <br />

            <p> Endereço: </p>
            <input class="form-control" placeholder="Rua, Bairro, Cidade" minlength="10" />

            <br />

            <p> Insira sua senha: </p>
            <input class="form-control" type="password" placeholder="•••••••" />

            <br/>

            <div className="demo">
                <strong>Sua senha deve conter:</strong><br /><br/>
                <p>
                    • 8 e 12 caracteres;<br />
                    • Ao menos uma letra maiúscula;<br />
                    • Ao menos 1 caratere especial (@; *; #);<br />
                    • Ao menos 4 números.
                </p>
            </div>

            <br />

            <div class="text-center row">

                <div class="col-6">
                <Link href="dashboard"> <button class="btn btn-primary">Cadastrar</button> </Link>
                </div>

                <div class="col-6">
                <Link k href="login_usuarios"> <button class="btn btn-danger">Cancelar</button> </Link>
                </div>

            </div>

        </div>
    )
}