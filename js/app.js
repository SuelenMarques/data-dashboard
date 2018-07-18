var cityFilter = document.getElementById('city-filter');
var classYearFilter = document.getElementById('class-year-filter');
var showData = document.getElementById('show-data');
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
button1.className = 'disabled';

var button2 = document.querySelector('.button-menu2')
button2.setAttribute('disabled', '');
button2.className = 'disabled';

var button3 = document.querySelector('.button-menu3')
button3.setAttribute('disabled', '');
button3.className = 'disabled';

var button4 = document.querySelector('.button-menu4')
button4.setAttribute('disabled', '');
button4.className = 'disabled';

// função para habilitar botões
function disabledButton() {
	button1.removeAttribute('disabled');
	button1.classList.remove('disabled');
	button2.removeAttribute('disabled');
	button2.classList.remove('disabled');
	button3.removeAttribute('disabled');
	button3.classList.remove('disabled');
	button4.removeAttribute('disabled');
	button4.classList.remove('disabled');
}

// função para mostrar resultados na tela
function showDataScreen() {
	var city = cityFilter.value;
	var classYear = classYearFilter.value;
	
	showData.innerHTML = '';

	// ao clicar na turma AQPclass1 aciona o evento para desabilitar botões
	classYearFilter.addEventListener('click', function(event) {	
		if (cityFilter.value === 'AQP' && event.target.value === Object.keys(AQPcity)[0]) {
			return disabledButton();
		}
	});
}

// evento click para botão 1 mostrar resultado "dados gerais" da turma AQPclass1
var button1AQPclass1 = button1.addEventListener('click', function button1AQPclass1(event) {
	var students = AQPclass1['students'].length; 
	var studentsText = document.createTextNode('Total de ' + students + ' alunas');
	var paragraph = document.createElement('p');
	
	paragraph.className = 'result';
	paragraph.appendChild(studentsText); 
	showData.appendChild(paragraph);

	// % alunas inativas
	var callInactiveStudents = inactiveStudents();

	function inactiveStudents() {		
		var arrayActive = [];

		for (i in AQPclass1['students']) {	
			var active = AQPclass1['students'][i]['active'];
			arrayActive.push(active);
		}	

		var filterActive = arrayActive.filter(function(item) {
			return item === false;
		});
		var activeFalse = filterActive.length;
		var inactive = activeFalse * students / 100;
		var inactiveStudents = document.createTextNode(inactive + '%' + ' alunas inativas')
		var paragraph = document.createElement('p');
		
		paragraph.className = 'result';
		paragraph.appendChild(inactiveStudents);
		showData.appendChild(paragraph);			
	}	
});

// evento click para botão 2 mostrar resultado "notas alunas" da turma AQPclass1
var button2AQPclass1 = button2.addEventListener('click', function button2AQPclass1(event) {
	// nº e % das alunas acima da média por sprint - Socio e Tech separados
	var callTechScore = techScore();

	function techScore() {
		var students = AQPclass1['students'].length;
		var arrayTech = [];
		
		for (i in AQPclass1['students']) {
			var sprints = AQPclass1['students'][i]['sprints']; // volta array sprints [{number, score{}}]
			for (j in sprints) {
				var score = sprints[j]['score']; // volta objeto score {tech, hse}
				var techScore = score['tech']; // volta valores do tech
				arrayTech.push(techScore);
			}			
		}		

		var filterTech = arrayTech.filter(function(item) {
			return item >= 1800;
		});

		var techResult = filterTech.length;
		//var techResultPercent = ;
		var techStudents = document.createTextNode(techResult + ' sprints com pontos técnicos acima da média')
		var paragraph = document.createElement('p');
		
		paragraph.className = 'result';
		paragraph.appendChild(techStudents);
		showData.appendChild(paragraph);

		console.log(sprints);
	}
});

//nps

var button3AQPclass1 = button3.addEventListener('click', function button3AQPclass1(event) {

var callNps= netPromoterScore ();

function netPromoterScore() {
var arrayPromoters = [];
var arrayDetractors = [];
var arraySprint = [];

for (i in AQPclass1['ratings']) {
    var sprint = AQPclass1['ratings'][i]['sprints'];
    arraySprint.push(sprint);
  }

   var sprintLength = arraySprint.length;	

  for (i in AQPclass1['ratings']) {
    var scoreNps = AQPclass1['ratings'][i]['nps'];
    var promotersScore = scoreNps['promoters'];
	  var detractorsScore = scoreNps['detractors'];
	  arrayPromoters.push(promotersScore);
	  arrayDetractors.push(detractorsScore);
	  console.log(promotersScore);
   }

var sumPromoters = arrayPromoters.reduce(function(acc,num){
  	return acc + num;
});

var sumDetractors = arrayDetractors.reduce(function(acc,num){
  	return acc + num;
  });

var resultSub = sumPromoters - sumDetractors;
var result = resultSub / sprintLength;
   var npsContainer = document.createTextNode(result + '%' + ' é a média NPS')
   var paragraph = document.createElement('p');
   paragraph.className = 'result';
   paragraph.appendChild(npsContainer);
   showData.appendChild(paragraph);
}
 });

   //media teacher e jedi
var button4AQPclass1 = button4.addEventListener('click', function button4AQPclass1(event) {

var callTeacherAverage = teacherAverage();
var callJediAverage = jediAverage();


function teacherAverage() {
  var arrayAverage = [];
  var arraySprint = [];
		

  for (i in AQPclass1['ratings']) {
    var averageTeacher = AQPclass1['ratings'][i]['teacher'];
    arrayAverage.push(averageTeacher);
  }

  for (i in AQPclass1['ratings']) {
    var sprint = AQPclass1['ratings'][i]['sprints'];
    arraySprint.push(sprint);
  }

   var sprintLength = arraySprint.length;
   var sumNote = arrayAverage.reduce(function(acc,num){
  	return acc + num;
  });

   var average = sumNote / sprintLength;
   var averageToFixed = average.toFixed(2);
   var averageResult = document.createTextNode(averageToFixed + ' é a média dos mentores');
   var paragraph = document.createElement('p');

   paragraph.className = 'result';
   paragraph.appendChild(averageResult);
   showData.appendChild(paragraph);
}

function jediAverage() {
  var arrayAverage = [];
  var arraySprint = [];
		

  for (i in AQPclass1['ratings']) {
    var averageJedi = AQPclass1['ratings'][i]['jedi'];
    arrayAverage.push(averageJedi);
  }

  for (i in AQPclass1['ratings']) {
    var sprint = AQPclass1['ratings'][i]['sprints'];
    arraySprint.push(sprint);
  }

  var sprintLength = arraySprint.length;
  var sumNote = arrayAverage.reduce(function(acc,num){
  	return acc + num;
  });
  var average = sumNote / sprintLength;
  var averageToFixed = average.toFixed(2);
   var averageResult = document.createTextNode(averageToFixed + ' é a média dos jedis');
   var paragraph = document.createElement('p');
   paragraph.className = 'result';
   paragraph.appendChild(averageResult);
   showData.appendChild(paragraph);
}
 });

console.log(data);