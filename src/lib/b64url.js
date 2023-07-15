export function encode(jsonInput) {
	const str = JSON.stringify(jsonInput);
	const strB64 = btoa(str);
	const strB64Uri = encodeURIComponent(strB64);

	return strB64Uri;
};

export function decode(strB64Uri) {
	const strB64 = decodeURIComponent(strB64Uri);
	const str = atob(strB64);
	const jsonOutput = JSON.parse(str);

	return jsonOutput;
}
