import {useRef, useEffect} from 'react';

import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function ArtifactContainer({ artifacts, ...props }) {
	function clearAllArtifacts(e) {
		[...document.querySelectorAll("article[class^='Artifact_artifact_'] textarea")].forEach(
			(e) => {
				e.value = '';
			}
		);

	};

	function hideAllArtifacts(e) {
		console.log('Hide all artifacts!');
	};

	return (
		<>
		  <section className={ styles.artifactModule }>
		    <header className={ styles.header }>
		      <h2 className={ styles.title }>Artifacts</h2>
		      <div className={ styles.controls }>
		        <h3>Controls</h3>
		        <button
		          onClick={ props.handleAddArtifact }
		          value="addArtifact"
		        >Add Artifact</button>
		        <button
		          onClick={ props.handleClearArtifacts }
	                  value="clearArtifacts"
	                >Remove All Artifacts</button>
		        <button
		          onClick={ clearAllArtifacts }
	                  value="clearArtifacts"
	                >Clear All Artifacts</button>
		        <button
		          onClick={ hideAllArtifacts }
	                  value="hideAllArtifacts"
	                >Hide All Artifacts</button>
		      </div>
		    </header>
		    <ul className={ styles.elementContainer }>
		      { artifacts.map( (item,index) =>
		        <li key={ item.id }>
			    <Artifact 
			      id={ item.id }
			      label={ item.label }
			      evidenceItems={ item.evidenceItems }

			      handleChangeLabel={ () => props.handleChangeArtifactLabel(index) }
			      handleRemove={ () => props.handleRemoveArtifact(index) }
			      handleAddEvidence={ () => props.handleAddEvidence(index) }
			      handleRemoveEvidence={ (evIndex) => props.handleRemoveEvidence(index, evIndex) }
			      handleUpdateEvidence={ (evIndex) => props.handleUpdateEvidence(index, evIndex)}
			      handleParserChange = { (evIndex) => props.handleParserChange(index, evIndex)}

			    />
			</li>
		      ) }
		    </ul>
		  </section>
		</>
	);
};
