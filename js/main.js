var titulo = document.querySelector(".titulo");
titulo.textContent = "Cadastro de Pacientes";
// titulo.addEventListener("click", mostrarMensagem);

var botaoAdicionar = document.querySelector("#botao-paciente");
botaoAdicionar.addEventListener("click", mostrarMensagem);

	// Teste
	var titulo = document.querySelector("h1");
	console.log(titulo.classList);

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

function mostrarMensagem(event){
	event.preventDefault();
	
	var tabela = document.querySelector("#tabela-pacientes");
	var form = document.querySelector("#form-adicionar");
	
	var nome = form.nome.value;
	var peso = form.peso.value;
	var altura = form.altura.value;
	var gordura = form.gordura.value;
	var imc = 0;
	
	var pacienteTr = document.createElement("tr");
	
	var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");	
	
    nomeTd.textContent = nome;
    pesoTd.textContent = peso;
    alturaTd.textContent = altura;
    gorduraTd.textContent = gordura;
	imcTd.textContent = imc.toFixed(2);
	
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
	pacienteTr.appendChild(imcTd);
	
	tabela.appendChild(pacienteTr);
	
	window.alert("click ok!!!");
}

