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

	// ao esolher a sede, mostra as turmas correspondentes a ela 
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

// função para mostrar resultados na tela
function showDataScreen() {
	var city = cityFilter.value;
	var classYear = classYearFilter.value;

	var showData = document.getElementById('show-data');
	showData.innerHTML = '';

	classYearFilter.addEventListener('change', function(event) {	
		if (cityFilter.value === 'AQP' && event.target.value === Object.keys(AQPcity)[0]) {
			return button1AQPclass1();	
		}
	});

	// função para resultado dos dados gerais da turma AQPclass1
	function button1AQPclass1() {
		var students = document.createTextNode(AQPclass1['students'].length + ' alunas'); 
		var paragraph = document.createElement('p');
		paragraph.className = 'result';
		showData.appendChild(paragraph);
		paragraph.appendChild(students); 
	}
}

console.log(data);