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
			obj = {
				'type': 'CEF'
			};
		break;

		case '10':
			obj = {
				'type': 'WinEvent'
			};
		break;
	};

	return obj;
};
