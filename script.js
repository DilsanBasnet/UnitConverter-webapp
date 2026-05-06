const units = {
    length: { 
        Meters: 1, Kilometers: 1000, Feet: 0.3048, Miles: 1609.34, Inches: 0.0254

    },
    weight: {
        Kilograms: 1, Grams: 0.001, Pounds: 0.4535, Ounces: 0.0283
    },
    temp: {
        Celsius: 'c', Fahrenheit: 'f', Kelvin: 'k'
    }
};

const typeEl = document.getElementById('type');;
const fromEl = document.getElementById('fromUnit');
;
const toEl = document.getElementById('toUnit');
const inputEl = document.getElementById('inputNum');
const outputEl = document.getElementById('outputNum');

function updateOptions() {
    const category = typeEl.value;
    const options = Object.keys(units[category]);
const optionsHTML = options.map(u `<option value="${u}">{u}</option>`).join('');;
fromEl.innerHTML = optionsHTML;

toEl.innerHTML = optionsHTML;

if(options.length>1) toEl.selectedIndex =1;
convert();
}

function convert() {
    const cat = typeEl.value;
    const val = parseFloat(inputEl.value);

    if(isNaN(val)) {
        outputEl.value = '';
        return;
    }
    if(cat === 'temp') {
        let c;
        const from = fromEl.value;
        const to = toEl.value;

        if(from === 'Celsius') c = val;
        else if(from === 'Fahrenheit') c = (val -32) * 5/9;
        else c = val - 273.15;

        
    }
}

