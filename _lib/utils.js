function accessor(value) {
	if (typeof value === "function") return value;

	return (obj) => obj[value];
}

function* chain(...iterables) {
	for (let i of iterables) {
		for (let j of i) {
			yield j;
		}
	}
}

function* uniqueBy(iterable, property) {
	const acc = accessor(property);
	const seen = new Set();

	for (let i of iterable) {
		const id = acc(i);

		if (seen.has(id)) continue;

		seen.add(id);
		yield i;
	}
}

module.exports = {
	chain,
	uniqueBy,
};
