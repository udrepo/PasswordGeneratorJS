window.addEventListener('load', async ()=>{
    if(navigator.serviceWorker){
        try {
           const reg = await navigator.serviceWorker.register("service-worker.js")
            console.log("SW works", reg)
        }catch (e){
            console.log("Service worker failed")
        }
    }
})

function updateTextInput(val) {
    document.getElementById('textInput').value=val;
}


const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

getLowercase = () => lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
getUppercase= () => upperLetters[Math.floor(Math.random() * upperLetters.length)]
getNumber= () => numbers[Math.floor(Math.random() * numbers.length)]
getSymbol= () => symbols[Math.floor(Math.random() * symbols.length)];

function generatePassword() {
    const len = lenEl.value;
    let password = "";
    if (upperEl.checked)
        password += getUppercase();
    if (lowerEl.checked)
        password += getLowercase();
    if (numberEl.checked)
        password += getNumber();
    if (symbolEl.checked)
        password += getSymbol();
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }
    pwEl.innerText = password.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function generateX() {
    const xs = [];
    if (upperEl.checked)
        xs.push(getUppercase());
    if (lowerEl.checked)
        xs.push(getLowercase());
    if (numberEl.checked)
        xs.push(getNumber());
    if (symbolEl.checked)
        xs.push(getSymbol());
    if (xs.length === 0) return "";
    return xs[Math.floor(Math.random() * xs.length)]
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;
    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
})