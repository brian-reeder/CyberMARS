import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function ArtifactContainer({ artifacts, ...props }) {
	return (
		<>
		  <section className={ styles.artifactModule }>
		    <div className={ styles.controls }>
		      <h4>Controls</h4>
		      <button
		        onClick={ props.handleAddArtifact }
		        value="addArtifact"
		      >Add Artifact</button>
		      <button
		        onClick={ props.handleClearArtifacts }
	                value="clearArtifacts"
	              >Clear Artifacts</button>
		    </div>
		    <ul className={ styles.artifactContainer }>
		      { artifacts.map( (item,index) =>
		        <li key={ item.id }>
			    <Artifact 
			      id={ item.id }
			      evidenceItems={ item.evidenceItems }

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
