import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { encode, decode } from '../lib/b64url.js';

export default function Home() {
	const [fields, setFields] = useState('NULL');

	const router  = useRouter();

	useEffect( ()=> {
                if(!router.isReady) return;

                const handleHashChange = () => {
                        const hash = getHash();
			console.log(hash);

			var contents = 'New Value';

                        if(hash === undefined) {
				contents = 'Undefined';
                        }
			else {
				setFields(JSON.stringify(hash, '\n', 2));
				return;
			}

                        if(hash.version >= 1.0) {
                                const newTitle = hash.title !== undefined ? hash.title : 'CyberMARS';
                                const newArtifacts = hash.artifacts !== undefined ? hash.artifacts : [];
                                const newTemplates = hash.templates !== undefined ? hash.templates : [];

                                setTitle(newTitle);
                                setArtifacts([...newArtifacts]);
                                setTemplates([...newTemplates]);
                        }

			setFields(contents);
                        return;
                };

                window.addEventListener('hashchange', handleHashChange);
                window.addEventListener('load', handleHashChange);
                //router.events.on('hashChangeComplete', handleHashChange);
		handleHashChange();
        }, [router.isReady]);

        function getHash() {
		console.log('Test')
                const path = window.location.hash.split('/');
                const appState = path.length > 1 ? decode(path[1]) : {
                        'artifacts': []
                };
                return appState;
        }

  return (
	<>
	  <div className="flex col">
	  <h1>Hello, World!</h1>
	  <textarea
	    value={fields}
	    readOnly
	  ></textarea>
	  </div>
	</>
  );
};
