import { useState, useCallback } from 'react';

import styles from '../styles/Template.module.css';


export default function Template( { formula, ...props } ) {
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
		    <textarea className={ styles.structure }></textarea>
		  </section>
		  <hr className={ styles.card } />
		  <section className={ styles.report }>
		    <header>
		      <h5>Report</h5>
		    </header>
		    <textarea 
		      className={ styles.reportText}
		      readOnly="true"
		      value="This is a test..."
		    ></textarea>
		  </section>
		</article>
	);
}
