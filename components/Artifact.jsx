import { useState, useCallback } from 'react';

import Eventlog from '../components/Artifact/Eventlog';

import styles from '../styles/Artifact.module.css';


export default function Artifact( props ) {
	const [evidenceItems, setEvidenceItems] = useState([]);

	function handleClick() {
		const val = event.target.value;

		setEvidenceItems([
			...evidenceItems,
			{
				'id': Date.now() + '' + Math.random(),
				'type': val,
				'value': '',
				'fields': {'test': 'val'}
			}
		]);
	};

	const handleChangeChild = useCallback( (index, txt) => {
		let events = evidenceItems;
		events[index] = {
			...events[index],
			'value': txt,
			'fields': {
				'test': txt
			}
		};

		setEvidenceItems([...events]);
	}, [evidenceItems] );

	const handleRemoveChild = useCallback( (index) => {
		let events = evidenceItems;
		events.splice(index, 1);
		setEvidenceItems([...events]);
	}, [evidenceItems] );

	return (
		<article className={ styles['artifact'] }>
		  <div className={ styles['controls'] }>
		    <h4>Artifact</h4>
		    <button
		      onClick={ handleClick }
		      value="eventlog"
		    >Add Event Log</button>
		    <button
		      onClick={ props.handleRemove }
		    >Remove</button>
		  </div>
		  <ul className={ styles['evidence-container'] }>
		  {evidenceItems.map((e, i) => {
			const nProps = {
				...e,
				'handleChange': () => handleChangeChild(i, event.target.value),
				'handleRemove': () => handleRemoveChild(i)
			}

			let element;
			switch(e['type']) {
				case 'eventlog':
					element = (<Eventlog
					  {...nProps}
					/>);
				break;
			}

			return (
				<li key={e['id']}>
				  { element }
				</li>
			);
		  })}
		  </ul>
		</article>
	);
}
