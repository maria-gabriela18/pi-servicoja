import Link from "next/link";
import "../home.css";

export default function Page() {
  return (
    <div className="home-wrapper">

      {/* NAV */}
      <nav className="home-nav">
        <span className="home-logo"><span>Service</span>Hub</span>

        <ul>
          <li><a href="#home">Inicio</a></li>
          <li><a href="#funcionamento">como funciona?</a></li>
          <li><a href="#sobreNos">Sobre Nós</a></li>
          <li><a href="#categoria">categorias populares</a></li>
        </ul>
    
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-badge">
          <i className="bi bi-patch-check-fill"></i> Plataforma confiável de serviços
        </div>
        <h1>Encontre o profissional <span>certo</span> para o seu problema</h1>
        <p className="hero-sub">
          Conectamos você a prestadores verificados em todo o Brasil. Rápido, seguro e gratuito.
        </p>

        <div className="search-bar">
          <i className="bi bi-search search-icon"></i>
          <input placeholder="Que serviço você precisa? Ex: eletricista, encanador..." />
          <button>Buscar</button>
        </div>

        <div className="hero-cta">
          <Link href="/cadastro_usuarios">
            <button className="btn-primario">
              <i className="bi bi-plus-circle"></i> Solicitar serviço
            </button>
          </Link>
          <Link href="/cadastro_usuarios">
            <button className="btn-secundario">
              <i className="bi bi-briefcase"></i> Quero ser prestador
            </button>
          </Link>
        </div>

        <div className="hero-stats">
          <div><strong>+12 mil</strong><span>profissionais</span></div>
          <div className="stat-divider"></div>
          <div><strong>+50 mil</strong><span>serviços realizados</span></div>
          <div className="stat-divider"></div>
          <div><strong>4.9 <i className="bi bi-star-fill"></i></strong><span>avaliação média</span></div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="categorias-section" id="categoria">
        <p className="section-label">Categorias populares</p>
        <div className="categorias-grid">
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-hammer"></i>
            <span>Reforma e Construção</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-house-door"></i>
            <span>Serviços Domésticos</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-laptop"></i>
            <span>Tecnologia</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-heart-pulse"></i>
            <span>Saúde e Cuidados</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-car-front"></i>
            <span>Automotivo</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-megaphone"></i>
            <span>Marketing</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-balloon"></i>
            <span>Eventos e Festas</span>
          </Link>
          <Link href="/listagem_demandas" className="cat-card">
            <i className="bi bi-book"></i>
            <span>Educação</span>
          </Link>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="como-funciona" id="funcionamento">
        <p className="section-label">Como funciona</p>
        <h2 className="section-title">Simples assim</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">01</div>
            <div className="step-icon"><i className="bi bi-pencil-square"></i></div>
            <h3>Descreva o serviço</h3>
            <p>Conte o que você precisa em poucos segundos, sem burocracia.</p>
          </div>
          <div className="step-connector"><i className="bi bi-arrow-right"></i></div>
          <div className="step-card">
            <div className="step-num">02</div>
            <div className="step-icon"><i className="bi bi-people"></i></div>
            <h3>Receba propostas</h3>
            <p>Profissionais verificados enviam orçamentos direto para você.</p>
          </div>
          <div className="step-connector"><i className="bi bi-arrow-right"></i></div>
          <div className="step-card">
            <div className="step-num">03</div>
            <div className="step-icon"><i className="bi bi-check2-circle"></i></div>
            <h3>Escolha e contrate</h3>
            <p>Compare preços, avaliações e escolha o melhor negócio.</p>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="sobre-section" id="sobreNos">
        <div className="sobre-texto">
          <p className="section-label">Sobre nós</p>
          <h2 className="section-title">Nascemos para simplificar</h2>
          <p>
            Imprevistos acontecem o tempo todo. Quando menos esperamos, precisamos de um eletricista, um encanador, um técnico. O ServiceHub nasceu para resolver isso: de qualquer lugar, a qualquer hora, você cadastra o problema e profissionais prontos para ajudar aparecem. Fácil, rápido e gratuito.
          </p>
          <Link href="/cadastro_usuarios">
            <button className="btn-primario" style={{marginTop: "1.5rem"}}>
              Começar agora <i className="bi bi-arrow-right"></i>
            </button>
          </Link>
        </div>
        <div className="sobre-cards">
          <div className="sobre-stat">
            <i className="bi bi-shield-check"></i>
            <h4>Profissionais verificados</h4>
            <p>Todos os prestadores passam por verificação antes de atender.</p>
          </div>
          <div className="sobre-stat">
            <i className="bi bi-chat-dots"></i>
            <h4>Negociação direta</h4>
            <p>Fale direto com o profissional, sem intermediários.</p>
          </div>
          <div className="sobre-stat">
            <i className="bi bi-geo-alt"></i>
            <h4>Todo o Brasil</h4>
            <p>Profissionais disponíveis em centenas de cidades.</p>
          </div>
          <div className="sobre-stat">
            <i className="bi bi-cash-coin"></i>
            <h4>100% gratuito</h4>
            <p>Sem taxas para solicitar ou enviar propostas.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-inner">
          <span className="home-logo footer-logo"><span>Service</span>Hub</span>
          <p>© 2026 ServiceHub — Todos os direitos reservados</p>
          <div className="footer-links">
            <Link href="#">Termos</Link>
            <Link href="#">Privacidade</Link>
            <Link href="#">Contato</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}