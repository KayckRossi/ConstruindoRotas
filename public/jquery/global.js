function adicionarNavbar(elementoId, caminhoCadastro, caminhoLogin) {
    $(elementoId).append('<nav class="navbar navbar-expand-lg bg-body-tertiary">'+
    '<div class="container-fluid">'+
    '<a class="navbar-brand" href="' + caminhoCadastro + '">Cadastro</a>'+
    '<a class="navbar-brand" href="' + caminhoLogin + '">Login</a>'+
    '</div>'+
    '</nav>');
};

$(function() {
    adicionarNavbar('#header', '/formulario', '/login');

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
        
        console.log('E-mail: ' + email);
        console.log('Senha: ' + senha);
    
        if (email === "" || senha === "") {
            console.log('Campos vazios detectados.');
            swal("Erro", "Por favor, preencha todos os campos.", "error");
        } else {
            console.log('Enviando solicitação POST para /autenticacao/login');
            $.post('/autenticacao/login', { email: email, senha: senha })
                .done(function(data) {
                    console.log('Resposta recebida:', data);
                    if (data.error) {
                        console.log('Erro detectado na resposta.');
                        swal("Erro", data.error, "error");
                    } else {
                        console.log('Sucesso detectado na resposta.');
                        window.location.href = '/sucesso.html';
                    }
                })
                .fail(function() {
                    console.log('Falha ao enviar a solicitação POST.');
                    swal("Erro", "Ocorreu um erro ao processar o login.", "error");
                });
        }
    });
    
    
});
