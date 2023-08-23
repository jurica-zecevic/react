import styles from './Textarea.module.css';

const Textarea = ({ ...attributes }) => {
	return <textarea className={styles.textarea} {...attributes} />;
};

export default Textarea;
