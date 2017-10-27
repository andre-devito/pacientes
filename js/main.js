var titulo = document.querySelector(".titulo");
titulo.textContent = "Cadastro de Pacientes";

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


