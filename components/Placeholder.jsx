import { useState, useCallback } from 'react';

import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function Placeholder() {
	return (
		<>
		  <section className={ styles['artifact-module'] }>
		    <div className={ styles['controls'] }>
		      <h4>Placeholder</h4>
		    </div>
		  </section>
		</>
	);
};
