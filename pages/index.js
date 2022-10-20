import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { encode, decode } from '../lib/b64url.js';
import parseEventLog from '../lib/parsers.js';

import ArtifactContainer from '../components/ArtifactContainer';
import ReportContainer from '../components/ReportContainer';

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

	function updateHash(newState) {
		let cleanState = {
			'artifacts': newState.artifacts.map( (e) => {
				return {
					...e,
					evidenceItems: e.evidenceItems.map( (evItem) => {
						let n = {...evItem};
						delete n.fields;
						delete n.value;

						return n;
					} )
				};
			} )
		};

		router.push({
			'pathname': '/',
			'hash': `template/${encode(cleanState)}`
		});
	};

	function updateFields(index, evIndex) {
                let newArtifacts = artifacts;
                let evidence = newArtifacts[index].evidenceItems[evIndex];
                switch(evidence.type) {
                        case 'eventlog':
				evidence.value = event.target.value;
                                evidence.fields = parseEventLog(evidence.parser, evidence.value); 
                        break;
                };

                newArtifacts[index].evidenceItems.splice(evIndex, 1, evidence);
		
		updateHash({
			'artifacts': newArtifacts
		});
        };

	const genArtifactID = () => {
		const IDs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		const usedIDs = artifacts.map( (e) => e.id);
		
		for(var c of IDs) {
			if(!usedIDs.includes(c)) return c;
		}

		return undefined;
	};

	const handleAddArtifact =  () => {
                const val = event.target.value;
		const id = genArtifactID();
		
		if(id === undefined) return;

		const newArtifacts = [...artifacts, {
			'id': id,
                        'evidenceItems': []
                }];
		
		updateHash({
			'artifacts': newArtifacts
		});
        };

	const handleClearArtifacts = () => {
		updateHash({
			'artifacts': []
		});
	};

	const handleRemoveArtifact = (index) => {
		let newArtifacts = artifacts;
		newArtifacts.splice(index, 1);
		
		updateHash({
			'artifacts': newArtifacts
		});
	};

	const genEvidenceID = (index) => {
		const artifact = artifacts[index];

		if(artifact.evidenceItems.length >= 99) return undefined;

		const IDs = artifact.evidenceItems.map( e => parseInt(e.id) );
		let sortableArry = new Int8Array(IDs);
		sortableArry.sort();
		console.log(sortableArry)
		let count = 1;
		for(var ID of sortableArry) {
			if(count !== ID) {
				break;
			}

			count += 1;
		}

		return `${count}`.padStart(2, '0');
	};

	const handleAddEvidence = (index) => {
                let newArtifacts = artifacts;
                let evItems = newArtifacts[index].evidenceItems;
		const id = genEvidenceID(index);
		if(id === undefined) return;

                newArtifacts[index].evidenceItems = [
                        ...evItems,
                        {
                                'id': id, 
                                'type': event.target.value,
				'parser': 0,
				'value': '',
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
				evidence.value = event.target.value;
                                evidence.fields = parseEventLog(evidence.parser, evidence.value); 
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

	const handleParserChange = (index, evIndex) => {
		let newArtifacts = artifacts;
		let evidence = newArtifacts[index].evidenceItems[evIndex];
		
		evidence.parser = event.target.value;
		const eventLogValue = event.target.parentNode.children[2].value;
		evidence.fields = parseEventLog(evidence.parser, eventLogValue); 

		newArtifacts[index].evidenceItems[evIndex] = evidence;

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
	    handleClearArtifacts={ handleClearArtifacts }
	    handleRemoveArtifact={ handleRemoveArtifact }
	    handleAddEvidence={ handleAddEvidence }
	    handleUpdateEvidence={ handleUpdateEvidence }
	    handleRemoveEvidence={ handleRemoveEvidence }
	    handleParserChange={ handleParserChange}
	  />
	  <ReportContainer />
	</>
  );
};
