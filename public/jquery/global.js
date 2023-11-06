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
        e.preventDefault(); // Impedir o envio padrão do formulário
    
        // Obtenha os dados do formulário
        var email = $('#email').val();
        var senha = $('#senha').val();
    
        // Faça uma solicitação POST para o servidor
        $.post('/formulario/processar-formulario', { email: email, senha: senha })
            .done(function(data) {
                if (data.error === 'Este e-mail já está sendo usado.') {
                    // Exibe um alerta SweetAlert na mesma página
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                    });
                } else if (data === 'success') {
                    // Deixe o formulário ser enviado normalmente
                    $('#formcadastro').off('submit').submit(); // Envie o formulário
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
    
});
