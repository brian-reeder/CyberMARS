import { useState, useCallback } from 'react';

import Eventlog from '../components/Artifact/Eventlog';

import styles from '../styles/Artifact.module.css';


export default function Artifact( { evidenceItems, ...props } ) {
	return (
		<article className={ styles['artifact'] }>
		  <div className={ styles['controls'] }>
		    <h4>Artifact ({ props.id })</h4>
		    <button
		      onClick={ props.handleAddEvidence }
		      value="eventlog"
		    >Add Event Log</button>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>
		  <ul className={ styles['evidence-container'] }>
		  { evidenceItems.map((e, i) => {
			const nProps = {
				...e,
				'handleChange': () => props.handleUpdateEvidence(i),
				'handleRemove': () => props.handleRemoveEvidence(i)
			}

			let element;
			switch(e['type']) {
				case 'eventlog':
					element = <Eventlog {...nProps} />;
				break;
			}

			return (
				<li key={e['id']}>
				  { element }
				</li>
			);
		  })}
		  </ul>
		</article>
	);
}
