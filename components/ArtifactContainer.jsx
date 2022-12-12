import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpster, faEyeLowVision, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function ArtifactContainer({ artifacts, ...props }) {
	const [artifactIsHidden, setArtifactIsHidden] = useState({});

	function clearAllArtifacts(e) {
		[...document.querySelectorAll("article[class^='Artifact_artifact_'] textarea")].forEach(
			(e) => {
				e.value = '';
			}
		);

	};

	function removeArtifact(index) {
		const newArtifactIsHidden = {...artifactIsHidden};

		const id = artifacts[index].id;
		if(newArtifactIsHidden[id] !== undefined) {
			delete newArtifactIsHidden[id];
		}

		props.handleRemoveArtifact(index);
		setArtifactIsHidden(newArtifactIsHidden);
	};

	function toggleHide(index) {
		let newArtifactIsHidden = {...artifactIsHidden};
		const isHidden = newArtifactIsHidden[index];
		if(isHidden == undefined) {
			newArtifactIsHidden[index] = true;
		}
		else {
			newArtifactIsHidden[index] = !isHidden;
		}

		setArtifactIsHidden(newArtifactIsHidden);
	};

	function hideAllArtifacts(e) {
		let newArtifactIsHidden = {};
		for(const elem of artifacts) {
			newArtifactIsHidden[elem.id] = true;
		}
		setArtifactIsHidden(newArtifactIsHidden);
	};

	return (
		<>
		  <section className={ styles.artifactModule }>
		    <header className={ styles.header }>
		      <h2 className={ styles.title }>Artifacts</h2>
		      <div className={ styles.controls }>
		        <h3>Controls</h3>
		        <span
		          onClick={ props.handleAddArtifact }
		          value="addArtifact"
		        >
		          <FontAwesomeIcon icon={ faSquarePlus } />
		        </span>
		        <span
		          onClick={ props.handleClearArtifacts }
	                  value="clearArtifacts"
	                >
		          <FontAwesomeIcon icon={ faSquareMinus } />
		        </span>
		        <span
		          onClick={ clearAllArtifacts }
	                  value="clearArtifacts"
		        >
		          <FontAwesomeIcon icon={ faDumpster } />
		        </span>
		        <span
		          onClick={ hideAllArtifacts }
	                  value="hideAllArtifacts"
		        >
		          <FontAwesomeIcon icon={ faEyeLowVision } />
		        </span>
		      </div>
		    </header>
		    <ul className={ styles.elementContainer }>
		      { artifacts.map( (item,index) =>
		        <li key={ item.id }>
			    <Artifact 
			      id={ item.id }
			      label={ item.label }
			      evidenceItems={ item.evidenceItems }
			      isHidden={ artifactIsHidden[item.id] }

			      handleChangeLabel={ () => props.handleChangeArtifactLabel(index) }
			      handleRemove={ () => removeArtifact(index) }
			      handleAddEvidence={ (type) => props.handleAddEvidence(index, type) }
			      handleRemoveEvidence={ (evIndex) => props.handleRemoveEvidence(index, evIndex) }
			      handleUpdateEvidence={ (evIndex) => props.handleUpdateEvidence(index, evIndex)}
			      handleParserChange = { (evIndex) => props.handleParserChange(index, evIndex)}
			      handleToggleHide = { () => toggleHide(item.id) }

			    />
			</li>
		      ) }
		    </ul>
		  </section>
		</>
	);
};
