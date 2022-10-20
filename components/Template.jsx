import { useState, useCallback } from 'react';

import styles from '../styles/Artifact.module.css';


export default function Template( { formula, ...props } ) {
	return (
		<article className={ styles.artifact }>
		  <div className={ styles.controls }>
		    <h4>Template ({ props.id })</h4>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>
		  <ul className={ styles.evidenceContainer }>
		  </ul>
		</article>
	);
}
