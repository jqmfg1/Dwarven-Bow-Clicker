var iron = 0;
var dwarven = 0;
var ruins_left = 0;
var mines_left = 0;
var bows = 0;
var gold = 0;
var perk_mod = 1;
var bows_sold = 0;
var bows_req = 10;

// selling stuff
var haggling = 0;
var allure = 0;
var fortify_barter_potion = 0;
var fortify_barter_equip_bless = 0;

// levels
var speech_lvl = 1;

var ruins_list = ["Alftand", "Aetherium Forge", "Arkngthamz", "Avanchnzel", "Blackreach", "Bthardamz",
    "Deep Folk Crossing", "Irkngthand", "Kagrenzel", "Mzinchaleft", "Mzulft", "Nchuand-Zel", "Raldbthar",
    "Reachwind Eyrie", "Ruins of Rkund", "Ruins of Bthalft", "Tower of Mzark", "Tolvald's Cave",
    "Shimmermist Grotto", "Sightless Pit", "Ald Carac", "Aleft", "Arkngthand", "Arkngthunch-Sturdumz",
    "Armature's Upheaval", "Bamz-Amschend", "Bethamez", "Bthanchend", "Bthanual", "Bthungthumz", "Dagoth Ur",
    "Druscashti", "Endusal", "Galom Daeus", "Inner Sea Armature", "Kemel-Ze", "Mudan", "Mzahnch Ruin", "Mzanchend",
    "Mzuleft", "Nchardahrk", "Nchardumz", "Nchuleft", "Nchuleftingth", "Nchurdamz", "Odrosal", "Raled-Makai",
    "Rkugamz", "Tureynulal", "Vemynal", "Aldunz", "Bthzark", "Fang Lair", "Klathzgar", "Mtharnaz", "Razak's Wheel",
    "Rkhardahrk", "Rkulftzel", "Rkundzelft", "Santaki", "Volenfell", "Yldzuun", "Mzindyne", "Nyzchaleft Falls",
    "Rkindaleft", "Zthenganaz", "Kagrumez", "Fahlbtharz", "Nchardak", "Hrodulf's House", "Ragnthar", "Earth Forge"];

var mines_list = ["Halted Stream Camp", "Fort Fellhammer", "Embershard Mine", "Gloombound Mine", "Iron Breaker Mine",
    "Left Hand Mine", "Knifepoint Mine", "Nchuand-Zel Excavation Site", "Rockwallow Mine", "Blind Cliff Cave",
    "Lost Knife Cave", "Northwind Mine", "Evergreen Grove", "Faldar's Tooth", "Movarth's Lair", "Whistling Mine",
    "Sarethi Farm", "Bleak Falls Barrow", "Riverwood Folly", "Ysgramor's Tomb", "Purewater Run", "Geirmund's Hall",
    "Secunda's Kiss", "Stendarr's Beacon", "Broken Oar Grotto", "Duskglow Crevice", "Mzinchaleft", "Saarthal",
    "Ysgramor's Tomb", "Roadside Ruins", "The Shadow Stone", "Avanchnzel", "Blizzard Rest", "Ustengrav Depths",
    "Ustengrav", "Movarth's Lair", "White River Watch", "Tolvald's Cave", "Lost Tongue Overlook", "Snow-Shod Farm",
    "Heartwood Mill", "Ansilvund", "Swindler's Den", "Half-Moon Mill", "Narzulbur", "Cragwallow Slope",
    "Traitor's Post", "Riverside Shack", "Eldergleam Sanctuary", "Rebel's Cairn", "South Cold Rock Pass",
    "Greywater Grotto", "Anga's Mill", "Forsaken Cave", "Hob's Fall Cave", "The Lady Stone", "Reachwind Eyrie",
    "Reachwater Rock", "Valtheim Towers", "Bloodlet Throne"];

//sell price factor = (3.3 - 1.3 * skill/100) / ((1 + Haggling %) * (1 + Allure %) *
//(1 + Fortify Barter from potion) *
//(1 + the sum of Fortify Barter from equipment + Fortify Barter from Blessing of Zenithar))
function bowPrice() {
    denom = (1 + haggling) * (1 + allure) * (1 + fortify_barter_potion) * 1 + (fortify_barter_equip_bless);
    factor = (3.3 - 1.3 * (speech_lvl / 100)) / denom;
    return Math.floor(270 / factor);
}

function discoverRuins() {
    len = ruins_list.length;
    num = Math.floor(Math.random() * len);
    ruin = ruins_list[num];
    document.getElementById("ruins").innerHTML = ruin;
    ruins_left = 10;
}

function discoverMine() {
    len = mines_list.length;
    num = Math.floor(Math.random() * len);
    mine = mines_list[num];
    document.getElementById("mine").innerHTML = mine;
    mines_left = 3;
}

function mineIron() {
    if (mines_left > 0) {
        mines_left--;
        if (mines_left == 0) {
            document.getElementById("mine").innerHTML = "Undiscovered";
        }
        iron = iron + 1;
        document.getElementById("iron").innerHTML = iron;
    }
}

function farmDwarven() {
    if (ruins_left > 0) {
        ruins_left--;
        if (ruins_left == 0) {
            document.getElementById("ruins").innerHTML = "Undiscovered";
        }
        dwarven = dwarven + 1;
        document.getElementById("dwarven").innerHTML = dwarven;
    }
}

function makeBow() {
    if (dwarven >= 2 && iron >= 1) {
        bows = bows + 1;
        dwarven = dwarven - 2;
        iron = iron - 1;
        document.getElementById("dwarven").innerHTML = dwarven;
        document.getElementById("iron").innerHTML = iron;
        document.getElementById("bows").innerHTML = bows;
    }
}

function sellBow() {
    if (bows > 0) {
        bows = bows - 1;
        gold = gold + bowPrice();
        bows_sold = bows_sold + 1;
        if (bows_sold >= bows_req) {
            speech_lvl = speech_lvl + 1;
            bows_req = 10 * Math.pow(2, speech_lvl - 1);
            bows_sold = 0;
            document.getElementById("speech_lvl").innerHTML = speech_lvl;
            document.getElementById("bows_left").innerHTML = bows_req;
        } else {
            left = bows_req - bows_sold;
            document.getElementById("bows_left").innerHTML = left;
        }
        document.getElementById("bows").innerHTML = bows;
        document.getElementById("gold").innerHTML = gold;
    }
}
