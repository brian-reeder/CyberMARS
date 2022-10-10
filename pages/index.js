import Head from 'next/head'

export default function Home() {
  return (
	<>
	  <Head>
	    <title>Home</title>
	  </Head>
	  <h1>CyberMARS</h1>
	  <p>This is a placeholder page. Features coming soon...</p>
	  <span className="acronym">
	    <strong className="dr-green">Cyber</strong><br />
	    <strong className="dr-red">M</strong>odular<br />
	    <strong className="dr-red">A</strong>rtifact<br />
	    <strong className="dr-red">R</strong>eport<br />
	    <strong className="dr-red">S</strong>tructure<br />
	  </span>
	</>
  );
};
