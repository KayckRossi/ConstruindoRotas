// Modifique a função navHome para aceitar o nome do usuário como um argumento
function navHome(nomeUsuario) {
    const nav = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Cadastro de Peças</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Estoque</a>
                    </li>
                   
                </ul>

                <h4 class="nav-item me-3"><a class="nav-link" id="NomeLogin" href="#">${nomeUsuario}</a></h4>
                <form class="d-flex " role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>`;
    return nav;
}

$(function() {
    // Obtenha o nome do usuário da sessão do navegador
    let nomeUsuario = sessionStorage.getItem('nomeUsuario');
    $('#home-nav').prepend(navHome(nomeUsuario));
});
