import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { encode, decode } from '../lib/b64url.js';
import parseEventLog from '../lib/parsers.js';

import ArtifactContainer from '../components/ArtifactContainer';
import ReportContainer from '../components/ReportContainer';

export default function Home() {
	const [title, setTitle] = useState('CyberMARS');
	const [artifacts, setArtifacts] = useState([]);
	const [templates, setTemplates] = useState([]);
	const router  = useRouter();

	useEffect( ()=> {
		if(!router.isReady) return;

		const handleHashChange = () => {
			const hash = getHash();
			if(hash === undefined) {
				setArtifacts([]);
				setTemplates([]);

				return;
			}

			const newTitle = hash.title !== undefined ? hash.title : 'CyberMARS';
			const newArtifacts = hash.artifacts !== undefined ? hash.artifacts : [];
			const newTemplates = hash.templates !== undefined ? hash.templates : [];

			setTitle(newTitle);
			setArtifacts([...newArtifacts]);
			setTemplates([...newTemplates]);

			return;
		};

		window.addEventListener('hashchange', handleHashChange);
		window.addEventListener('load', handleHashChange);
		//router.events.on('hashChangeComplete', handleHashChange);
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
		const newTitle = newState.title !== undefined ? newState.title : title;

		const arts = newState.artifacts !== undefined ? newState.artifacts : artifacts;
		const cleanArtifacts = sanitizeArtifacts(arts);

		const newTemplates = newState.templates !== undefined ? newState.templates : templates

		let cleanState = {
			title: newTitle,
			artifacts: cleanArtifacts,
			templates: newTemplates
		};
		router.push({
			'pathname': '/',
			'hash': `template/${encode(cleanState)}`
		});

		setTitle(newTitle)
		setArtifacts(arts);
		setTemplates(newTemplates);
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

	function sanitizeArtifacts (arts) {
		if(arts === undefined) {
			return [];
		}

		return arts.map( (e) => {
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

	const handleChangeTitle = () => {
		const newTitle = event.target.value;

		updateHash({
			'title': newTitle
		});
	};

	const handleAddArtifact =  () => {
                const val = event.target.value;
		const id = genArtifactID();
		
		if(id === undefined) return;

		const newArtifacts = [...artifacts, {
			'id': id,
			label: 'Artifact',
                        'evidenceItems': []
                }];
		
		updateHash({
			'artifacts': newArtifacts
		});
        };

	const handleChangeArtifactLabel = (index) => {
		let newArtifacts = artifacts;
		newArtifacts[index].label = event.target.value;

		updateHash({
			artifacts: newArtifacts
		});
	};

	const handleClearAction = () => {
		let nArtifacts = artifacts;
		let nTemplates = templates;

		switch(event.target.value) {
			case 'clearArtifacts':
				nArtifacts = [];
				break;

			case 'clearTemplates':
				nTemplates = [];
				break;
		}
		updateHash({
			artifacts: nArtifacts,
			templates: nTemplates
		});
	};

	const handleRemoveArtifact = (index) => {
		let newArtifacts = artifacts;
		newArtifacts.splice(index, 1);
		
		updateHash({
			'artifacts': newArtifacts
		});
	};
	
	const genTemplateID = () => {
		const IDs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		const usedIDs = templates.map( (e) => e.id);
		
		for(var c of IDs) {
			if(!usedIDs.includes(c)) return c;
		}

		return undefined;
	};

	const handleAddTemplate =  () => {
                const val = event.target.value;
		const id = genTemplateID();
		
		if(id === undefined) return;

		const newTemplates = [...templates, {
			'id': id,
			'label': 'Template',
                        'formula': ['']
                }];
		updateHash({
			'templates': newTemplates
		});
        };
	
	const handleRemoveTemplate = (index) => {
		let newTemplates = templates;
		newTemplates.splice(index, 1);
		
		updateHash({
			'templates': newTemplates
		});
	};

	const handleChangeTemplateLabel = (index) => {
		let newTemplates = templates;
		newTemplates[index].label = event.target.value;

		updateHash({
			templates: newTemplates
		});
	};

	const genEvidenceID = (index) => {
		const artifact = artifacts[index];

		if(artifact.evidenceItems.length >= 99) return undefined;

		const IDs = artifact.evidenceItems.map( e => parseInt(e.id) );
		let sortableArry = new Int8Array(IDs);
		sortableArry.sort();
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

	const handleChangeTemplate = (rIndex) => {
		let newTemplates = [...templates];
		newTemplates[rIndex].formula[0] = event.target.value;

		updateHash({
			templates: newTemplates
		});
	};


  return (
	<>
	  <Head>
	    <title>{ title }</title>
	  </Head>

	  <ArtifactContainer 
	    artifacts={ artifacts }

	    handleAddArtifact={ handleAddArtifact }
	    handleChangeArtifactLabel={ handleChangeArtifactLabel }
	    handleClearArtifacts={ handleClearAction }
	    handleRemoveArtifact={ handleRemoveArtifact }
	    handleAddEvidence={ handleAddEvidence }
	    handleUpdateEvidence={ handleUpdateEvidence }
	    handleRemoveEvidence={ handleRemoveEvidence }
	    handleParserChange={ handleParserChange}
	  />
	  <ReportContainer
	    title={ title }
	    templates={ templates }
	    artifacts={ artifacts }
	    
	    handleChangeTitle={ handleChangeTitle }

	    handleChangeTemplateLabel={ handleChangeTemplateLabel }
	    handleAddTemplate={ handleAddTemplate }
	    handleChangeTemplate={ handleChangeTemplate }
	    handleClearTemplates={ handleClearAction }
	    handleRemoveTemplate={ handleRemoveTemplate }
	  />
	</>
  );
};
