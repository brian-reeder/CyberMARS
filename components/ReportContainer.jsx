import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

import Template from '../components/Template.jsx';

import styles from '../styles/ArtifactContainer.module.css';

export default function ReportContainer({ title, templates, ...props}) {
	return (
		<>
		  <section className={ styles.artifactModule }>
		    <header className={ styles.header }>
		      <h2 className={ styles.title }>Report Structure</h2>
		      <section className={ `flex row ${styles.reportLabel}` }>
		        <h3>Title</h3>
		        <input
		          className={ styles.reportLabel }
		          value={ title }
		          
		          onChange={ props.handleChangeTitle }
		        />
		      </section>
		      <div className={ styles.controls }>
		        <h3>Controls</h3>
		        <span
		          onClick={ props.handleAddTemplate }
		        >
		          <FontAwesomeIcon icon={ faSquarePlus } />
		        </span>
		        <span
		          onClick={ props.handleClearTemplates }
		        >
		          <FontAwesomeIcon icon={ faSquareMinus } />
		        </span>
		      </div>
		    </header>
		    <ul className={ styles.elementContainer }>
		    { templates.map( (item, index) =>
			    <li key={ item.id }>
			      <Template 
			        id={ item.id }
			        label={ item.label }
			        formula={ item.formula }
			        artifacts={ props.artifacts }
			        handleChangeTemplateLabel={ () => props.handleChangeTemplateLabel(index) }
			        handleChange= { () => props.handleChangeTemplate(index)}
			        handleRemove={ () => props.handleRemoveTemplate(index) }
			      />
			    </li>

		    ) }
		    </ul>
		  </section>
		</>
	);
};
