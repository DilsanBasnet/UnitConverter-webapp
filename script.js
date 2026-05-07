const units = {
    length: { Meters: 1, Kilometers: 1000, Feet: 0.3048, Miles: 1609.34, Inches: 0.0254},
    weight: {Kilograms: 1, Grams: 0.001, Pounds: 0.4535, Ounces: 0.0283},
    area: {"Sq Meters": 1, "Sq Kilometers": 1000000, "Sq Feet": 0.0929, "Acres": 4046.86},
    temp: {Celsius: 'c', Fahrenheit: 'f', Kelvin: 'k' },
    current: {
        Amperes: 1, Milliamperes: 0.001, Kiloamperes: 1000
    },
    time: {
        Seconds: 1, Minutes: 60, Hours: 3600, Days: 86400, Years: 31536000
    }
  
};

const typeEl = document.getElementById('type');;
const fromEl = document.getElementById('fromUnit');
const toEl = document.getElementById('toUnit');
const inputEl = document.getElementById('inputNum');
const outputEl = document.getElementById('outputNum');

const historyList = document.getElementById('historyList');

function updateOptions() {
    const category = typeEl.value;
    const options = Object.keys(units[category]);
    
const optionsHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
fromEl.innerHTML = optionsHTML;
toEl.innerHTML = optionsHTML;

if(options.length > 1) toEl.selectedIndex = 1;
convert();
}


function addToHistory(val, from, res, to) {
    if(!val || val == 0) return;
    const li = document.createElement('div');
    li.className = 'history-item';
    li.innerHTML = `<span>${val} ${from}</span>
    <span> <strong>${res} ${to}</strong></span>`;

    if(historyList.querySelector('.empty-msg'))historyList.innerHTML='';

    historyList.prepend(li);

    if(historyList.children.length > 4) {
        historyList.removeChild(historyList.lastChild);
    }
}
function convert() {
    const cat = typeEl.value;
    const val = parseFloat(inputEl.value);

    if(isNaN(val)) {
        outputEl.value = "";
        return;
    }
    if( cat === 'temp') {
        let c, res;

        if(fromEl.value === 'Celsius') c = val;
        else if(fromEl.value === 'Fahrenheit') c = (val - 32) * 5/9;
        else c = val - 273.15;

    if(toEl.value === 'Celsius') res = c;
    else if(toEl.value === 'Fahrenheit' ) res = (c * 9/5) + 32;
    else res = c + 273.15;
res = Number(res.toFixed(4));
} 
else {
    res = val * (units[cat][fromEl.value] / units[cat][toEl.value]);
    res = res % 1 === 0 ? res : Number(res.toFixed(5));

}

outputEl.value = res;
}

let logTimer;
inputEl.addEventListener('input' , () => {
    convert();
    clearTimeout(logTimer);
    logTimer = setTimeout(() => {
        addToHistory(inputEl.value, fromEl.value, outputEl.value, toEl.value);}, 1200);
    });

document.getElementById('copyBtn').addEventListener('click', () => {
    if(outputEl.value) {
        navigator.clipboard.writeText(outputEl.value);
        const btn = document.getElementById('copyBtn');
        btn.innerText = "Copied";
        setTimeout(() => btn.innerText = "Copy Result", 1500);
    }
});
   

document.getElementById('clearHistory').addEventListener('click', () => {
    historyList.innerHTML = `<div class="empty-msg' style="text-align:center; font-size: 14px;
    color: rgb(203, 212, 223); padding: 10px;">No recent Activity</div>`;
});

typeEl.addEventListener('change', updateOptions);
fromEl.addEventListener('change', convert);
toEl.addEventListener('change', convert);

updateOptions();





   


