export const getAuthorNames = (course, authorsList) => {
	return course.map((authorId) => {
		const author = authorsList.find((author) => author.id === authorId);
		return author ? author.name : 'Unknown Author';
	});
};
