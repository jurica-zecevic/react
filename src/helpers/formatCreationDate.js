export const formatCreationDate = (creationDate) => {
	const date = creationDate.replace(/\//g, '.');
	return date;
};
