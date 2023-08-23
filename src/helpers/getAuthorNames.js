export const getAuthorNames = (authors, authorsList) => {
	return authors.map((authorId) => {
		const author = authorsList.find((author) => author.id === authorId);
		return author ? author.name : 'Unknown Author';
	});
};
