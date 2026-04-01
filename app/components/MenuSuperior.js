'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuSuperior(){

    const [id_usuario, setIdUsuario] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("id_usuario");
        setIdUsuario(id);
    }, []);

    return(
        <header className="header">
          <div className="menuNav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/listagem_prestadores">Prestadores</Link></li>
              <li><Link href="/listagem_demandas">Demandas</Link></li>
            </ul>
          </div>

          <div className="acoesHeader">
            {
                id_usuario == null ? (
                    <>
                        <Link href="/login_usuarios">
                            <button><i className="bi bi-box-arrow-in-right"></i> Login</button>
                        </Link>
                        <Link href="/cadastro_usuarios">
                            <button><i className="bi bi-person-plus"></i> Cadastro</button>
                        </Link>
                    </>
                ) : (
                    <Link href="/painel">
                        <button><i className="bi bi-person-plus"></i> Meu perfil</button>
                    </Link>
                )
            }
          </div>
        </header>
    )
}