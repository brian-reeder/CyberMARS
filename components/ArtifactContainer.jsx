import { useState, useCallback } from 'react';

import Artifact from '../components/Artifact';

import styles from '../styles/ArtifactContainer.module.css';

export default function ArtifactContainer() {
	const [artifacts, setArtifacts] = useState([]);

	function handleClick() {
		const val = event.target.value;
		const id = `Artifact_${Date.now()}${Math.random()}`;

		switch(val) {
			case 'addArtifact':
				setArtifacts([...artifacts, id]);
			break;
		};
	};

	const handleRemoveChild = useCallback( (index) => {
                let arry = artifacts;
                arry.splice(index, 1);
                setArtifacts([...arry]);
        }, [artifacts] );

	return (
		<>
		  <section className={ styles['artifact-module'] }>
		    <div className={ styles['controls'] }>
		      <h4>Controls</h4>
		      <button
		        onClick={ handleClick }
		        value="addArtifact"
		      >Add Artifact</button>
		    </div>
		    <ul className={ styles['artifact-container'] }>
		      { artifacts.map( (item,index) =>
		        <li key={item}>
			    <Artifact 
			      handleRemove={ () => handleRemoveChild(index) }
			    />
			</li>
		      ) }
		    </ul>
		  </section>
		</>
	);
};
