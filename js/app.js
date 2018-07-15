var cityFilter = document.getElementById('city-filter');
var classYearFilter = document.getElementById('class-year-filter');
classYearFilter.addEventListener('change', showDataScreen);

window.onload = loadFilters();

// função para carregar filtros das sedes e turmas
function loadFilters() {
	var selectCity = document.createElement('option');
	selectCity.innerHTML = 'Escolha a Sede';
	selectCity.value = 'none';
	cityFilter.appendChild(selectCity);

	for (city in data) {
		var itemFilter = document.createElement('option');
		itemFilter.value = city;
		itemFilter.innerHTML = city;
		cityFilter.appendChild(itemFilter);
	}		

	// ao escolher a sede, mostra as turmas correspondentes a ela no filtro seguinte
	cityFilter.addEventListener('change', function (event) {	
		if (event.target.value === 'AQP') {
			var itemClassYear = data.AQP;
		} else if (event.target.value === 'CDMX') {
			var itemClassYear = data.CDMX;
		} else if (event.target.value === 'LIM') {
			var itemClassYear = data.LIM;
		} else if (event.target.value === 'SCL') {
			var itemClassYear = data.SCL;
		}
	
		while (classYearFilter.hasChildNodes()) {  
    		classYearFilter.removeChild(classYearFilter.firstChild);
		}

		// para cada turma cria-se um novo elemento "option"
		var selectClassYear = document.createElement('option');
		selectClassYear.innerHTML = 'Escolha a Turma';
		selectClassYear.value = 'none';
		classYearFilter.appendChild(selectClassYear);

		for (item in itemClassYear) {
			var itemFilter = document.createElement('option');
			itemFilter.value = item;
			itemFilter.innerHTML = item;
			classYearFilter.appendChild(itemFilter);
		}
	});
}

// retornam as turmas de cada sede
var AQPcity = data['AQP'];
var CDMXcity = data['CDMX'];
var LIMcity = data['LIM'];
var SCLcity = data['SCL'];

// retornam os objetos dentro de cada turma
var AQPclass1 = data['AQP']['2016-2'];
var AQPclass2 = data['AQP']['2017-1'];

var CDMXclass1 = data['CDMX']['2017-1'];
var CDMXclass2 = data['CDMX']['2017-2'];

var LIMclass1 = data['LIM']['2016-2'];
var LIMclass2 = data['LIM']['2017-1'];
var LIMclass3 = data['LIM']['2017-2'];

var SCLclass1 = data['SCL']['2016-2'];
var SCLclass2 = data['SCL']['2017-1'];
var SCLclass3 = data['SCL']['2017-2'];

// botões menu desabilitados
var button1 = document.querySelector('.button-menu1')
button1.setAttribute('disabled', '');
var button2 = document.querySelector('.button-menu2')
button2.setAttribute('disabled', '');
var button3 = document.querySelector('.button-menu3')
button3.setAttribute('disabled', '');
var button4 = document.querySelector('.button-menu4')
button4.setAttribute('disabled', '');

// função para habilitar botões
function disabledButton() {
	button1.removeAttribute('disabled');
	button2.removeAttribute('disabled');
	button3.removeAttribute('disabled');
	button4.removeAttribute('disabled');
}

// função para mostrar resultados na tela
function showDataScreen() {
	var city = cityFilter.value;
	var classYear = classYearFilter.value;
	var showData = document.getElementById('show-data');
	showData.innerHTML = '';

	// ao clicar na turma AQPclass1 aciona o evento para desabilitar botões
	classYearFilter.addEventListener('click', function(event) {	
		if (cityFilter.value === 'AQP' && event.target.value === Object.keys(AQPcity)[0]) {
			return disabledButton();
		}
	});

	// evento click para botão 1 mostrar resultado "dados gerais" da turma AQPclass1
	button1.addEventListener('click', function button1AQPclass1(event) {
		var students = document.createTextNode(AQPclass1['students'].length + ' alunas'); 
		var paragraph = document.createElement('p');
		paragraph.className = 'result';
		paragraph.appendChild(students); 
		showData.appendChild(paragraph);		
	});
}

console.log(data);