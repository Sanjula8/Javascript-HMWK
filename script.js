// DOM Elements -- Document Object Model
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboard = document.getElementById("clipboard");

var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Generate Event Listen
generate.addEventListener("click", function() {
	var length = +lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
});

// Copy to Clipboard
clipboard.addEventListener("click", function() {
	var textarea = document.createElement("textarea");
	var password = resultEl.innerText;

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
	var typesCount = lower + upper + number + symbol;

	var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		item => Object.values(item)[0]
	);

	// console.log("typesArr: ", typesArr);

	if (typesCount === 0) {
		return "";
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			var funName = Object.keys(type)[0];

			// console.log("funcName: ", funcName);

			generatePassword += randomFunc[funName]();
		});
	}
	// Slice returns the selected elements in the array as a new array object.  In this case, the password is being returned as a new object.
	var finalPassword = generatePassword.slice(0, length);

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
	var symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}
