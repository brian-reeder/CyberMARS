import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { encode, decode } from '../lib/b64url.js';

import ArtifactContainer from '../components/ArtifactContainer';
import Placeholder from '../components/Placeholder';

export default function Home() {
	const [artifacts, setArtifacts] = useState([]);
	const router  = useRouter();

	useEffect( ()=> {
		if(!router.isReady) return;

		const handleHashChange = () => {
			const hash = getHash();
			const newArtifacts = hash !== undefined ? hash.artifacts : [];
			setArtifacts([...newArtifacts]);
		};

		window.addEventListener('hashchange', handleHashChange);
		window.addEventListener('load', handleHashChange);
		router.events.on('hashChangeComplete', handleHashChange);
		handleHashChange();
	}, [router.isReady]);

	function getHash() {
		const path = window.location.hash.split('/');
		const appState = path.length > 1 ? decode(path[1]) : {
			'artifacts': []
		};
		return appState;
	}

	function updateHash(newArtifacts) {
		router.push({
			'pathname': '/',
			'hash': `template/${encode(newArtifacts)}`
		});
	};

	const handleAddArtifact =  () => {
                const val = event.target.value;
		const newArtifacts = [...artifacts, {
			'id': `Artifact_${Date.now()}${Math.random()}`,
                        'evidenceItems': []
                }];
		
		updateHash({
			'artifacts': newArtifacts
		});
        };

	const handleRemoveArtifact = (index) => {
		let newArtifacts = artifacts;
		newArtifacts.splice(index, 1);
		
		updateHash({
			'artifacts': newArtifacts
		});
	};

	const handleAddEvidence = (index) => {
                let newArtifacts = artifacts;
                let evItems = newArtifacts[index].evidenceItems;
                newArtifacts[index].evidenceItems = [
                        ...evItems,
                        {
                                'id': `Evidence_${Date.now()}${Math.random()}`,
                                'type': event.target.value,
                                'fields': {}
                        }
                ];

		updateHash({
			'artifacts': newArtifacts
		});
        };

	const handleUpdateEvidence = (index, evIndex) => {
                let newArtifacts = artifacts;
                let evidence = newArtifacts[index].evidenceItems[evIndex];
                switch(evidence.type) {
                        case 'eventlog':
                                evidence.fields = event.target.value ? {
                                        'key': event.target.value
                                } : {};
                        break;
                };

                newArtifacts[index].evidenceItems.splice(evIndex, 1, evidence);
		
		updateHash({
			'artifacts': newArtifacts
		});
        };

	const handleRemoveEvidence = (index, evIndex) => {
                let newArtifacts = artifacts;
                let evItems = newArtifacts[index].evidenceItems
                evItems.splice(evIndex, 1);
                newArtifacts[index].evidenceItems = [...evItems];

		updateHash({
			'artifacts': newArtifacts
		});
        };


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
