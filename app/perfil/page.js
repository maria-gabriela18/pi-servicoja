export default function PerfilPrestador() {
    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>

            {/* Botão voltar */}
            <a href="#" className="btn btn-outline-secondary btn-sm mb-4">
                ← Voltar
            </a>

            {/* Card principal */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">

                <div className="d-flex align-items-center gap-4 flex-wrap">
                    <img
                        src="https://placehold.co/100x100"
                        className="rounded-circle"
                        width="100"
                        height="100"
                        alt="Foto do prestador"
                    />

                    <div className="flex-grow-1">
                        <h2 className="mb-1">Carlos Mendes</h2>

                        <span
                            className="badge px-3 py-2 rounded-pill mb-2"
                            style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
                        >
                            Elétrica
                        </span>

                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <small className="text-muted">📍 São Carlos, SP</small>
                            <small className="text-muted">🕐 8 anos de experiência</small>
                        </div>
                    </div>

                    {/* Nota */}
                    <div
                        className="text-center p-3 rounded-3"
                        style={{ backgroundColor: "#f0fdf4" }}
                    >
                        <div className="fs-2 fw-bold text-success">4.8</div>
                        <div style={{ color: "#f59e0b", fontSize: "18px" }}>
                            ★★★★★
                        </div>
                        <small className="text-muted">24 avaliações</small>
                    </div>
                </div>

                <hr />

                <p className="text-secondary mb-0" style={{ lineHeight: "1.7" }}>
                    Eletricista com mais de 8 anos de experiência em instalações residenciais e comerciais.
                    Especializado em quadros de distribuição, automação residencial e eficiência energética.
                    Todos os serviços realizados com emissão de laudo técnico e garantia de 12 meses.
                </p>

            </div>

            {/* Métricas */}
            <div className="row g-3 mb-4">
                <div className="col-4">
                    <div className="card border-0 rounded-3 p-3 text-center" style={{ backgroundColor: "#f8fafc" }}>
                        <div className="fs-4 fw-bold">24</div>
                        <small className="text-muted">Serviços realizados</small>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card border-0 rounded-3 p-3 text-center" style={{ backgroundColor: "#f8fafc" }}>
                        <div className="fs-4 fw-bold text-warning">4.8</div>
                        <small className="text-muted">Nota média</small>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card border-0 rounded-3 p-3 text-center" style={{ backgroundColor: "#f8fafc" }}>
                        <div className="fs-4 fw-bold text-success">8 anos</div>
                        <small className="text-muted">Experiência</small>
                    </div>
                </div>
            </div>

            {/* Avaliações */}
            <h4 className="mb-3">Avaliações de clientes</h4>

            <div className="d-flex flex-column gap-3">

                {/* Avaliação 1 */}
                <div className="card border-0 shadow-sm rounded-3 p-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <img src="https://placehold.co/40x40" className="rounded-circle" width="40" height="40" alt="Cliente" />

                        <div>
                            <strong>Ana Paula</strong>
                            <div style={{ color: "#f59e0b" }}>★★★★★</div>
                        </div>

                        <small className="text-muted ms-auto">12/03/2025</small>
                    </div>

                    <p className="mb-0 text-secondary" style={{ lineHeight: "1.7" }}>
                        Excelente profissional! Chegou no horário, resolveu tudo rapidinho e ainda explicou o que foi feito. Super recomendo.
                    </p>
                </div>

                {/* Avaliação 2 */}
                <div className="card border-0 shadow-sm rounded-3 p-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <img src="https://placehold.co/40x40" className="rounded-circle" width="40" height="40" alt="Cliente" />

                        <div>
                            <strong>Roberto Silva</strong>
                            <div style={{ color: "#f59e0b" }}>★★★★☆</div>
                        </div>

                        <small className="text-muted ms-auto">28/02/2025</small>
                    </div>

                    <p className="mb-0 text-secondary" style={{ lineHeight: "1.7" }}>
                        Bom serviço, atendimento rápido. Só demorou um pouco mais do que o prazo combinado, mas o resultado ficou ótimo.
                    </p>
                </div>

                {/* Avaliação 3 */}
                <div className="card border-0 shadow-sm rounded-3 p-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <img src="https://placehold.co/40x40" className="rounded-circle" width="40" height="40" alt="Cliente" />

                        <div>
                            <strong>Fernanda Costa</strong>
                            <div style={{ color: "#f59e0b" }}>★★★★★</div>
                        </div>

                        <small className="text-muted ms-auto">10/02/2025</small>
                    </div>

                    <p className="mb-0 text-secondary" style={{ lineHeight: "1.7" }}>
                        Contratei para trocar o quadro elétrico inteiro. Trabalho impecável, limpou tudo depois e ainda deu dicas para economizar energia. Com certeza vou contratar de novo.
                    </p>
                </div>

            </div>

        </div>
    )
}
