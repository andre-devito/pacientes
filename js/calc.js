function calcImcByPaciente(paciente) {

	var imc = paciente.peso / (paciente.altura * paciente.altura);
	
	return imc;

}

function calcImcByPesoAndAltura(peso, altura) {

	var imc = peso / (altura * altura);
	
	return imc;

}
