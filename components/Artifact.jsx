import { useState, useCallback } from 'react';

import Eventlog from '../components/Artifact/Eventlog';

import styles from '../styles/Artifact.module.css';


export default function Artifact( { evidenceItems, ...props } ) {
	return (
		<article className={ styles.artifact }>
		  <header className={ styles.header }>
		    <h4>({ props.id })</h4>
		    <input
		      className={ styles.label } 
		      onChange={ props.handleChangeLabel }
		      type="text"
		      value={ props.label }
		    ></input>
		  </header>
		  <div className={ styles.controls }>
		    <button
		      onClick={ props.handleAddEvidence }
		      value="eventlog"
		    >Add Event Log</button>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>
		  <ul className={ styles.evidenceContainer }>
		  { evidenceItems.map((e, i) => {
			const nProps = {
				...e,
				'handleChange': () => props.handleUpdateEvidence(i),
				'handleRemove': () => props.handleRemoveEvidence(i),
			}

			let element;
			switch(e.type) {
				case 'eventlog':
					element = <Eventlog { ...nProps }
						handleParserChange={ () => props.handleParserChange(i) }
					/>;
				break;
			}

			return (
				<li key={e.id}>
				  { element }
				</li>
			);
		  })}
		  </ul>
		</article>
	);
}
