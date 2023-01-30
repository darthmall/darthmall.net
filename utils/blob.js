function randomInt(limit) {
	return Math.floor(Math.random() * limit);
}

function corner(first, second) {
	return `${2 + randomInt(first)}rem ${2 + randomInt(second)}rem`;
}

module.exports = function blob() {
	return `border-top-left-radius: ${corner(8, 5)};
	border-top-right-radius: ${corner(4, 8)};
	border-bottom-left-radius: ${corner(8, 12)};
	border-bottom-right-radius: ${corner(7, 13)};
	`;
}
