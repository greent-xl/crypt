// Алфавиты
const lowAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
const upAlphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
// const allAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

// Переменные для замены знаков
const zpt = ",";
const zptRep = "зпт";
const tchk = ".";
const tchkRep = "тчк";
const tire = "-";
const tireRep = "тире";
const prob = " ";
const probRep = "прб";

// Состояние, какая страница активна
const state = {
    activeNvBar: document.querySelector('#atbashPage'),
    activeSection: document.querySelector('#atbash')
};

// Состояние использования пробелов в тексте
const spaceTypes = {
    atbashSpace: false,
    caesarSpace: false,
    polibiSpace: false,
    tritemSpace: false,
    belazoSpace: false,
    vishenerSpace: false,
    sblokSpace: false,
    matrSpace: false,
    playfairSpace: false,
    vertSpace: false,
    cardanoSpace: false,
};

const matr = {
    matrSize: 3,
    matrActiveEn: "tableEn3",
    matrActiveDe: "tableDe3"
};

// Функция замены знаков на буквы
function markToChar(str) {
    str = str.replaceAll(zpt, zptRep);
    str = str.replaceAll(tchk, tchkRep);
    str = str.replaceAll(tire, tireRep);
    return str;
};

// Функция замены букв на знаки
function charToMark(str) {
    str = str.replaceAll(zptRep, zpt);
    str = str.replaceAll(tchkRep, tchk);
    str = str.replaceAll(tireRep, tire);
    return str;
};

// Функция удаления пробелов в тексте
function spaceWithout(str) {
    str = str.split(' ').join('');
    return str;
};

// Функция замены пробелов на буквы
function spaceWithStart(str) {
    str = str.split(' ').join("прб");
    return str;
};

// Функция замены букв на пробелы
function spaceWithEnd(str) {
    str = str.split("прб").join(' ');
    return str;
};

// Функция удаления одинаковых символов и пробелов из текста
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

//
// Шифр АТБАШ
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


//
// Шифр Цезаря
//
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


//
// Шифр Полибия
//
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


//
// Шифр Тритемия
//
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


//
// Шифр Белазо
//
function belazoEncrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();
    key = String(key).toLocaleLowerCase();

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
    key = String(key).toLocaleLowerCase();

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

function fillBelazoEn() {
    let text = document.querySelector('#belazoEnArea').value;
    let keyEn = document.querySelector('#belazoEnKey').value;
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
    let keyDe = document.querySelector('#belazoDeKey').value;
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


//
// Шифр Виженера
//
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
// S-блок
//
const PTable = [
    [1, 7, 14, 13, 0, 5, 8, 3, 4, 15, 10, 6, 9, 12, 11, 2],
    [8, 14, 2, 5, 6, 9, 1, 12, 15, 4, 11, 0, 13, 10, 3, 7],
    [5, 13, 15, 6, 9, 2, 12, 10, 11, 7, 8, 1, 4, 3, 14, 0],
    [7, 15, 5, 10, 8, 1, 6, 13, 0, 9, 3, 14, 11, 4, 2, 12],
    [12, 8, 2, 1, 13, 4, 15, 6, 7, 0, 10, 5, 3, 14, 9, 11],
    [11, 3, 5, 8, 2, 15, 10, 13, 14, 1, 7, 4, 12, 9, 6, 0],
    [6, 8, 2, 3, 9, 10, 5, 12, 1, 14, 4, 7, 11, 13, 0, 15],
    [12, 4, 6, 2, 10, 5, 11, 9, 14, 8, 13, 7, 0, 3, 15, 1]
];

function stringToUint8(str, border) {
    const buffer = new TextEncoder().encode(str);
    let length = buffer.length;
    if (buffer.length % border !== 0) {
        length += border - buffer.length % border;
    }
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = i < buffer.length ? buffer[i] : 0;
    }
    return result;
}

function uint8ToString(data) {
    return new TextDecoder().decode(data);
}

function findIndexPTable(elem, row) {
    for (let i = 0; i < 16; i++) {
        if (elem === PTable[row][i]) return i;
    }
    return 0;
}

function sblock(data) {
    let result = new Uint8Array(4);

    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let leftPartByte = (temp & 0xf0) >> 4;
        let rightPartByte = (temp & 0x0f);
        leftPartByte = PTable[i * 2][leftPartByte];
        rightPartByte = PTable[i * 2 + 1][rightPartByte];
        result[i] = (leftPartByte << 4) | rightPartByte;
    }

    return result;
}

function sblockReverse(data) {
    let result = new Uint8Array(4);

    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let leftPartByte = (temp & 0xf0) >> 4;
        let rightPartByte = (temp & 0x0f);
        leftPartByte = findIndexPTable(leftPartByte, i * 2);
        rightPartByte = findIndexPTable(rightPartByte, i * 2 + 1);
        result[i] = (leftPartByte << 4) | rightPartByte;
    }

    return result;
}

function hexToBytes(text) {
    let includAlphabet = "0123456789abcdef";
    let result = new Uint8Array(text.length / 2);

    for (let i = 0; i < text.length / 2; i++) {
        let letter1 = text[i * 2];
        let letter2 = text[i * 2 + 1];
        if (includAlphabet.includes(letter1) && includAlphabet.includes(letter2)) {
            let num1 = includAlphabet.indexOf(letter1);
            let num2 = includAlphabet.indexOf(letter2);
            result[i] = (num1 << 4) | num2;
        }
    }

    return result;
}

function bytesToHex(bytes) {
    let result = "";
    let validAlphabet = "0123456789abcdef";

    for (let i = 0; i < bytes.length; i++) {
        let num1 = (bytes[i] & 0xf0) >> 4;
        let num2 = bytes[i] & 0x0f;
        let letter1 = validAlphabet[num1];
        let letter2 = validAlphabet[num2];
        result += letter1.toString() + letter2.toString();
    }

    return result;
}

function stringToBytes(str) {
    let buffer = stringToUint8(str, 4);
    let result = "";

    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer4 = buffer.slice(i, i + 4);
        let encoded = sblock(buffer4);
        let hex = bytesToHex(encoded);
        result += hex;
    }

    return result;
}

function bytesToString(str) {
    let buffer = hexToBytes(str);

    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer4 = buffer.slice(i, i + 4);
        let decoded = sblockReverse(buffer4);
        for (let j = i; j < i + 4; j++) {
           buffer[j] = decoded[j - i];
        }
    }

    buffer = uint8ToString(buffer);
    return buffer;
}

function fillSblokEn() {
    let text = document.querySelector('#sblokEnArea').value;
    let newText = "";
    if (spaceTypes.sblokSpace) {
        newText = spaceWithStart(text);
        newText = String(markToChar(newText)).toLocaleLowerCase();
        newText = stringToBytes(newText);
    } else {
        newText = spaceWithStart(text);
        newText = String(markToChar(newText)).toLocaleLowerCase();
        newText = bytesToHex(sblock(hexToBytes(newText)));
    }
    document.getElementById('sblokAfterEn').value = newText;
};

function fillSblokDe() {
    let text = document.querySelector('#sblokDeArea').value;
    let newText = "";
    if (spaceTypes.sblokSpace) {
        newText = bytesToString(text);
        newText = String(charToMark(newText)).toLocaleLowerCase();
        newText = spaceWithEnd(newText);
    } else {
        newText = bytesToHex(sblockReverse(hexToBytes(text)));
        newText = String(charToMark(newText)).toLocaleLowerCase();
        newText = spaceWithEnd(newText);
    }
    document.getElementById('sblokAfterDe').value = newText;
};


//
// Матричный шифр
//

let matrShifrFlag = false;
function matrMult(a, b) {
    let aNumRows = a.length;
    let aNumCols = a[0].length;
    let bNumRows = b.length;
    let bNumCols = b[0].length;
    let arr = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
        arr[r] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; ++c) {
            arr[r][c] = 0;
            for (let i = 0; i < aNumCols; ++i) {
                arr[r][c] += a[r][i] * b[i][c];
            }
        }
    }

    for (let r = 0; r < aNumRows; ++r){
        for (let c = 0; c < bNumCols; ++c) {
            arr[r][c] = Math.round(arr[r][c]);
        }
    }

    return arr;
}

function matrDeterminant(A) {
    let N = A.length
    let B = []
    let denom = 1
    let exchanges = 0;

    for (let i = 0; i < N; ++i) { 
        B[i] = [];
        for (let j = 0; j < N; ++j){
            B[i][j] = A[i][j];
        }
    }

    for (let i = 0; i < N-1; ++i) {
        let maxN = i, maxValue = Math.abs(B[i][i]);
        for (let j = i+1; j < N; ++j) { 
            let value = Math.abs(B[j][i]);
            if (value > maxValue) { 
                maxN = j; maxValue = value; 
            }
        }

        if (maxN > i) { 
            let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
            ++exchanges;
        } else if (maxValue == 0) {
            return maxValue; 
        }

        let value1 = B[i][i];
        for (let j = i+1; j < N; ++j) { 
            let value2 = B[j][i];
            B[j][i] = 0;
            for (let k = i+1; k < N; ++k) {
                B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
        }
        denom = value1;
    }

    if (exchanges % 2) {
        return -B[N-1][N-1];
    } else {
        return B[N-1][N-1];
    }
}

function matrAdjugate(A) {                                        
    let N = A.length
    let adjA = [];
    for (let i = 0; i < N; i++) { 
        adjA[i] = [];
        for (let j = 0; j < N; j++) { 
            let B = []
            let sign = ((i + j) % 2 == 0) ? 1 : -1;

            for (let m = 0; m < j; m++) { 
                B[m] = [];
                for (let n = 0; n < i; n++) { B[m][n] = A[m][n] };
                for (let n = i + 1; n < N; n++) { B[m][n-1] = A[m][n] };
            }

            for (let m = j+1; m < N; m++) { 
                B[m-1] = [];
                for (let n = 0; n < i; n++) { B[m-1][n] = A[m][n] };
                for (let n = i + 1; n < N; n++) { B[m-1][n-1] = A[m][n] };
            }

            adjA[i][j] = sign * matrDeterminant(B);
        }
    }
    return adjA;
}

function matrInverse(A) {   
    let det = matrDeterminant(A);
    if (det == 0) {
        matrShifrFlag = true;
        return A;
    } 
    let N = A.length
    A = matrAdjugate(A);
    for (let i = 0; i < N; i++) { 
        for (let j = 0; j < N; j++) {
            A[i][j] /= det;
        }  
    }
    return A;
}

function matrFromTableEn() {
    let mat = []
    for (let i = 0; i < matr.matrSize; i++) {
        let temp = []
        for (let j = 0; j < matr.matrSize;  j++) {
            temp.push(Number(document.querySelector(`#cellEn${matr.matrSize}${i}${j}`).childNodes[1].value));
        }
        mat.push(temp);
    }
    return mat;
}

function matrFromTableDe() {
    let mat = []
    for (let i = 0; i < matr.matrSize; i++) {
        let temp = []
        for (let j = 0; j < matr.matrSize;  j++) {
            temp.push(Number(document.querySelector(`#cellDe${matr.matrSize}${i}${j}`).childNodes[1].value));
        }
        mat.push(temp);
    }
    return mat;
}

function matrToTableDe() {
    let matrEn = matrFromTableEn();
    matrEn = matrInverse(matrEn);
    for (let i = 0; i < matr.matrSize; i++) {
        for (let j = 0; j < matr.matrSize;  j++) {
            document.querySelector(`#cellDe${matr.matrSize}${i}${j}`).childNodes[1].value = matrEn[i][j];
        }
    }
}

function stringToMatr(str) {
    str = String(markToChar(str)).toLocaleLowerCase();
    let mat = [];
    for (let i = 0; i < str.length; i++) {
        let temp = [];
        temp.push(lowAlphabet.indexOf(str[i]) + 1);
        mat.push(temp);
    }

    if (mat.length % matr.matrSize != 0) {
        let count = matr.matrSize - (mat.length % matr.matrSize)
        for (let j = 0; j < count; ++j) {
            mat.push([33])
        }
    }
    let newMat = []
    let matrEn = matrFromTableEn();
    let matrBySize = [];
    for (let i = 0; i < mat.length; i += Number(matr.matrSize)) {
        matrBySize = [];
        
        for (let k = 0; k < matr.matrSize; k++) {
            matrBySize.push(mat[Number(i) + Number(k)]);
        }
        let tempMatr = matrMult(matrEn, matrBySize);
        for (let j = 0; j < tempMatr.length; j++) {
            newMat.push(tempMatr[j]);
        }
    }

    return newMat;
}

function matrToString(mat) {
    let newMat = []
    let matrDe = matrFromTableDe();
    for (let i = 0; i < mat.length; i += Number(matr.matrSize)) {

        let matrBySize = []
        for (let k = 0; k < matr.matrSize; k++) {
            matrBySize.push(mat[Number(i) + Number(k)]);
        }

        let tempMatr = matrMult(matrDe, matrBySize);
        for (let j = 0; j < tempMatr.length; j++) {
            newMat.push(tempMatr[j])
        }
    }

    let str = "";
    for (let i = 0; i < newMat.length; i++) {
        if (newMat[i] != 33) {
            str += lowAlphabet[newMat[i] - 1]
        }
    }
    str = charToMark(str)

    return str;
}

function fillMatrEn() {
    matrToTableDe();
    let text = document.querySelector('#matrEnArea').value;
    let newText = "";
    if (spaceTypes.matrSpace) {
        newText = spaceWithStart(text);
        newText = stringToMatr(newText);
    } else {
        newText = spaceWithout(text);
        newText = stringToMatr(newText);
    }
    if (matrShifrFlag) {
        document.getElementById('matrAfterEn').value = "Матрица имеет дискриминант 0";
        matrShifrFlag = false;
    } else {
        document.getElementById('matrAfterEn').value = newText;
    }
};

function fillMatrDe() {
    let text = document.querySelector('#matrDeArea').value;
    let newText = [];
    text = text.split(",");
    for (let i = 0; i < text.length; i++) {
        newText.push([Number(text[i])]);
    }

    if (spaceTypes.matrSpace) {
        newText = matrToString(newText);
        newText = spaceWithEnd(newText);
    } else {
        newText = matrToString(newText);
        newText = spaceWithout(newText);
    }
    document.getElementById('matrAfterDe').value = newText;

};


//
// Шифр Плэйфера
//
const fairplay = {
    rows: 5,
    cols: 6,
    tableKey:   [
                ["а", "р", "б", "у", "з", "в"],
                ["г", "д", "е", "ж", "и", "к"],
                ["л", "м", "н", "о", "п", "с"],
                ["т", "ф", "х", "ц", "ч", "ш"],
                ["щ", "ь", "ы", "э", "ю", "я"]
                ],
    playAlphabet: "абвгдежзиклмнопрстуфхцчшщьыэюя"
};

function playfairCoord(xCoord, yCoord){
    return fairplay.tableKey[Number(xCoord)][Number(yCoord)];
}

function playfairReplace(str) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "й") { newStr += "и" }
        else if (str[i] == "ъ") { newStr += "ь" }
        else if (str[i] == "ё") { newStr += "е" }
        else { newStr += str[i] }
    }
    return newStr;
}

function playfairTableKey(str) {
    str = strToSet(str);
    let newStr = str;
    for (let m = 0; m < fairplay.playAlphabet.length; m++) {
        if (!newStr.includes(fairplay.playAlphabet[m])) {
            newStr += fairplay.playAlphabet[m];
        }
    }

    fairplay.tableKey = [];
    for (let i = 0; i < 5; i++) {
        fairplay.tableKey.push([]);
        for (let j = 0; j < 6; j++) {
            fairplay.tableKey[i].push(newStr[i * 6 + j])
        }
    }
}

function playfairEncrypt(str){
	let newStr = "";
	let x1, y1, x2, y2;
    // let teststr = playfairReplace(String(markToChar(str)).toLocaleLowerCase());
    // if (str.length != teststr.length) {
        
    //     newStr = "Ключ не должен содержать одинаковые буквы";
    //     return newStr;
    // }
    str = playfairReplace(String(markToChar(str)).toLocaleLowerCase());
    if (str.length % 2 == 1) {
        str += "прб";
    }
    let strLen = str.length;

	for (let k = 0; k < strLen; k += 2){
        x1 = -1, x2 = -1, y1 = -1, y2 = -1;
        for (let i = 0; i < fairplay.rows; i++) {
            for (let j = 0; j < fairplay.cols; j++) {
                if (x1 == -1) {
                    if (str[k] == fairplay.tableKey[i][j]) {
                        x1 = i, y1 = j;
                    }
                }
                if (x2 == -1) {
                    if (str[k + 1] == fairplay.tableKey[i][j]) {
                        x2 = i, y2 = j;
                    }
                }
            }
        }

        // Если имеют одинаковую строку сместить вправо
		if (x1 == x2){
			y1 += 1; y1 %= fairplay.cols;
			newStr += playfairCoord(x1, y1);
			y2 += 1; y2 %= fairplay.cols;
			newStr += playfairCoord(x2, y2);
        // Если имеют одинаковый столбик смесстить вниз
		} else if (y1 == y2){
			x1 += 1; x1 %= fairplay.rows;
			newStr += playfairCoord(x1, y1);
			x2 += 1; x2 %= fairplay.rows;
			newStr += playfairCoord(x2, y2);
        // Смена по углам
		} else {
			newStr += playfairCoord(x1, y2);			
			newStr += playfairCoord(x2, y1);
		}
	}
	
	return newStr;
}

function playfairDecrypt(str){
	let newStr = "";
	let strLen = str.length;
	let x1, y1, x2, y2;
	
	for (let k = 0; k < strLen; k += 2) {
		x1 = -1, x2 = -1, y1 = -1, y2 = -1;
        for (let i = 0; i < fairplay.rows; i++) {
            for (let j = 0; j < fairplay.cols; j++) {
                if (x1 == -1) {
                    if (str[k] == fairplay.tableKey[i][j]) {
                        x1 = i, y1 = j;
                    }
                }
                if (x2 == -1) {
                    if (str[k + 1] == fairplay.tableKey[i][j]) {
                        x2 = i, y2 = j;
                    }
                }
            }
        }
		
		// Если имеют одинаковую строку сместить влево
		if (x1 == x2){
			if (y1 > 0) {
				y1--;
			} else {
				y1 = fairplay.cols - 1;
			}
			newStr += playfairCoord(x1, y1);

			if (y2 > 0) {
				y2--;
			} else {
				y2 = fairplay.cols - 1;
			}
			newStr += playfairCoord(x2, y2);
		// Если имеют одинаковый столбик сместить вверх
		} else if (y1 == y2){
			
			if (x1 > 0) {
				x1--;
			} else {
				x1 = fairplay.rows - 1;
			}
			newStr += playfairCoord(x1, y1);

			if(x2 > 0){
				x2--;
			} else {
				x2 = fairplay.rows - 1;
			}
			newStr += playfairCoord(x2, y2);
		// Смена по углам
		} else {
			newStr += playfairCoord(x1, y2);
			newStr += playfairCoord(x2, y1); 
		}
	}
    newStr = charToMark(newStr);
    newStr = newStr.replaceAll(probRep, prob);
	
	return newStr;
}

function fillPlayfairEn() {
    let text = document.querySelector('#playfairEnArea').value;
    let key = document.querySelector("#playfairEnKey").value;
    let testKey = strToSet(key);
    let newText = "";

    if (testKey != key.toLocaleLowerCase()) {
        newText = "Ключ не должен иметь одинаковые символы";
    } else {
        playfairTableKey(key);

        if (spaceTypes.playfairSpace) {
            newText = spaceWithStart(text);
            newText = playfairEncrypt(newText);
        } else {
            newText = spaceWithout(text);
            newText = playfairEncrypt(newText);
        }
    }
    
    document.getElementById('playfairAfterEn').value = newText;
};

function fillPlayfairDe() {
    let text = document.querySelector('#playfairDeArea').value;
    let key = document.querySelector("#playfairDeKey").value;
    let testKey = strToSet(key);
    let newText = ""
    if (testKey != key.toLocaleLowerCase()) {
        newText = "Ключ не должен иметь одинаковые символы";
    } else {
        if (spaceTypes.playfairSpace) {
            newText = playfairDecrypt(text);
            newText = spaceWithEnd(newText);
        } else {
            newText = playfairDecrypt(text);
            newText = spaceWithout(newText);
        }
    }

    document.getElementById('playfairAfterDe').value = newText;
};


//
// Шифр Кардано
//
function cardanoEn(text) {
    text = markToChar(text.toLocaleLowerCase());
    const items = document.querySelectorAll(".itemCardano");
    let matrix1 = [];

    items.forEach(item => {
        if (item.checked) {
            matrix1.push(1);
        } else {
            matrix1.push(0);
        }
    });

    let matrix2 = new Array(matrix1.length);
    let matrix3 = new Array(matrix1.length);
    let matrix4 = new Array(matrix1.length);
    let matrLen = matrix1.length;

    for (let i = 0; i < matrLen / 2; i++) {
        let x = Math.floor(i / 10);
        let y = i % 10;
        matrix3[(5 - x) * 10 + y] = matrix1[i];
        matrix3[i] = matrix1[(5 - x) * 10 + y];
    }

    for (let i = 0 ; i < matrLen / 2; i++) {
        matrix2[i] = matrix1[matrLen - i - 1]
        matrix2[matrLen - i - 1] = matrix1[i];

        matrix4[i] = matrix3[matrLen - i - 1];
        matrix4[matrLen - i - 1] = matrix3[i];
    }

    for (let i = 0; i < matrLen; i++) {
        let tempMatr1 = Number(matrix1[i]);
        let tempMatr2 = Number(matrix2[i]);
        let tempMatr3 = Number(matrix3[i]);
        let tempMatr4 = Number(matrix4[i]);
        if ((tempMatr1 + tempMatr2 + tempMatr3 + tempMatr4) != 1) {
                let resultText = "Неправильная таблица, введите другую";
                return resultText;
            }
    }

    let textEn = "";
    let ans = new Array(6);
    for (let i = 0; i < 6; i++) {
        ans[i] = new Array(10);
    }

    for (let n = 0; n < text.length; n += 60) {
        let x = 0;

        for (let i = 0; i < matrLen; i++) {
            if (matrix1[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "ф"
                }
            }
        }

        for (let i = 0; i < matrix2.length; i++) {
            if (matrix2[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "ф";
                }
            }
        }

        for (let i = 0; i < matrix3.length; i++) {
            if (matrix3[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "ф";
                }
            }
        }

        for (let i = 0; i < matrix4.length; i++) {
            if (matrix4[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "ф";
                }
            }
        }

        for (let i = 0; i < ans.length; i++) {
            for (let j = 0; j < ans[i].length; j++) {
                textEn += ans[i][j];
            }
        }
    }

    return textEn;
}

function cardanoDe(text) {
    text = markToChar(text.toLocaleLowerCase());
    const items = document.querySelectorAll(".grid-item");
    let matrix1 = [];

    items.forEach(item => {
        if (item.checked) {
            matrix1.push(1);
        } else {
            matrix1.push(0);
        }
    });

    let matrix2 = new Array(matrix1.length);
    let matrix3 = new Array(matrix1.length);
    let matrix4 = new Array(matrix1.length);
    let matrLen = matrix1.length;

    for (let i = 0; i < matrLen / 2; i++) {
        let x = Math.floor(i / 10);
        let y = i % 10;
        matrix3[(5 - x) * 10 + y] = matrix1[i];
        matrix3[i] = matrix1[(5 - x) * 10 + y];
    }

    for (let i = 0 ; i < matrLen / 2; i++) {
        matrix2[i] = matrix1[matrLen - i - 1]
        matrix2[matrLen - i - 1] = matrix1[i];

        matrix4[i] = matrix3[matrLen - i - 1];
        matrix4[matrLen - i - 1] = matrix3[i];
    }

    for (let i = 0; i < matrLen; i++) {
        let tempMatr1 = Number(matrix1[i]);
        let tempMatr2 = Number(matrix2[i]);
        let tempMatr3 = Number(matrix3[i]);
        let tempMatr4 = Number(matrix4[i]);
        if ((tempMatr1 + tempMatr2 + tempMatr3 + tempMatr4) != 1) {
                let resultText = "Неправильная таблица, введите другую";
                return resultText;
            }
    }

    let textDe = "";
    let ans = new Array(6);
    for (let i = 0; i < 6; i++) {
        ans[i] = new Array(10);
    }

    for (let n = 0; n < text.length; n += 60) {
        let x = 0;

        for (let i = 0; i < matrLen; i++) {
            ans[Math.floor(i / 10)][i % 10] = text[n + i];
        }

        for (let i = 0; i < matrLen; i++) {
            if (matrix1[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix2.length; i++) {
            if (matrix2[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix3.length; i++) {
            if (matrix3[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix4.length; i++) {
            if (matrix4[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }
    }

    while (textDe[textDe.length - 1] == "ф") {
        textDe = textDe.substring(0, textDe.length - 1);
    }
    textDe = charToMark(textDe);
    
    return textDe;
}

function fillCardanoEn() {
    let text = document.querySelector('#cardanoEnArea').value;
    let newText = "";

    if (spaceTypes.cardanoSpace) {
        newText = spaceWithStart(text);
        newText = cardanoEn(newText);
    } else {
        newText = spaceWithout(text);
        newText = cardanoEn(newText);
    }
    
    document.getElementById('cardanoAfterEn').value = newText;
}

function fillCardanoDe() {
    let text = document.querySelector('#cardanoDeArea').value;
    let newText = ""

    if (spaceTypes.cardanoSpace) {
        newText = cardanoDe(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = cardanoDe(text);
    }

    document.getElementById('cardanoAfterDe').value = newText;
}

function fillCardanoTable(){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
            const gridItem = document.createElement('input');
            gridItem.setAttribute('type', 'checkbox');
            gridItem.classList.add('grid-item');
            gridItem.classList.add('itemCardano');
            document.querySelector("#cardanoTable").appendChild(gridItem);
        }
    }
}


//
// Шифр Вертикальной перестановки
//
function vertSort(order, data) {
    let i = 0;

    while (i < order.length) {
        if (order[i] - 1 === i) {
            i++;
            continue;
        }
        let index = order[i] - 1;
        data[i] = data.splice(index, 1, data[i])[0];
        order[i] = order.splice(index, 1, order[i])[0];
    }

    return data;
}

function vertGetOrder(alphabet, key) {
    let result = [];
    for (let i = 0; i < key.length; i++) {
        result.push(0);
    }

    let letterIndexes = [];
    for (let letter of key) {
        let pos = alphabet.indexOf(letter);
        letterIndexes.push(Number(pos));
    }

    let positions = letterIndexes.slice();
    positions.sort((a, b) => a - b);
    let i = 0;

    for (let position of positions) {
        while (letterIndexes.includes(position)) {
            let pos = letterIndexes.findIndex(x => x === position);

            if (result[pos] !== undefined) {
                result[pos] = i + 1;
            }
            if (letterIndexes[pos] !== undefined) {
                letterIndexes[pos] = alphabet.length;
            }
            i += 1;
        }
    }

    return result;
}

function vertRowsAndKeys(alphabet, phrase, key) {
    let phraseLen = phrase.length;
    let keys = vertGetOrder(alphabet, key);
    let rowO = Math.floor(phraseLen / keys.length);
    let row = (phraseLen % keys.length !== 0) ? rowO + 1 : rowO;
    return [keys, row];
}

function vertEmpty(keys, lastRow) {
    let result = [];
    for (let i = keys.length - 1; i >= keys.length - lastRow; i--) {
        result.push(keys[i]);
    }

    if (lastRow > 0) {
        result.sort();
        return result;
    } else {
        return null;
    }
}

function vertResult(alphabet, buffer, row, col) {
    let result = '';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let index = buffer[j][i];
            if (index !== -1) {
                result += alphabet[index];
            }
        }
    }
    return result;
}

function vertEncrypt(phrase, key) {
    let alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    phrase = String(markToChar(phrase)).toLocaleLowerCase();
    let [keys, row] = vertRowsAndKeys(alphabet, phrase, key);
    let buffer = [];
    let letter = phrase.split('');

    for (let i = 0; i < keys.length; i++) {
        buffer.push([]);
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < keys.length; j++) {
            let val = (letter.length > 0) ? alphabet.indexOf(letter.shift()) : -1;
            buffer[j].push(val);
        }
    }

    let keysCopy = [...keys];
    buffer = vertSort(keysCopy, buffer);
    return vertResult(alphabet, buffer, row, keys.length);
}

function vertCheckKeys(keys) {
    let result = [];

    for (let i = 0; i < keys.length; i++) {
        result.push(0);
    }

    for (let i = 0; i < keys.length; i++) {
        let elem = keys[i];
        let index = elem - 1;
        if (result[index] !== undefined) {
            result[index] = i + 1;
        } else {
            throw new Error("Ключ содержит неверные значения");
        }
    }

    return result;
}

function vertDecrypt(phrase, key) {
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    const [keys, row] = vertRowsAndKeys(alphabet, phrase, key);
    let buffer = [];
    let letter = phrase.split('');

    for (let i = 0; i < keys.length; i++) {
        buffer.push([]);
    }

    const empty_slots = vertEmpty(keys, row * keys.length - phrase.length);
    let k = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < keys.length; j++) {
            let elem;
            if (empty_slots) {
                elem = empty_slots[k];
                k++;
            }
            const val = i + 1 === row && elem && elem - 1 === j ? -1 : letter.length > 0 ? alphabet.indexOf(letter.shift()) : -1;
            buffer[j].push(val);
        }
    }
    buffer = vertSort(vertCheckKeys(keys), buffer);
    
    let result = vertResult(alphabet, buffer, row, keys.length);
    result = charToMark(result);
    return result;
}

function fillVertEn() {
    let text = document.querySelector('#vertEnArea').value;
    let key = document.querySelector("#vertEnKey").value;
    let testKey = strToSet(key);
    let newText = "";

    if (spaceTypes.vertSpace) {
        newText = spaceWithStart(text);
        newText = vertEncrypt(newText, key);
    } else {
        newText = spaceWithout(text);
        newText = vertEncrypt(newText, key);
    }
    
    document.getElementById('vertAfterEn').value = newText;
}

function fillVertDe() {
    let text = document.querySelector('#vertDeArea').value;
    let key = document.querySelector("#vertDeKey").value;
    let testKey = strToSet(key);
    let newText = ""

    if (spaceTypes.vertSpace) {
        newText = vertDecrypt(text, key);
        newText = spaceWithEnd(newText);
    } else {
        newText = vertDecrypt(text, key);
        newText = spaceWithout(newText);
    }

    document.getElementById('vertAfterDe').value = newText;
}


//
// Сеть Фейстеля
//
// массив из 4 в число для сложения
function festTo32(vec) {
    let out_data_32 = vec[0];
    out_data_32 = (out_data_32 << 8) + vec[1];
    out_data_32 = (out_data_32 << 8) + vec[2];
    out_data_32 = (out_data_32 << 8) + vec[3];
    return out_data_32
}

// наоборот из верхней
function festFrom32(num) {
    let result = [];
    result.push((num >> 24) & 0xff);
    result.push((num >> 16) & 0xff);
    result.push((num >> 8) & 0xff);
    result.push(num & 0xff);
    return result;
}

// Сложение двух двоичных векторов по модулю 32
function festAdd32(left, right) {
    let left_32 = festTo32(left);
    let right_32 = festTo32(right);
    let result_32 = ((left_32 + right_32) % 0x100000000) >>> 0;
    return festFrom32(result_32);
}

// Преобразование g
function gFest(a, key) {
    let internal = festAdd32(a, key);
    internal = sblock(internal);
    let result_32 = festTo32(internal);
    result_32 = ((result_32 << 11) | (result_32 >>> 21)) >>> 0;
    return festFrom32(result_32);
}

function festXor32(left, right) {
    return left.map((l, i) => l ^ right[i]);
}

// Развертывание ключей
function festExpandKey(key) {
    let result = [];
    for (let i = 0; i < 24; i++) {
        let i1 = (i * 4) % 32;
        let i2 = (i * 4 + 4) % 32;
        i2 = i2 === 0 ? i2 + 32 : i2;
        result.push(key.slice(i1, i2));
    }
    for (let i = 7; i >= 0; i--) {
        result.push(key.slice(i * 4, i * 4 + 4));
    }
    return result;
}

// одна итерация
function festNetNode(left, right, key) {
    return [right, festXor32(left, gFest(right, key))];
}

// Разбиение G на меньшие подфункции
function festNet32(val, keys) {
    let left = val.slice(0, 4);
    let right = val.slice(4, 8);
    for (let key of keys) {
        let buffer = [...left];
        buffer.push(...right);
        console.log(bytesToHex(buffer));
        [left, right] = festNetNode(left, right, key);
    }
    let temp = right;
    right = left
    left = temp
    let result = [...left]
    result.push(...right);
    return result;
}

function festProto(phrase, keys) {
    phrase = hexToBytes(phrase);
    let result = "";
    for (let i = 0; i < phrase.length; i += 8) {
        let fragment = phrase.slice(i, i + 8);
        fragment = festNet32(fragment, keys);
        result += bytesToHex(fragment);
    }
    return result;
}

function festEncrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    return festProto(phrase, expandedKeys);
}

function festDecrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    expandedKeys.reverse();
    return festProto(phrase, expandedKeys);
}

function festPrepairPhrase(phrase) {
    return bytesToHex(str_to_bytes(phrase, 8));
}

//
//
//
//




window.onload = () => {
    // События на кнопки
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
    document.querySelector('#sblokEnBtn').
        addEventListener('click', event => {
            fillSblokEn();
        });
    document.querySelector('#sblokDeBtn').
        addEventListener('click', event => {
            fillSblokDe();
        });
    document.querySelector('#matrEnBtn').
        addEventListener('click', event => {
            fillMatrEn();
        });
    document.querySelector('#matrDeBtn').
        addEventListener('click', event => {
            fillMatrDe();
        });
    document.querySelector('#playfairEnBtn').
        addEventListener('click', event => {
            fillPlayfairEn();
        });
    document.querySelector('#playfairDeBtn').
        addEventListener('click', event => {
            fillPlayfairDe();
        });
    document.querySelector('#vertEnBtn').
        addEventListener('click', event => {
            fillVertEn();
        });
    document.querySelector('#vertDeBtn').
        addEventListener('click', event => {
            fillVertDe();
        });
    document.querySelector('#cardanoEnBtn').
        addEventListener('click', event => {
            fillCardanoEn();
        });
    document.querySelector('#cardanoDeBtn').
        addEventListener('click', event => {
            fillCardanoDe();
        });
    
    //
    //
    
    // События на переключение страниц шифров
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
    document.querySelector('#sblokPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#sblok').classList.remove('hidden');
        state.activeSection = document.querySelector('#sblok');
    });
    document.querySelector('#matrPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#matr').classList.remove('hidden');
        state.activeSection = document.querySelector('#matr');
    });
    document.querySelector('#playfairPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#playfair').classList.remove('hidden');
        state.activeSection = document.querySelector('#playfair');
    });
    document.querySelector('#vertPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#vert').classList.remove('hidden');
        state.activeSection = document.querySelector('#vert');
    });
    document.querySelector('#cardanoPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#cardano').classList.remove('hidden');
        state.activeSection = document.querySelector('#cardano');
    });

    //
    //

    // Отслеживание режима работы с пробелами
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
    document.querySelector("#sblokSpaceType").addEventListener('click', event => {
        spaceTypes.sblokSpace = document.querySelector("#sblokSpaceType").checked;
    });
    document.querySelector("#matrSpaceType").addEventListener('click', event => {
        spaceTypes.matrSpace = document.querySelector("#matrSpaceType").checked;
    });
    document.querySelector("#playfairSpaceType").addEventListener('click', event => {
        spaceTypes.playfairSpace = document.querySelector("#playfairSpaceType").checked;
    });
    document.querySelector("#vertSpaceType").addEventListener('click', event => {
        spaceTypes.vertSpace = document.querySelector("#vertSpaceType").checked;
    });
    document.querySelector("#cardanoSpaceType").addEventListener('click', event => {
        spaceTypes.cardanoSpace = document.querySelector("#cardanoSpaceType").checked;
    });
    

    // Дополнительные кнопки
    // Изменение размера матрицы
    document.querySelector('#matrAcept').addEventListener('click', event => {
        document.querySelector(`#${matr.matrActiveEn}`).classList.add("hidden");
        document.querySelector(`#${matr.matrActiveDe}`).classList.add("hidden");
        matr.matrSize = document.querySelector("#matrSize").value;
        matr.matrActiveEn = `tableEn${matr.matrSize}`;
        matr.matrActiveDe = `tableDe${matr.matrSize}`;
        document.querySelector(`#${matr.matrActiveEn}`).classList.remove("hidden");
        document.querySelector(`#${matr.matrActiveDe}`).classList.remove("hidden");
    });

    fillCardanoTable();
};