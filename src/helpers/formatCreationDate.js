export const formatCreationDate = (creationDate) => {
	const date = creationDate.split('/');
	const dateRes = date.join('.');
	return dateRes;
};
