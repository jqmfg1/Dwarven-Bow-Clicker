var bows = 0;
var rate = 1;

function bowClick(num) {
    bows = bows + num;
    document.getElementById("totalbows").innerHTML = bows;
}

function increaseRate() {
    rate = rate + 1;
    document.getElementById("rate").innerHTML = rate;
}

function bowClickRate() {
    bowClick(rate);
}
