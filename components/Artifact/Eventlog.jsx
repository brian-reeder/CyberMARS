import { useState } from 'react';
import styles from '../../styles/Artifact/Eventlog.module.css';


export default function Eventlog( props ) {
	const [fields, setFields] = useState({'test':'value'});
	const [isHidden, setIsHidden] = useState(true);

	function handleClick() {
	};

	function toggleHide() {
		setIsHidden(!isHidden);
	};

	return (
		<div className={ styles.eventlog }>
		  <div className={ styles['controls']}>
		    <h4>Event Log</h4>
		    <button
		      onClick={ toggleHide }
		    >Show Fields</button>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>

		  <textarea
		    className={ styles.log }
		    //value={ props.value }
		    onChange={ props.handleChange }
		    readOnly={ false }
		  >{ props.children }</textarea>

		  <textarea
		    className={ `${styles.json} ${isHidden ? styles.hidden : ''}` }
		    value={ JSON.stringify(props.fields, '\n', 2) }
		    readOnly={ true } 
		  ></textarea>
		</div>
	);
}
