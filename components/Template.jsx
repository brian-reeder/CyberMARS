import { useState, useCallback } from 'react';

import styles from '../styles/Template.module.css';

// TODO: Prepopulate Formula on reload.
export default function Template( { formula, artifacts, ...props } ) {
	const rx = /\$\{(([A-Z])\.([0-9][0-9])\.([^\}]*))\}/g;
	
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

		if(!evItem.fields.hasOwnProperty(match[4])) {
			// TODO: Highlight field notation.
			continue;
		}
		output = output.replace(match[0], evItem.fields[match[4]]);
	}

	return (
		<article className={ styles.artifact }>
		  <div className={ styles.controls }>
		    <h4>Template ({ props.id })</h4>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>
		  <section className={ styles.formula }>
		    <header>
		      <h5>Formula</h5>
		    </header>
		    <textarea
		      className={ styles.structure }
		      onChange={ props.handleChange }
		    ></textarea>
		  </section>
		  <hr className={ styles.card } />

		  <section className={ styles.report }>
		    <header>
		      <h5>Report</h5>
		    </header>
		    <textarea 
		      className={ styles.reportText}
		      readOnly={true}
		      value={ output }
		    ></textarea>
		  </section>
		</article>
	);
}
