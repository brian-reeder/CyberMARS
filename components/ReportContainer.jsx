import { useState, useCallback } from 'react';

import Template from '../components/Template.jsx';

import styles from '../styles/ArtifactContainer.module.css';

export default function ReportContainer({ templates, ...props}) {
	return (
		<>
		  <section className={ styles.artifactModule }>
		    <h2 className={ styles.containerHeader }>Report Structure</h2>
		    <div className={ styles.controls }>
		      <h3>Controls</h3>
		      <button
		        onClick={ props.handleAddTemplate }
		      >Add Template</button>
		      <button
		        onClick={ props.handleClearTemplates }
		      >Clear Templates</button>
		    </div>
		    <ul className={ styles.elementContainer }>
		    { templates.map( (item, index) =>
			    <li key={ item.id }>
			      <Template 
			        id={ item.id } 
			        handleRemove={ () => props.handleRemoveTemplate(index) }
			      />
			    </li>

		    ) }
		    </ul>
		  </section>
		</>
	);
};
