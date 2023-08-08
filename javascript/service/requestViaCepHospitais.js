function limpa_formulário_cep() {
    document.getElementById('inputName').value = ("");
    document.getElementById('inputEmail').value = ("");
    document.getElementById('inputCNPJ').value = ("");
    document.getElementById('inputTel').value = ("");
    document.getElementById('inputCNES').value = ("");
    document.getElementById('inputCep').value = ("");
    document.getElementById('inputRua').value = ("");
    document.getElementById('inputNumero').value = ("");
    document.getElementById('inputBairro').value = ("");
    document.getElementById('inputCidade').value = ("");
    document.getElementById('inputEstado').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('inputRua').value = (conteudo.logradouro);
        document.getElementById('inputBairro').value = (conteudo.bairro);
        document.getElementById('inputCidade').value = (conteudo.localidade);
        document.getElementById('inputEstado').value = (conteudo.uf);
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('inputRua').value = ("...");
            document.getElementById('inputBairro').value = ("...");
            document.getElementById('inputCidade').value = ("...");
            document.getElementById('inputEstado').value = ("...");

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
};