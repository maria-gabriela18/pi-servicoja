function ListPrest() {

    const prestadores = [
        {
            nome: "Maria Silva",
            email: "maria.silva@email.com",
            senha: "Maria@123",
            dataNascimento: "1998-04-12",
            localizacao: "São Paulo - SP",
            cpf: "123.456.789-01",
            telefone: "(11) 98765-4321"
        },
        {
            nome: "João Pereira",
            email: "joao.pereira@email.com",
            senha: "Joao@456",
            dataNascimento: "1995-09-23",
            localizacao: "Rio de Janeiro - RJ",
            cpf: "234.567.890-12",
            telefone: "(21) 97654-3210"
        },
        {
            nome: "Ana Costa",
            email: "ana.costa@email.com",
            senha: "Ana@789",
            dataNascimento: "2000-01-15",
            localizacao: "Belo Horizonte - MG",
            cpf: "345.678.901-23",
            telefone: "(31) 96543-2109"
        },
        {
            nome: "Carlos Mendes",
            email: "carlos.mendes@email.com",
            senha: "Carlos@321",
            dataNascimento: "1992-07-30",
            localizacao: "Curitiba - PR",
            cpf: "456.789.012-34",
            telefone: "(41) 95432-1098"
        },
        {
            nome: "Fernanda Rocha",
            email: "fernanda.rocha@email.com",
            senha: "Fer@654",
            dataNascimento: "1997-03-08",
            localizacao: "Porto Alegre - RS",
            cpf: "567.890.123-45",
            telefone: "(51) 94321-0987"
        },
        {
            nome: "Lucas Almeida",
            email: "lucas.almeida@email.com",
            senha: "Lucas@987",
            dataNascimento: "1999-11-20",
            localizacao: "Salvador - BA",
            cpf: "678.901.234-56",
            telefone: "(71) 93210-9876"
        },
        {
            nome: "Patrícia Lima",
            email: "patricia.lima@email.com",
            senha: "Paty@159",
            dataNascimento: "1994-06-17",
            localizacao: "Fortaleza - CE",
            cpf: "789.012.345-67",
            telefone: "(85) 92109-8765"
        },
        {
            nome: "Rafael Souza",
            email: "rafael.souza@email.com",
            senha: "Rafa@753",
            dataNascimento: "1996-12-02",
            localizacao: "Recife - PE",
            cpf: "890.123.456-78",
            telefone: "(81) 91098-7654"
        },
        {
            nome: "Juliana Martins",
            email: "juliana.martins@email.com",
            senha: "Ju@852",
            dataNascimento: "2001-08-14",
            localizacao: "Manaus - AM",
            cpf: "901.234.567-89",
            telefone: "(92) 99876-5432"
        },
        {
            nome: "Bruno Ferreira",
            email: "bruno.ferreira@email.com",
            senha: "Bru@951",
            dataNascimento: "1993-02-25",
            localizacao: "Florianópolis - SC",
            cpf: "012.345.678-90",
            telefone: "(48) 98765-1234"
        },
        {
            nome: "Camila Barros",
            email: "camila.barros@email.com",
            senha: "Cami@147",
            dataNascimento: "1998-10-05",
            localizacao: "Goiânia - GO",
            cpf: "135.246.357-91",
            telefone: "(62) 97654-2345"
        },
        {
            nome: "Eduardo Nunes",
            email: "eduardo.nunes@email.com",
            senha: "Edu@258",
            dataNascimento: "1991-05-19",
            localizacao: "Vitória - ES",
            cpf: "246.357.468-92",
            telefone: "(27) 96543-3456"
        },
        {
            nome: "Larissa Gomes",
            email: "larissa.gomes@email.com",
            senha: "Lari@369",
            dataNascimento: "2002-09-11",
            localizacao: "Campo Grande - MS",
            cpf: "357.468.579-93",
            telefone: "(67) 95432-4567"
        },
        {
            nome: "Thiago Ribeiro",
            email: "thiago.ribeiro@email.com",
            senha: "Thi@741",
            dataNascimento: "1990-04-28",
            localizacao: "Natal - RN",
            cpf: "468.579.680-94",
            telefone: "(84) 94321-5678"
        },
        {
            nome: "Beatriz Carvalho",
            email: "beatriz.carvalho@email.com",
            senha: "Bia@852",
            dataNascimento: "1999-12-07",
            localizacao: "João Pessoa - PB",
            cpf: "579.680.791-95",
            telefone: "(83) 93210-6789"
        }
    ];


    
    console.log(prestadores);

    return (
        <div>
            <h1> Listagem de prestadores cadastrados </h1>
            <hr />


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cep</th>
                        <th scope="col">Senha</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        prestadores.map(
                            item => <tr>
                                <th scope="row">{item.nome}</th>
                                <td>{item.telefone}</td>
                                <td>{item.email}</td>
                                <td>{item.endereço}</td>
                                <td>{item.cidade}</td>
                                <td>{item.estado}</td>
                                <td>{item.cep}</td>
                                <td>{item.senha}</td>
                            </tr>
                        )
                    }


                </tbody>
            </table>

        </div>
    );
}

export default ListPrest;


