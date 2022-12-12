import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import Eventlog from '../components/Artifact/Eventlog';

import styles from '../styles/Artifact.module.css';


export default function Artifact( { evidenceItems, ...props } ) {
	const [isHidden, setIsHidden] = useState(false);

	return (
		<article className={ styles.artifact }>
		  <header className={ `flex row ${styles.header}` }> 
		    <h4>[{ props.id }]</h4>
		    <input
		      className={ styles.label }
		      onChange={ props.handleChangeLabel }
		      type="text"
		      value={ props.label }
		    ></input>
		  </header>
		  <div className={ `flex row ${styles.controls}` }>
		    <span
		      onClick={ () => { props.handleAddEvidence('eventlog') } }
		    >
		      <FontAwesomeIcon icon={ faCirclePlus } />
		    </span>
		    <span
		      onClick={ props.handleRemove }
		    >
		      <FontAwesomeIcon icon={ faCircleMinus } />
		    </span>
		    <span
		      onClick={ props.handleToggleHide }
		    >
		      <FontAwesomeIcon icon={ props.isHidden ? faEye : faEyeSlash } />
		    </span>
		  </div>
		  <div className={ props.isHidden ? styles.hidden : ``}>
		  <ul className={ styles.evidenceContainer }>
		  { evidenceItems.map((e, i) => {
			const nProps = {
				...e,
				artifactId: props.id,
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
		  </div>
		</article>
	);
}
