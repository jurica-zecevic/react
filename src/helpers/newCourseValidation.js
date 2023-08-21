export const validateNewCourseField = (value, minLength = 2) => {
	return value.length >= minLength;
};
