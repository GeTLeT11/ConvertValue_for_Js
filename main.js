//Объект с курсами 3-ех валют
const rates = {};
//Находим элементы дивы и присваиваем им перменные element
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

//Объявляем переменные и присваеваем их к id дивам в вёрстке
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();

async function getCurrencies(){
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    //Присваем значению rates нынешние данные Valute
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    console.log(rates);

    //Выводим значение Value валют в наши дивы element и ставим ограничение после запятой в 2 единицы
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    //Если курс дешевеет, то цвет текста зеленый bottom, если дорожает то красный top
    //Показатель Previous отображает предыдущее значение курса и 

    if (rates.USD.Value > rates.USD.Previous){
        elementUSD.classList.add('top'); // добавляем красный цвет
        // если курс стоит на месте и не меняется,то можно добавить условие else if и оставить чёрный цвет текста
        // если данные обновляются в течении дня, то можно добавить remove и заменять цвет.
    }
    else {
        elementUSD.classList.add('bottom'); // добавляем зелёный цвет
    }

    if (rates.EUR.Value > rates.EUR.Previous){
        elementEUR.classList.add('top'); // добавляем красный цвет
    }
    else {
        elementEUR.classList.add('bottom'); // добавляем зелёный цвет
    }

    if (rates.GBP.Value > rates.GBP.Previous){
        elementGBP.classList.add('top'); // добавляем красный цвет
    }
    else {
        elementGBP.classList.add('bottom'); // добавляем зелёный цвет
    }
}


input.oninput = convertValue;
//слушаем дальнейшие изменения
select.oninput = convertValue;

//Слушаем ввод в текстовое поля
function convertValue(){
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}