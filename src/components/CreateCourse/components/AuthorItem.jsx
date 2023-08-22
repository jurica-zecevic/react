import PropTypes from 'prop-types';

import IconButton from '../../../common/IconButton/IconButton';

const AuthorItem = ({ author, onAdd, onDelete }) => {
	return (
		<div>
			<span>Author </span>
			<span>{author.name}</span>
			{onAdd && <IconButton plusIcon onClick={onAdd} />}
			<IconButton deleteIcon onClick={onDelete} />
		</div>
	);
};

AuthorItem.propTypes = {
	author: PropTypes.object,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func,
};

export default AuthorItem;
