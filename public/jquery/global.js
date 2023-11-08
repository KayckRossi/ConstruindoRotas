function adicionarNavbar(elementoId, caminhoCadastro, caminhoLogin) {
    let navbar = `
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="${caminhoCadastro}">Cadastro</a>
            <a class="navbar-brand" href="${caminhoLogin}">Login</a>
        </div>
    </nav>`;
    $(elementoId).append(navbar);
};

var estaLogado = false;

function criarSidebar() {
    let sidebar = `
    <div id="sidebar">
        <ul class="sidebar-nav">
            <li><a href="/home">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
        </ul>
    </div>`;
    $('#sidebar').prepend(sidebar);
};

$(function() {
    adicionarNavbar('#header', '/formulario', '/login');
    estaLogado = true;
    //criarSidebar();
    // Quando o formulário é enviado...
    $('#formcadastro').on('submit', function(e) {
        e.preventDefault();
    
        // Obtenha os dados do formulário
        var email = $('#email').val();
        var senha = $('#senha').val();
    
        // Faça uma solicitação POST para o servidor
        $.post('/formulario/processar-formulario', { email: email, senha: senha })
            .done(function(data) {
                if (data.error) {
                    // Exibe um alerta SweetAlert na mesma página
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                    });
                } else if (data.success) {
                    // Redireciona para a página de login
                    window.location.href = '/login';
                    
                } else {
                    // Trata outros erros
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocorreu um erro desconhecido.',
                    });
                }
            })
            .fail(function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocorreu um erro ao processar o formulário.',
                });
            });
    });
    

    $('#formsLogin').on('submit', function(e) {
        e.preventDefault();
    
        var email = $('#email').val();
        var senha = $('#senha').val();
        
        if (email === "" || senha === "") {
            Swal.fire("Erro", "Por favor, preencha todos os campos.", "error");
        } else {
            $.post('/autenticacao/login', { email: email, senha: senha })
                .done(function(data) {
                    if (data.error) {
                        Swal.fire("Erro", data.error, "error");
                    } else {
                        window.location.href = '/sucesso.html';
                    }
                })
                .fail(function() {
                    Swal.fire("Erro", "Email ou senha incorretos", "error");
                });
        }
    });
    
    
    
});
