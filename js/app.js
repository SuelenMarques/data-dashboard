var cityFilter = document.getElementById('city-filter');
var classYearFilter = document.getElementById('class-year-filter');
classYearFilter.addEventListener('change', showDataScreen);

window.onload = loadFilters();

function loadFilters(/*itemCity, itemClassYear*/) {
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

	var selectClassYear = document.createElement('option');
	selectClassYear.innerHTML = '';
	selectClassYear.value = 'none';
	classYearFilter.appendChild(selectClassYear);

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

		for (item in itemClassYear) {
			var itemFilter = document.createElement('option');
			itemFilter.value = item;
			itemFilter.innerHTML = item;
			classYearFilter.appendChild(itemFilter);
		}
	});
}

function showDataScreen(){
	var city = cityFilter.value;
	var classYear = classYearFilter.value;

	var showData = document.getElementById('show-data');
	showData.innerHTML = '';

	for (optionCity in data[city]) {
		for (i in data[city][optionCity]) {			
			//var paragraph = document.createElement('p');
			//showData.appendChild(paragraph);
		}
	}
}

console.log(data);
