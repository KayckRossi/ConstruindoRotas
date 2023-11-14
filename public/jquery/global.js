// Função para validar CPF
function validaCPF(cpf) {
    var soma = 0;
    var resto;

    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Função para validar CNPJ
function validaCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

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

$(function () {
    $("#divCnpj").hide();
    adicionarNavbar('#header', '/formulario', '/login');
    estaLogado = true;
    //criarSidebar();
    // Adicione esta função para fazer um campo piscar
    // Adicione esta função para fazer um campo piscar
// Adicione esta função para fazer um campo piscar
function blinkErrorField(field) {
    field.css('border', '2px solid red');
    setTimeout(function() {
        field.css('border', '');
    }, 500);
}

$('#formcadastro').on('submit', function(e) {
    e.preventDefault();

    var email = $('#email');
    var senha = $('#senha');
    var cpf = $('#CadCpf');
    var cnpj = $('#CadCnpj');
    var nome = $('#NomeCad');

    // Verifique se os campos estão vazios
    if (!email.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha o campo de e-mail.',
        }).then(function() {
            email.focus();
            blinkErrorField(email);
        });
        return false;
    } else if (!senha.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha o campo de senha.',
        }).then(function() {
            senha.focus();
            blinkErrorField(senha);
        });
        return false;
    } else if (!nome.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha o campo de nome.',
        }).then(function() {
            nome.focus();
            blinkErrorField(nome);
        });
        return false;
    } else if (document.getElementById('inlineRadio1').checked && !cpf.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha o campo de CPF.',
        }).then(function() {
            cpf.focus();
            blinkErrorField(cpf);
        });
        return false;
    } else if (document.getElementById('inlineRadio2').checked && !cnpj.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha o campo de CNPJ.',
        }).then(function() {
            cnpj.focus();
            blinkErrorField(cnpj);
        });
        return false;
    }

    // Validação de CPF e CNPJ
    if (document.getElementById('inlineRadio1').checked) {
        if (!validaCPF(cpf.val())) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CPF inválido!',
            }).then(function() {
                cpf.focus();
                blinkErrorField(cpf);
            });
            return false;
        }
    } else if (document.getElementById('inlineRadio2').checked) {
        if (!validaCNPJ(cnpj.val())) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CNPJ inválido!',
            }).then(function() {
                cnpj.focus();
                blinkErrorField(cnpj);
            });
            return false;
        }
    }

    // Faça uma solicitação POST para o servidor
    $.post('/formulario/processar-formulario', { email: email.val(), senha: senha.val(), cpf: cpf.val(), cnpj: cnpj.val(), nome: nome.val() })
        .done(function(data) {
            if (data.error) {
                // Exibe um alerta SweetAlert na mesma página
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error,
                }).then(function() {
                    if (data.error.includes('email')) {
                        email.focus();
                        blinkErrorField(email);
                    } else if (data.error.includes('senha')) {
                        senha.focus();
                        blinkErrorField(senha);
                    } else if (data.error.includes('nome')) {
                        nome.focus();
                        blinkErrorField(nome);
                    } else if (data.error.includes('CPF')) {
                        cpf.focus();
                        blinkErrorField(cpf);
                    } else if (data.error.includes('CNPJ')) {
                        cnpj.focus();
                        blinkErrorField(cnpj);
                    }
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


    $('input[type=radio][name=radioCnpj-cpf]').on('click', function () {
        if (this.value == 'option1') {
            $('#divCnpj').fadeOut(500, function () {
                $('#divCpf').fadeIn(500);
            });
        }
        else if (this.value == 'option2') {
            $('#divCpf').fadeOut(500, function () {
                $('#divCnpj').fadeIn(500);
            });
        }
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
