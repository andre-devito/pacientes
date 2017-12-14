var titulo = document.querySelector(".titulo");
titulo.textContent = "Cadastro de Pacientes";
titulo.addEventListener("click", alertTeste);

// Teste
var titulo = document.querySelector("h1");
console.log(titulo.classList);

var botaoAdicionar = document.querySelector("#botao-paciente");
botaoAdicionar.addEventListener("click", addRegistroTabela);
calcImcTabela();

function alertTeste(event) {
	event.preventDefault();
	window.alert("click ok!!!");
}

function addRegistroTabela(event) {
	event.preventDefault();
	
	var tabela = document.querySelector("#tabela-pacientes");
	var form = document.querySelector("#form-adicionar");
	
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");
	
	var nome = form.nome.value;
	var nomeTd = document.createElement("td");
	nomeTd.classList.add("info-nome");
	nomeTd.textContent = nome;	
	pacienteTr.appendChild(nomeTd);
	
	var peso = form.peso.value;
    var pesoTd = document.createElement("td");
	pesoTd.classList.add("info-peso");
	pesoTd.textContent = peso;
	pacienteTr.appendChild(pesoTd);
	
    var altura = form.altura.value;
	var alturaTd = document.createElement("td");
	alturaTd.classList.add("info-altura");
	alturaTd.textContent = altura;
	pacienteTr.appendChild(alturaTd);

	var gordura = form.gordura.value;
    var gorduraTd = document.createElement("td");
	gorduraTd.classList.add("info-gordura");
	gorduraTd.textContent = gordura;
	pacienteTr.appendChild(gorduraTd);
	
	var imc = 0;
    var imcTd = document.createElement("td");	
	imcTd.classList.add("info-imc");
	imcTd.textContent = imc.toFixed(2);
	pacienteTr.appendChild(imcTd);
	
	tabela.appendChild(pacienteTr);
	
	calcImcTabela();
}

function calcImcTabela() {
	var pacientes = document.querySelectorAll(".paciente");

	for (var i = 0; i < pacientes.length; i++) {

		var paciente = pacientes[i];

		var tdPeso = paciente.querySelector(".info-peso");
		var peso = tdPeso.textContent;

		var tdAltura = paciente.querySelector(".info-altura");
		var altura = tdAltura.textContent;	
		
		var tdImc = paciente.querySelector(".info-imc");
		
		if ((peso < 20) || (peso > 250)) {
			tdImc.textContent = "Peso Inválido";
			paciente.classList.add("paciente-invalido")
			// paciente.style.color = "#000000";
			// paciente.style.backgroundColor = "#FFEEEE";
		} else if ((altura < 1) || (altura > 2.5)) {
			tdImc.textContent = "Altura Inválida";
			paciente.classList.add("paciente-invalido")
		} else {
			var imc = peso / (altura * altura);
			tdImc.textContent = imc.toFixed(2);	
		}
	
	}
}
