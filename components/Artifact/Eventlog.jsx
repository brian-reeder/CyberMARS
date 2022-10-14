import { useState } from 'react';
import styles from '../../styles/Artifact/Eventlog.module.css';


export default function Eventlog( props ) {
	const [isHidden, setIsHidden] = useState(true);

	function toggleHide() {
		setIsHidden(!isHidden);
	};

	return (
		<div className={ styles.eventlog }>
		  <div className={ styles['controls']}>
		    <h4>Event Log ({ props.id })</h4>
		    <button onClick={ toggleHide }>Show Fields</button>
		    <button onClick={ props.handleRemove }>Remove</button>
		  </div>

		  <textarea
		    className={ styles.log }
		    onChange={ props.handleChange }
		    readOnly={ false }
		  ></textarea>

		  <textarea
		    className={ `${styles.json} ${isHidden ? styles.hidden : ''}` }
		    value={ JSON.stringify(props.fields, '\n', 2) }
		    readOnly={ true } 
		  ></textarea>
		</div>
	);
}
