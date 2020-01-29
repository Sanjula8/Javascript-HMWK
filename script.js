// DOM Elements
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboard = document.getElementById("clipboard");

// Each function into an object:
var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Generate Event Listen
// 2 Events: One to click "Generate Password Click Event" and the second to copy onto the clipboard.
generate.addEventListener("click", function() {
	var length = +lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;

	// console.log(length); -- Results in a number
	// console.log(typeof length); -- Results in a string, but want a number. Wrapping lengthEl.value in parseint is the same as adding +.

	// console.log(has.Lower, hasUpper, hasNumber, hasSymbol); - To see if they're checked or not.

	if (length < 8 || length > 128) {
		alert("Check yo'self before you wreck yo'self.");
	} else {
		resultEl.innerText = generatePassword(
			hasLower,
			hasUpper,
			hasNumber,
			hasSymbol,
			length
		);
	}
});
// });

// Copy to Clipboard
clipboard.addEventListener("click", function() {
	var textarea = document.createElement("textarea");
	var password = resultEl.innerText;

	if (!password) {
		return;
	}
	// If no password, it won't copy.

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	alert("Password copied to clipboard");

	// appendChild puts it in the body.  Select, then use the exec.Command to copy.
});

// Clear Function

document.getElementById("clear").addEventListener("click", function() {
	var textareaClear = document.querySelector("#result");

	textareaClear.value = "";
});

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
	// 1. Intialize Password Variable (string that will build on to create password)
	// 2. Filter out unchecked types
	// 3. Loop over length and call generator function for each type
	// 4. Add final password to password vairable and return it to resultEl.

	// Generate Password set to empty string.
	let generatePassword = "";
	// Be able to count the number of checked items:
	var typesCount = lower + upper + number + symbol;
	// console.log('typesCount: ', typesCount);

	var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		item => Object.values(item)[0]
	);
	// console.log("typesArr: ", typesArr); - Checked = True; unchecked = False.
	// Curly brackets = array of objects.
	// Filter out what is false using filter method. Filter = high order array method, looping through each item based on a true/false value where it will filter out anything that = false. To get false, we use Object.values(item)[0].

	// Checks to see if none are checked.  If none are checked, an empty string is returned:
	if (typesCount === 0) {
		return "";
	}

	// For Loop = Increment by the number of checked boxes (typesCount). After, you want to take the types.Arr and loop through for each type.  First, get function name (lower, upper, number, symbole), passing through the types into Object.keys, and then the first value (0).
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			var funName = Object.keys(type)[0];

			// console.log("funcName: ", funcName);

			// Key = Coming from forloop.
			generatePassword += randomFunc[funName]();
		});
	}

	// console.log(generatePassword); -- If length is changed to 1, you still get 4 because all the boxes are checked.

	// Slice returns the selected elements in the array as a new array object.  In this case, the password is being returned as a new object so if you're wanting 2 characters, it'll be 2 regardless of the checked boxes.
	var finalPassword = generatePassword.slice(0, length);

	return finalPassword;
	// Return final Password from Generate Password function which will get put in the results.
}

// Generator Functions - http://www.net-comber.com/charset.html

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// Math.random generates a random decimal, but we want a whole number, so we use Math.floor.  For the code, we need to add a random letter between 97 and 122.  Now we need to add a random number between 1-26 to 97.  This is all within the lowercase letter range.

// console.log(getRandomLower());

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Char: uppercase A starts at 65.  Adding 26 adds a random letter within this range.

// console.log(getRandomUpper());

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// In Char - 0 starts at 48 and we need to go up to 9, which is at 57.  Multiply by 10 to include 0-9.

// console.log(getRandomNumber());

function getRandomSymbol() {
	var symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Using a string to define the random symbols.  Replacing char chode with the symbols.length.

// console.log(getRandomSymbol());
