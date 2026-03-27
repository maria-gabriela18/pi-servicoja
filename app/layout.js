import "../globais.css";
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from "next/script";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServiceHub",
  description: "Plataforma de serviços",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="header">
          <div className="menuNav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/listagem_prestadores">Prestadores</Link></li>
              <li><Link href="/listagem_demandas">Demandas</Link></li>
              <li><Link href="/adimini_prest">Dashboard</Link></li>
              <li><Link href="/demanda_cadastro">Cadastrar</Link></li>
              <li><Link href="/info_demanda">informacão demanda</Link></li>
            </ul>
          </div>

          <div className="acoesHeader">
            <Link href="login_usuarios">
              <button><i className="bi bi-box-arrow-in-right"></i>Login</button>
            </Link>
            <Link href="cadastro_usuarios">
              <button><i className="bi bi-person-plus"></i>Cadastro</button>
            </Link>
          </div>
        </header>

        {children}

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}