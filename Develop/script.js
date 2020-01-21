// DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Generate Event Listen
generate.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
});

// Copy to Clipboard
clipboard.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	alert("Password copied to clipboard");
});

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
	// 1. Intialize Password Variable (string that will build on to create password)
	// 2. Filter out unchecked types
	// 3. Loop over length and call generator function for each type
	// 4. Add final password to password vairable and return it to resultEl, etc.

	let generatePassword = "";
	const typesCount = lower + upper + number + symbol;

	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		item => Object.values(item)[0]
	);

	// console.log("typesArr: ", typesArr);

	if (typesCount === 0) {
		return "";
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funName = Object.keys(type)[0];

			// console.log("funcName: ", funcName);

			generatePassword += randomFunc[funName]();
		});
	}

	const finalPassword = generatePassword.slice(0, length);

	return finalPassword;
	// Return final Password from Generate Password function which will get put in the results.
}

// Generator Functions - http://www.net-comber.com/charset.html

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}
