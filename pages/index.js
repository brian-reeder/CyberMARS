import Head from 'next/head'
import { useState, useCallback } from 'react';

import ArtifactContainer from '../components/ArtifactContainer';
import Placeholder from '../components/Placeholder';

export default function Home() {
	const [artifacts, setArtifacts] = useState([]);

	const handleAddArtifact = useCallback( () => {
                const val = event.target.value;
		setArtifacts([...artifacts,{
			'id': `Artifact_${Date.now()}${Math.random()}`,
                        'evidenceItems': []
                }]);
        }, [artifacts]);

	const handleRemoveArtifact = useCallback( (index) => {
		let arry = artifacts;
		arry.splice(index, 1);
		setArtifacts([...arry]);
	}, [artifacts]);

	const handleAddEvidence = useCallback( (index) => {
                let arry = artifacts;
                let evItems = arry[index].evidenceItems;
                arry[index].evidenceItems = [
                        ...evItems,
                        {
                                'id': `Evidence_${Date.now()}${Math.random()}`,
                                'type': event.target.value,
                                'value': '',
                                'fields': {}
                        }
                ];
                setArtifacts([...arry]);
        }, [artifacts]);

	const handleUpdateEvidence = useCallback( (index, evIndex) => {
                let arry = artifacts;
                let evidence = arry[index].evidenceItems[evIndex];
                switch(evidence.type) {
                        case 'eventlog':
				console.log(event.target.tagName);
                                evidence.fields = event.target.value ? {
                                        'key': event.target.value
                                } : {};
                        break;
                };

                arry[index].evidenceItems.splice(evIndex, 1, evidence);
                setArtifacts([...arry]);
        }, [artifacts] );

	const handleRemoveEvidence = useCallback( (index, evIndex) => {
                let arry = artifacts;
                let evItems = arry[index].evidenceItems
                evItems.splice(evIndex, 1);
                arry[index].evidenceItems = [...evItems];

                setArtifacts([...arry]);
        }, [artifacts] );


  return (
	<>
	  <Head>
	    <title>Under Construction...</title>
	  </Head>
	  <ArtifactContainer 
	    artifacts={ artifacts }
	    handleAddArtifact={ handleAddArtifact }
	    handleRemoveArtifact={ handleRemoveArtifact }
	    handleAddEvidence={ handleAddEvidence }
	    handleUpdateEvidence={ handleUpdateEvidence }
	    handleRemoveEvidence={ handleRemoveEvidence }
	  />
	  <Placeholder />
	</>
  );
};
