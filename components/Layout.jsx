import Head from 'next/head';
import Link from 'next/link';

export default function Default({children}) {
	return (
		<>
		  <Head>
		    <title>CyberMARS</title>
		  </Head>
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
