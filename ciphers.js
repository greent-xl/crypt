const lowAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
const upAlphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
// const allAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
const zpt = ",";
const zptRep = "зпт";
const tchk = ".";
const tchkRep = "тчк";
const tire = "-";
const tireRep = "тире";

const state = {
    activeNvBar: document.querySelector('#atbashPage'),
    activeSection: document.querySelector('#atbash')
};

const spaceTypes = {
    atbashSpace: false,
    // document.querySelector("#atbashSpaceType").checked,
    caesarSpace: false,
    // document.querySelector("#caesarSpaceType").checked,
    polibiSpace: false,
    // document.querySelector("#polibiSpaceType").checked
    tritemSpace: false,
    belazoSpace: false,
    vishenerSpace: false
};

function markToChar(str) {
    str = str.replaceAll(zpt, zptRep);
    str = str.replaceAll(tchk, tchkRep);
    str = str.replaceAll(tire, tireRep);
    return str;
};

function charToMark(str) {
    str = str.replaceAll(zptRep, zpt);
    str = str.replaceAll(tchkRep, tchk);
    str = str.replaceAll(tireRep, tire);
    return str;
};

function spaceWithout(str) {
    str = str.split(' ').join('');
    return str;
};

function spaceWithStart(str) {
    str = str.split(' ').join("прб");
    return str;
};

function spaceWithEnd(str) {
    str = str.split("прб").join(' ');
    return str;
};

function strToSet(str) {
    let newStr = String(str).toLocaleLowerCase();
    newStr = ((Array.from(new Set(newStr.split("")))).join("")).split(" ").join("");
    newStr = markToChar(newStr);
    return newStr;
};

//
//
//
//

function Atbash(str) {
    let newStr = "";
    str = markToChar(str);

    for (let i = 0; i < str.length; i++) {
        if (lowAlphabet.indexOf(str[i]) != -1){
            let numChar = lowAlphabet.indexOf(str[i]);
            newStr += lowAlphabet[lowAlphabet.length - 1 - numChar];
        } else if (upAlphabet.indexOf(str[i]) != -1) {
            let numChar = upAlphabet.indexOf(str[i]);
            newStr += upAlphabet[upAlphabet.length - 1 - numChar];
        } else {
            newStr += " ";
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function caesarEncrypt(str, key) {
    let newStr = "";
    str =  markToChar(str);
    if ((key % lowAlphabet.length) == 0) {
        newStr = "Error: ключ не должен быть кратен алфавиту!";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1){
                let newIndex = (lowAlphabet.indexOf(str[i]) + key) % lowAlphabet.length;
                newStr += lowAlphabet[newIndex];
            } else if (upAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (upAlphabet.indexOf(str[i]) + key) % upAlphabet.length;
                newStr += upAlphabet[newIndex];
            } else {
                newStr += " ";
            }
        }
    }
    newStr = charToMark(newStr);
    return newStr;
};

function caesarDecrypt(str, key) {
    let newStr = "";
    str = markToChar(str);

    if ((key % lowAlphabet.length) == 0) {
        newStr = "Error: ключ не должен быть кратен алфавиту!";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (lowAlphabet.indexOf(str[i]) - 
                (key % lowAlphabet.length) + lowAlphabet.length) % lowAlphabet.length;
                newStr += lowAlphabet[newIndex];
            } else if (upAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (upAlphabet.indexOf(str[i]) - 
                (key % upAlphabet.length) + upAlphabet.length) % upAlphabet.length;
                newStr += upAlphabet[newIndex];
            } else {
                newStr += " ";
            }    
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function polibiEncrypt(str, row, col) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if ((row > 9) || (col > 9)) {
        newStr = "Error: кол-во строк или столбцов не должно быть больше 9";
    } else if ((row * col) < lowAlphabet.length) {
        newStr = "Error: не хватает клеток таблиц для всего алфавита (32 буквы)";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1) {
                let tempIndex = lowAlphabet.indexOf(str[i]);
                newStr += String(`${(Math.floor(tempIndex/col)) + 1}${(tempIndex%col) + 1}`);
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function polibiDecrypt(str, row, col) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if ((row > 9) || (col > 9)) {
        newStr = "Error: кол-во строк или столбцов не должно быть больше 9"
    } else if ((row * col) < lowAlphabet.length) {
        newStr = "Error: не хватает клеток таблиц для всего алфавита (32 буквы)"
    } else {
        for (let i = 0; i < str.length; i += 2) {
            let tempRow = Number(str[i]) - 1;
            let tempCol = Number(str[i + 1]) - 1;
            newStr += lowAlphabet[(col * tempRow) + tempCol]
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function tritemEncrypt(str) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i++) {
        let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) + i) % lowAlphabet.length];
        newStr += temp;
    }
    newStr = charToMark(newStr);

    return newStr;
};

function tritemDecrypt(str) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i++) {
        let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) - (i % lowAlphabet.length) + lowAlphabet.length) % lowAlphabet.length];
        newStr += temp;
    }
    newStr = charToMark(newStr);

    return newStr;
};

function belazoEncrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i += key.length) {
        for (let j = 0; j < key.length; j++) {
            if ((i + j) == str.length) {
                break;
            } else {
                let temp = lowAlphabet[(lowAlphabet.indexOf(str[i + j]) + lowAlphabet.indexOf(key[j])) % lowAlphabet.length];
                newStr += temp;
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function belazoDecrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i += key.length) {
        for (let j = 0; j < key.length; j++) {
            if ((i + j) == str.length) {
                break;
            } else {
                let temp = lowAlphabet[(lowAlphabet.indexOf(str[i + j]) - lowAlphabet.indexOf(key[j]) + 
                    lowAlphabet.length) % lowAlphabet.length];
                newStr += temp;
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function vishenerEncrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if (key.length != 1) {
        newStr = "Error: ключ должен быть одной буквой";
    } else {
        str = String(key).toLocaleLowerCase() + str;
        for (let i = 1; i < str.length; i++) {
            let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) + lowAlphabet.indexOf(str[i - 1])) % lowAlphabet.length]
            newStr += temp;
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function vishenerDecrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if (key.length != 1) {
        newStr = "Error: ключ должен быть одной буквой";
    } else {
        str = String(key).toLocaleLowerCase() + str;
        newStr += lowAlphabet[(lowAlphabet.indexOf(str[1]) - lowAlphabet.indexOf(str[0]) + lowAlphabet.length) % lowAlphabet.length]
        for (let i = 2; i < str.length; i++) {
            let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) - lowAlphabet.indexOf(newStr[i - 2]) + lowAlphabet.length) % lowAlphabet.length]
            
            newStr += temp;
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};


//
//
//
//



function fillAtbashEn() {
    let text = document.querySelector('#atbashEnArea').value;
    let newText = "";
    if (spaceTypes.atbashSpace) {
        newText = spaceWithStart(text);
        newText = Atbash(newText);
    } else {
        newText = spaceWithout(text);
        newText = Atbash(newText);
    }
    document.getElementById('atbashAfterEn').value = newText;
};

function fillAtbashDe() {
    let text = document.querySelector('#atbashDeArea').value;
    let newText = "";
    if (spaceTypes.atbashSpace) {
        newText = Atbash(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = Atbash(newText);
    }
    document.getElementById('atbashAfterDe').value = newText;
};

function fillCaesarEn() {
    let text = document.querySelector('#caesarEnArea').value;
    let keyEn = Number(document.querySelector("#caesarEnKey").value);
    let newText = "";
    if (spaceTypes.caesarSpace) {
        newText = spaceWithStart(text);
        newText = caesarEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = caesarEncrypt(newText, keyEn);
    }
    document.getElementById('caesarAfterEn').value = newText;
};

function fillCaesarDe() {
    let text = document.querySelector('#caesarDeArea').value;
    let keyDe = Number(document.querySelector('#caesarDeKey').value);
    let newText = "";
    if (spaceTypes.caesarSpace) {
        newText = caesarDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = caesarDecrypt(newText, keyDe);
    }
    document.getElementById('caesarAfterDe').value = newText;
};

function fillPolibiEn() {
    let text = document.querySelector('#polibiEnArea').value;
    let enRow = Number(document.querySelector('#polibiEnRow').value); 
    let enCol = Number(document.querySelector('#polibiEnCol').value);
    let newText = "";
    if (spaceTypes.polibiSpace) {
        newText = spaceWithStart(text);
        newText = polibiEncrypt(newText, enRow, enCol);
    }else {
        newText = spaceWithout(text);
        newText = polibiEncrypt(newText, enRow, enCol);
    }
    document.getElementById('polibiAfterEn').value = newText;
};

function fillPolibiDe() {
    let text = document.querySelector('#polibiDeArea').value;
    let deRow = Number(document.querySelector('#polibiDeRow').value); 
    let deCol = Number(document.querySelector('#polibiDeCol').value);
    let newText = "";
    if (spaceTypes.polibiSpace) {
        newText = polibiDecrypt(text, deRow, deCol);
        newText = spaceWithEnd(newText);
    }else {
        newText = spaceWithout(text);
        newText = polibiDecrypt(newText, deRow, deCol);
    }
    document.getElementById('polibiAfterDe').value = newText;
};

function fillTritemEn() {
    let text = document.querySelector('#tritemEnArea').value;
    let newText = "";
    if (spaceTypes.tritemSpace) {
        newText = spaceWithStart(text);
        newText = tritemEncrypt(newText);
    } else {
        newText = spaceWithout(text);
        newText = tritemEncrypt(newText);
    }
    document.getElementById('tritemAfterEn').value = newText;
};

function fillTritemDe() {
    let text = document.querySelector('#tritemDeArea').value;
    let newText = "";
    if (spaceTypes.tritemSpace) {
        newText = tritemDecrypt(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = tritemDecrypt(newText);
    }
    document.getElementById('tritemAfterDe').value = newText;
};

function fillBelazoEn() {
    let text = document.querySelector('#belazoEnArea').value;
    let keyEn = strToSet(document.querySelector('#belazoEnKey').value);
    let newText = "";
    if (spaceTypes.belazoSpace) {
        newText = spaceWithStart(text);
        newText = belazoEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = belazoEncrypt(newText, keyEn);
    }
    document.getElementById('belazoAfterEn').value = newText;
};

function fillBelazoDe() {
    let text = document.querySelector('#belazoDeArea').value;
    let keyDe = strToSet(document.querySelector('#belazoDeKey').value);
    let newText = "";
    if (spaceTypes.belazoSpace) {
        newText = belazoDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = belazoDecrypt(newText, keyDe);
    }
    document.getElementById('belazoAfterDe').value = newText;
};

function fillVishenerEn() {
    let text = document.querySelector('#vishenerEnArea').value;
    let keyEn = document.querySelector('#vishenerEnKey').value;
    let newText = "";
    if (spaceTypes.vishenerSpace) {
        newText = spaceWithStart(text);
        newText = vishenerEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = vishenerEncrypt(newText, keyEn);
    }
    document.getElementById('vishenerAfterEn').value = newText;
};

function fillVishenerDe() {
    let text = document.querySelector('#vishenerDeArea').value;
    let keyDe = document.querySelector('#vishenerDeKey').value;
    let newText = "";
    if (spaceTypes.vishenerSpace) {
        newText = vishenerDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = vishenerDecrypt(newText, keyDe);
    }
    document.getElementById('vishenerAfterDe').value = newText;
};


//
//
//
//



window.onload = () => {
    document.querySelector('#atbashEnBtn').
        addEventListener('click', event => {
            fillAtbashEn();
        });
    document.querySelector('#atbashDeBtn').
        addEventListener('click', event => {
            fillAtbashDe();
        });
    document.querySelector('#caesarEnBtn').
        addEventListener('click', event => {
            fillCaesarEn();
        });
    document.querySelector('#caesarDeBtn').
        addEventListener('click', event => {
            fillCaesarDe();
        });
    document.querySelector('#polibiEnBtn').
        addEventListener('click', event => {
            fillPolibiEn();
        });
    document.querySelector('#polibiDeBtn').
        addEventListener('click', event => {
            fillPolibiDe();
        });
    document.querySelector('#tritemEnBtn').
        addEventListener('click', event => {
            fillTritemEn();
        });
    document.querySelector('#tritemDeBtn').
        addEventListener('click', event => {
            fillTritemDe();
        });
    document.querySelector('#belazoEnBtn').
        addEventListener('click', event => {
            fillBelazoEn();
        });
    document.querySelector('#belazoDeBtn').
        addEventListener('click', event => {
            fillBelazoDe();
        });
    document.querySelector('#vishenerEnBtn').
        addEventListener('click', event => {
            fillVishenerEn();
        });
    document.querySelector('#vishenerDeBtn').
        addEventListener('click', event => {
            fillVishenerDe();
        });
    
    //
    //
    
    document.querySelector('#atbashPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempNv = event.target;
        tempNv.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#atbash').classList.remove('hidden');
        state.activeSection = document.querySelector('#atbash');
    });
    document.querySelector('#caesarPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#caesar').classList.remove('hidden');
        state.activeSection = document.querySelector('#caesar');
    });
    document.querySelector('#polibiPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#polibi').classList.remove('hidden');
        state.activeSection = document.querySelector('#polibi');
    });
    document.querySelector('#tritemPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#tritem').classList.remove('hidden');
        state.activeSection = document.querySelector('#tritem');
    });
    document.querySelector('#belazoPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#belazo').classList.remove('hidden');
        state.activeSection = document.querySelector('#belazo');
    });
    document.querySelector('#vishenerPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#vishener').classList.remove('hidden');
        state.activeSection = document.querySelector('#vishener');
    });

    //
    //

    document.querySelector("#atbashSpaceType").addEventListener('click', event => {
        spaceTypes.atbashSpace = document.querySelector("#atbashSpaceType").checked;
    });
    document.querySelector("#caesarSpaceType").addEventListener('click', event => {
        spaceTypes.caesarSpace = document.querySelector("#caesarSpaceType").checked;
    });
    document.querySelector("#polibiSpaceType").addEventListener('click', event => {
        spaceTypes.polibiSpace = document.querySelector("#polibiSpaceType").checked;
    });
    document.querySelector("#tritemSpaceType").addEventListener('click', event => {
        spaceTypes.tritemSpace = document.querySelector("#tritemSpaceType").checked;
    });
    document.querySelector("#belazoSpaceType").addEventListener('click', event => {
        spaceTypes.belazoSpace = document.querySelector("#belazoSpaceType").checked;
    });
    document.querySelector("#vishenerSpaceType").addEventListener('click', event => {
        spaceTypes.vishenerSpace = document.querySelector("#vishenerSpaceType").checked;
    });

};