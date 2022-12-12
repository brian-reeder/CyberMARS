import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/Template.module.css';

export default function Template( { formula, artifacts, ...props } ) {
	const rx = /\$\{(([A-Z])\.([0-9][0-9])\.([^\}]*))\}/g;
	const [isHidden, setIsHidden] = useState(true);

        function toggleHide() {
                setIsHidden(!isHidden);
        };

	
	let output = formula[0];
	for(const match of formula[0].matchAll(rx)) {
		const tArtifact = artifacts.filter( item => item.id === match[2] );
		const artifact = tArtifact !== undefined ? tArtifact[0] : undefined;
		if(artifact === undefined || artifact.evidenceItems === undefined) {
			// TODO: Highlight Artifact notation.
			continue;
		}

		const tItem = artifact.evidenceItems.filter( item => item.id === match[3] );
		const evItem = tItem !== undefined ? tItem[0] : undefined;
		if(evItem === undefined || evItem.fields === undefined) {
			// TODO: Highlight evidenceItem notation.
			continue;
		}

		let fields = evItem.fields;
		const eventObject = match[4].split('.');

		for(const word of eventObject) {
			if(!fields.hasOwnProperty(word)) {
				// TODO: Highlight field notation.
				fields = undefined;
				break;
			}

			fields = fields[word];
		}
		
		if(fields !== undefined) {
			output = output.replace(match[0], fields);
		}
	}

	return (
		<article className={ styles.artifact }>
		  <header className={ `flex row ${styles.header}` }>
		    <input
		      className={ styles.label }
		      onChange={ props.handleChangeTemplateLabel }
		      
		      type="text"
		      value={ props.label }
		    ></input>
		  </header>
		  <div className={ `flex row ${styles.controls}` }>
		      <span
		        onClick={ props.handleRemove }
		      >
		        <FontAwesomeIcon icon={ faCircleMinus } />
		      </span>
		  </div>
		  <section className={ styles.formula }>
		    <header className={`flex row`}>
		      <h5>Formula</h5>
		      <span
		        onClick={ toggleHide }
		      >
		        <FontAwesomeIcon icon={ isHidden ? faEye : faEyeSlash } />
		      </span>
		    </header>
		    <textarea
		      onChange={ props.handleChange }
		      value={ formula }
		      readOnly={ false }
		      hidden={ isHidden ? true : false }
		    ></textarea>
		  </section>
		  <hr className={ styles.card } />

		  <section className={ styles.report }>
		    <header>
		      <h5>Report</h5>
		    </header>
		    <textarea 
		      value={ output }
		      readOnly={ true }
		    ></textarea>
		  </section>
		</article>
	);
}
