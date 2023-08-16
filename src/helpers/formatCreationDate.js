export const formatCreationDate = (creationDate) => creationDate.replaceAll(/\//g, '.');
	const date = creationDate.replace(/\//g, '.');
	return date;
};
