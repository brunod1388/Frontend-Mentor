const YEAR_TIME = 365 * 24 * 60 * 60 * 1000;
const MONTH_TIME = 30 * 24 * 60 * 60 * 1000;
const DAY_TIME = 24 * 60 * 60 * 1000;
const NO_ERROR = 0;
const ERROR = 1;

function handleClick() {

	if (checkErrors() === ERROR) {
		document.getElementById("birthYear").innerHTML = "--";
		document.getElementById("birthMonth").innerHTML = "--";
		document.getElementById("birthDay").innerHTML = "--";
		return;
	}

	const birth_day = document.getElementById("day").value;
	const birth_month = document.getElementById("month").value;
	const birth_year = document.getElementById("year").value;
	const today = new Date();

	const days = today.getDate() - birth_day;
	const months = today.getMonth() + 1 - birth_month - (days < 0 ? 1 : 0);
	const years = today.getFullYear() - birth_year - (months < 0 ? 1 : 0);

	const ageDay = days < 0 ? 31 + days : days;
	const ageMonth = months < 0 ? 12 + months : months;
	const ageYear = years;

	document.getElementById("birthYear").innerHTML = ageYear;
	document.getElementById("birthMonth").innerHTML = ageMonth;
	document.getElementById("birthDay").innerHTML = ageDay;
}

const EMPTY_FIELD_MSG = "This field is required"
const INVALID_DATE= {isValid: false, msg: "Must be a valid date"}
const VALIDATION_OK = {isValid: true, msg: ""}

function checkValidity(value, type) {
	const date = new Date();
	if (!value)
		return {isValid: false, msg: EMPTY_FIELD_MSG};
	if (type === "day" && (value < 1 || value > 31))
		return {isValid: false, msg: "Must be a valid day"};
	if (type === "month" && (value < 1 || value > 12))
		return {isValid: false, msg: "Must be a valid month"};
	if (type === "year" && value > date.getFullYear())
		return {isValid: false, msg: "Must be in the past"};
	if (type === "year" && value < 1900)
		return {isValid: false, msg: "Damm, How old are you ?"};
	return VALIDATION_OK;
}

function isLeapYear(year) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function checkDateValidity() {
	const day = document.getElementById("day").value;
	const month = document.getElementById("month").value;
	const year = document.getElementById("year").value;

	if (day == 31 && month in [4, 6, 9, 11])
		return INVALID_DATE;
	if (month == 2 && day > 29)
		return INVALID_DATE;
	if (month == 2 && day == 29 && !isLeapYear(year))
		return INVALID_DATE;
	return VALIDATION_OK;
}

function checkErrors() {
	const values = ["year", "month", "day"];
	let isValid = true;

	values.forEach(valueType => {
		let check = checkValidity(document.getElementById(valueType).value , valueType)
		if (isValid && valueType === "day" && check.isValid)
			check = checkDateValidity();
		if (!check.isValid) {
			document.getElementById("inputs").classList.add("error");
			document.getElementById(valueType + "-error-message").innerHTML = check.msg;
			isValid = false;
		}
		else {
			document.getElementById(valueType + "-error-message").innerHTML = "";
		}
	})
	if (isValid)
		document.getElementById("inputs").classList.remove("error");
	return (isValid ? NO_ERROR : ERROR)
}