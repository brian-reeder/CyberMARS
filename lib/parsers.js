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

function sortObjectProperties(obj) {
	let newObj = {};
	for(const k of Object.keys(obj).sort()) {
		newObj[k] = obj[k];
	}

	return newObj;
};

function parseCEF(data) {
	let obj = {};

	if(typeof data !== 'string') {
		return {
			'Uh-oh': 'CEF Format Error',
		};
	}

	let header = parseCEFSplitHeader(data);
	if(header === undefined) {
		return {
			'Uh-oh': 'CEF Header Error',
		};
	}
	
	let fields = parseCEFSplitExtension(header.Extension);
	if(fields === undefined) {
		return {
			'Uh-oh': 'CEF Extension Error',
		};
	};

	header.Extension = fields;

	return sortObjectProperties(header);
	
};

function parseCEFSplitHeader(data) {
	let subs = data;
	
	let split = [];
	for(let i = 0; i < 7; i += 1) {
		if(!data.includes('|')) {
			return undefined;
		}

		let index = subs.indexOf('|');
		split.push(subs.substring(0,index));
		subs = subs.substring(index+1);
	}
	split.push(subs);

	let Prefix = {};
	if(split[0].includes(' ')) {
		let tok = split[0].split(' ');
		if(tok.length === 5) {
			Prefix['Prefix'] = {
				'DateTime': `${tok[0]} ${tok[1]} ${tok[3]}`,
				'Hostname': tok[3]
			};
			
			split[0] = tok[4];
		}
	}

	return {
		...Prefix,
		'CEFVersion': split[0],
		'DeviceVendor': split[1],
		'DeviceProduct': split[2],
		'DeviceVersion': split[3],
		'DeviceEventClassID': split[4],
		'Name': split[5],
		'Severity': split[6],
		'Extension': split[7]
	};
};

function parseCEFSplitExtension(data) {
	const rx = /(?:((?:\\\=|[^\=])+)\=((?:\\\=|[^\=])*) )/g;

	let fields = {};
	for(const match of data.matchAll(rx)) {
		fields[match[1]] = match[2];
	};

	return sortObjectProperties(fields);
};
