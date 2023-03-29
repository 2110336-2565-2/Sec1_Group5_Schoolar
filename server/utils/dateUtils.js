exports.toDate = (text) => {
	if (text.includes('/')) {
		// 20/02/2023
		const [day, month, year] = text.split('/').map(Number)
		return new Date(year, month - 1, day)
	} else {
		// 2023-02-22T17:00:00.000Z
		return new Date(text)
	}
}
