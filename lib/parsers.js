export default function parseEventlog(typeID, data) {
	let obj = {}
	switch(typeID) {
		case '0':
		break;

		case '1':
			try {
				obj = JSON.parse(data);
			}
			catch(e) {
				obj = {
					'Uh-oh': 'JSON Format Error',
				};
			}
		break;

		case '2':
			obj = parseCEF(data);
		break;

		case '10':
			obj = {
				'type': 'WinEvent'
			};
		break;
	};

	return obj;
};

function parseCEF(data) {
	let obj = {};

	if(typeof data !== 'string' || !data.includes('|')) {
		return {
			'Uh-oh': 'CEF Format Error',
		};
	}

	const header = data.split('|');
	if(header.length !== 8) {
		return {
			'Uh-oh': 'CEF Header Error',
			...header
		};
	}
	
	let headerFields = {};
	if(header[0].includes(' ')) {
		const prefix = header[0].split(' ');
		if(prefix.length !== 5) {
			return {
				'Uh-oh': 'CEF Prefix Error',
				...prefix
			};
		}

		headerFields['prefixDateTime'] = `${prefix[0]} ${prefix[1]} ${prefix[2]}`;
		headerFields['prefixHostname'] = prefix[3];
		headerFields['CEFVersion'] = prefix[4];
	}
	else {
		headerFields['CEFVersion'] = header[0];
	}
	
	headerFields['DeviceVendor'] = header[1];
	headerFields['DeviceProduct'] = header[2];
	headerFields['DeviceVersion'] = header[3];
	headerFields['DeviceEventClassID'] = header[4];
	headerFields['Name'] = header[5];
	headerFields['Severity'] = header[6];
	obj['CEFHeader'] = headerFields;

	if(!header[7].includes('=')){
		obj['Extension'] = header[7];
	}
	else {
		const tok = header[7].split(' ');
		for(var t of tok) {
			const pair = t.split('=');
			obj[pair[0]] = pair[1];
		}
	}

	return obj;
};
