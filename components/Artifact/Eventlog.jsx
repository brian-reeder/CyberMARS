import { useState } from 'react';
import styles from '../../styles/Artifact/Eventlog.module.css';

function FormatSelector( props ) {
	const formats = [
		{
			id: 0,
			label: ' ',
		},
		{
			id: 1,
			label: 'JavaScript Object Notation (JSON)',
		},
		{
			id: 2,
			label: 'Common Event Format (CEF)',
		},
		
		// Vendor Specific Formats
		{
			id: 10,
			label: 'Windows Event Log',
		},
	];

	return (
		<select value={props.parser} onChange={props.handleChange}>
		{ formats.map( e => <option key={e.id} value={e.id} disabled={e.id === 0}>{e.label}</option>)}
		</select>
	);
};

export default function Eventlog( props ) {
	const [isHidden, setIsHidden] = useState(true);

	function toggleHide() {
		setIsHidden(!isHidden);
	};

	return (
		<div className={ styles.eventlog }>
		  <div className={ styles['controls']}>
		    <h4>({ props.id })</h4>
		    <button onClick={ toggleHide }>Show Fields</button>
		    <button onClick={ props.handleRemove }>Remove</button>
		  </div>

		  <FormatSelector
		    parser={props.parser}
		    handleChange={ props.handleParserChange }
		  />

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
