import { useState, useCallback } from 'react';

import styles from '../styles/ArtifactContainer.module.css';

export default function ReportContainer() {
	return (
		<>
		  <section className={ styles.artifactModule }>
		    <h2 className={ styles.containerHeader }>Report Structure</h2>
		    <div className={ styles.controls }>
		      <h3>Controls</h3>
		      <button>Add Template</button>
		      <button>Clear Templates</button>
		    </div>
		  </section>
		</>
	);
};
