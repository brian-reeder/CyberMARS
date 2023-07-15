import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import styles from '../styles/Template.module.css';

export default function Template( { formula, artifacts, ...props } ) {
	const rx = /\$\{(([A-Z])\.([0-9][0-9])\.([^\}]*))\}/g;
	const rx2 = /((\\.)|[^\.])+/g;
	const [isHidden, setIsHidden] = useState(true);

	const reportid = `report_${props.id}`;

        function toggleHide() {
                setIsHidden(!isHidden);
        };

	function sendToClipboard(target) {
		const elem = document.getElementById(reportid);

		var contents = "";
		if(elem) {
			contents = elem.value;
		}

		navigator.clipboard.writeText(contents);

		return;
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
		for(const m of  match[4].matchAll(rx2)) {
			var arry = m[0].split('\\\\');
			for(const i in arry) {
				arry[i] = arry[i].replace('\\', '');
			}
			const word = arry.join('\\');
			
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
		        <FontAwesomeIcon icon={ faCircleMinus } className="control" />
		      </span>
		  </div>
		  <section className={ styles.formula }>
		    <header className={`flex row`}>
		      <h5>Formula</h5>
		      <span
		        onClick={ toggleHide }
		      >
		        <FontAwesomeIcon icon={ isHidden ? faEye : faEyeSlash } className="control" />
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
		    <header className="flex row">
		      <h5>Report</h5>
		      <span
		        onClick={ sendToClipboard }
		      >
		        <FontAwesomeIcon icon={ faCopy } className="control" />
		      </span>
		    </header>
		    <textarea 
		      value={ output }
		      readOnly={ true }
		      id={reportid}
		    ></textarea>
		  </section>
		</article>
	);
}
