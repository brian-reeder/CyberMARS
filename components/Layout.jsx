import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../components/Navbar';

export default function Default({children}) {
	return (
		<>
		  <Head>
		    <title>CyberMARS</title>
		  </Head>
		  <Navbar />
		  <main>
		    { children }
		  </main>
		  <footer>
		    <p>CyberMARS</p>
		    <Link href="https://github.com/brian-reeder">
		      <a>@brian-reeder</a>
		    </Link>
		  </footer>
		</>
	);
};
