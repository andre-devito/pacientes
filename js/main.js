function init() {

	var titulo = document.querySelector(".titulo");
	titulo.textContent = "Cadastro de Pacientes";
	titulo.addEventListener("click", alertTeste);

	// Teste
	var titulo = document.querySelector("h1");
	console.log(titulo.classList);

	var botaoAdicionar = document.querySelector("#botao-paciente");
	botaoAdicionar.addEventListener("click", addRegistroTabela);

	cleanErrors();
	fillImcTabela();

	var form = document.querySelector("#form-adicionar");
	form.reset();

}

function alertTeste(event) {
	event.preventDefault();
	window.alert("click ok!!!");
}

function fillImcTabela() {
	var trPacientes = document.querySelectorAll(".paciente");

	for (var i = 0; i < trPacientes.length; i++) {

		var trPaciente = trPacientes[i];
		var paciente = getPacienteFromRegTabela(trPaciente);	
		var tdImc = trPaciente.querySelector(".info-imc");
		
		var erros = validPaciente(paciente);

		if (erros.length > 0) {
			tdImc.textContent = "-";
			trPaciente.classList.add("paciente-invalido")
		} else {
			var imc = calcImcByPaciente(paciente);
			tdImc.textContent = imc.toFixed(2);
		}
	
	}
}

function addRegistroTabela(event) {
	event.preventDefault();

	cleanErrors();
	
	var tabela = document.querySelector("#tabela-pacientes");
	var form = document.querySelector("#form-adicionar");
	var paciente = getPacienteFromForm(form);
	
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");
	
	var nomeTd = document.createElement("td");
	nomeTd.classList.add("info-nome");
	nomeTd.textContent = paciente.nome;	
	pacienteTr.appendChild(nomeTd);
	
    var pesoTd = document.createElement("td");
	pesoTd.classList.add("info-peso");
	pesoTd.textContent = paciente.peso;
	pacienteTr.appendChild(pesoTd);
	
	var alturaTd = document.createElement("td");
	alturaTd.classList.add("info-altura");
	alturaTd.textContent = paciente.altura;
	pacienteTr.appendChild(alturaTd);

    var gorduraTd = document.createElement("td");
	gorduraTd.classList.add("info-gordura");
	gorduraTd.textContent = paciente.gordura;
	pacienteTr.appendChild(gorduraTd);
	
    var imcTd = document.createElement("td");	
	imcTd.classList.add("info-imc");
	imcTd.textContent = paciente.imc.toFixed(2);
	pacienteTr.appendChild(imcTd);
	
	var erros = validPaciente(paciente);

	if (erros.length > 0) {
		showErrors(erros);
	} else {
		tabela.appendChild(pacienteTr);
		fillImcTabela();
		form.reset();
	}
}

function getPacienteFromRegTabela(trPaciente) {

	var tdNome = trPaciente.querySelector(".info-nome");
	var tdPeso = trPaciente.querySelector(".info-peso");
	var tdAltura = trPaciente.querySelector(".info-altura");
	var tdGordura = trPaciente.querySelector(".info-gordura");

	var paciente = {
		nome: tdNome.textContent,
		peso: tdPeso.textContent,
		altura: tdAltura.textContent,
		gordura: tdGordura.textContent,
		imc: 0
	}
	
	return paciente;

}

function getPacienteFromForm(form) {

	var paciente = {
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: 0
	}
	
	return paciente;

}

function validPaciente(paciente) {

	var erros = [];

	if (paciente.nome.length == 0) {
		erros.push("O campo Nome deve ser preenchido");
	}

	if (paciente.peso.length == 0) {
		erros.push("O campo Peso deve ser preenchido");
	}

	if ((paciente.peso < 20) || (paciente.peso > 250)) {
		erros.push("O campo Peso está inválido");
	}

	if (paciente.altura.length == 0) {
		erros.push("O campo Altura deve ser preenchido");
	}

	if ((paciente.altura < 1) || (paciente.altura > 2.5)) {
		erros.push("O campo Altura está inválido");
	}

	return erros;

}

function cleanErrors(erros) {

	var ul = document.querySelector("#mensagens-erro");
	ul.innerHTML = "";

}

function showErrors(erros) {
	
	var ul = document.querySelector("#mensagens-erro");

	erros.forEach(function(erro) { 

		var li = document.createElement("li");
		li.textContent = erro;
		ul.appendChild(li);

	});

	var br = document.createElement("br");
	ul.appendChild(br);
	ul.appendChild(br);

}

function showErrorsAux(erros) {
	
	var ul = document.querySelector("#mensagens-erro");

	for (var i=0; i<erros.length; i++) {

		var erro = erros[i];
		var li = document.createElement("li");
		li.textContent = erro;
		ul.appendChild(li);

	}

	var br = document.createElement("br");
	ul.appendChild(br);
	ul.appendChild(br);

}


