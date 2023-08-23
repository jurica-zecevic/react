import PropTypes from 'prop-types';

import IconButton from '../../../common/IconButton/IconButton';
import { addIcon, deleteIcon } from '../../../common/style/icons';

const AuthorItem = ({ author, onAdd, onDelete }) => {
	return (
		<div>
			<span>Author </span>
			<span>{author.name}</span>
			{onAdd && <IconButton icon={addIcon} onClick={onAdd} />}
			<IconButton icon={deleteIcon} onClick={onDelete} />
		</div>
	);
};

AuthorItem.propTypes = {
	author: PropTypes.object,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func,
};

export default AuthorItem;
