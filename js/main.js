function init() {

	var titulo = document.querySelector(".titulo");
	titulo.textContent = "Cadastro de Pacientes";
	titulo.addEventListener("click", alertTeste);

	// Teste
	var titulo = document.querySelector("h1");
	console.log(titulo.classList);

	var campoFiltro = document.querySelector("#pesquisar-tabela");
	// campoFiltro.reset();
	campoFiltro.addEventListener("input", filterRegistroTabela);

	var campoPesquisa = document.querySelector("#buscar-paciente");
	campoPesquisa.addEventListener("click", searchRegistroTabela);

	// var tabelaPacientes = document.querySelector("table");
	var tabelaPacientes = document.querySelector("#tabela-pacientes");
	tabelaPacientes.addEventListener("dblclick", removeRegistroTabela);

	// var pacientes = document.querySelectorAll(".paciente");
	// pacientes.forEach(function(paciente) {
		// paciente.addEventListener("dblclick", removeRegistroTabela);
	//});

	var botaoAdicionar = document.querySelector("#botao-paciente");
	botaoAdicionar.addEventListener("click", addRegistroTabela);

	clearErrors();
	clearErrorsAjax();
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

function addPacienteTabela(paciente) {
	var pacienteTr = createRegistroTabela(paciente);
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);
}

function createRegistroTabela(paciente) {
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

	return pacienteTr;
}

function addRegistroTabela(event) {
	event.preventDefault();

	clearErrors();
	
	var tabela = document.querySelector("#tabela-pacientes");
	var form = document.querySelector("#form-adicionar");
	var paciente = getPacienteFromForm(form);
	
	var pacienteTr = createRegistroTabela(paciente);
	
	var erros = validPaciente(paciente);

	if (erros.length > 0) {
		showErrors(erros);
	} else {
		tabela.appendChild(pacienteTr);
		fillImcTabela();
		form.reset();
	}
}

function removeRegistroTabela(event) {
	// this.remove();
	var targetTd = event.target;
	var targetTr = targetTd.parentNode;
	targetTr.classList.add("fadeOut");

	setTimeout(function() {
		targetTr.remove();
	}, 500);
	// targetTr.remove();
}

function filterRegistroTabela(event) {
	var textoDigitado = this.value;
	var expressao = new RegExp(textoDigitado, "i");
	var pacientes = document.querySelectorAll(".paciente");

	if (textoDigitado.length > 0) {
		for (var i=0; i<pacientes.length; i++) {
			var paciente = pacientes[i];
			var nomeTd = paciente.querySelector(".info-nome");
			var nome = nomeTd.textContent;
			if (!expressao.test(nome)) {
				paciente.classList.add("invisivel");
			} else {
				paciente.classList.remove("invisivel");
			}
		}
	} else {
		for (var i=0; i<pacientes.length; i++) {
			var paciente = pacientes[i];
			paciente.classList.remove("invisivel");
		}
	}
}

function searchRegistroTabela(event) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
	xhr.addEventListener("load", function() {
		if (xhr.status == 200) {
			clearErrorsAjax();

	        	var resposta = xhr.responseText;
	        	var pacientes = JSON.parse(resposta);

	        	pacientes.forEach(function(paciente) {
	            		addPacienteTabela(paciente);
	        	});
		} else {
			showErrorsAjax();

			console.log(xhr.status);
			console.log(xhr.responseText);

	        	// console.log(resposta);
	        	// console.log(typeof resposta);

	        	// console.log(pacientes);
	        	// console.log(typeof pacientes);
		}
	});
	xhr.send();
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

function clearErrors(erros) {

	var ul = document.querySelector("#mensagens-erro");
	ul.innerHTML = "";

}

function clearErrorsAjax() {

	var span = document.querySelector("#erro-ajax");
	span.classList.add("invisivel");

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

function showErrorsAjax() {

	var span = document.querySelector("#erro-ajax");
	span.classList.remove("invisivel");

}



