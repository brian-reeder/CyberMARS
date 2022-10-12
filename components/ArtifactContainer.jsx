import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function ArtifactContainer({ artifacts, ...props }) {
	return (
		<>
		  <section className={ styles['artifact-module'] }>
		    <div className={ styles['controls'] }>
		      <h4>Controls</h4>
		      <button
		        onClick={ props.handleAddArtifact }
		        value="addArtifact"
		      >Add Artifact</button>
		    </div>
		    <ul className={ styles['artifact-container'] }>
		      { artifacts.map( (item,index) =>
		        <li key={item.id}>
			    <Artifact 
			      evidenceItems={ item.evidenceItems }
			      handleRemove={ () => props.handleRemoveArtifact(index) }
			      handleAddEvidence={ () => props.handleAddEvidence(index) }
			      handleRemoveEvidence={ (evIndex) => props.handleRemoveEvidence(index, evIndex) }
			      handleUpdateEvidence={ (evIndex) => props.handleUpdateEvidence(index, evIndex)}

			    />
			</li>
		      ) }
		    </ul>
		  </section>
		</>
	);
};
