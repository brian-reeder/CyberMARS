import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../components/Navbar';

export default function Default({children}) {

	return (
		<>
		  <Head>
		    <link rel="apple-touch-icon" sizes="180x180" href="/CyberMARS/image/apple-touch-icon.png" /> 
		    <link rel="icon" type="image/png" sizes="32x32" href="/CyberMARS/image/favicon-32x32.png" />
		    <link rel="icon" type="image/png" sizes="16x16" href="/CyberMARS/image/favicon-16x16.png" />
			<link rel="icon" type="icon" sizes="any" href="/CyberMARS/favicon.ico" />
		    <link rel="manifest" href="/CyberMARS/site.webmanifest" />
		    <title>CyberMARS</title>
		  </Head>
		  <Navbar />
		  <main>
		    { children }
		  </main>
		  <footer>
		    <p>CyberMARS</p>
		    <Link href="https://github.com/brian-reeder">
		      @brian-reeder
		    </Link>
		  </footer>
		</>
	);
};
