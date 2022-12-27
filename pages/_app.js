import '../styles/styles.css';
import Layout from '../components/Layout';

import localFont from '@next/font/local';

const redHatDisplay = localFont({
        src: [
                {
                        path: '../public/fonts/Red_Hat_Display/RedHatDisplay-VariableFont_wght.ttf',
                        style: 'normal'
                },
                {
                        path: '../public/fonts/Red_Hat_Display/RedHatDisplay-Italic-VariableFont_wght.ttf',
                        style: 'italic'
                }

        ]
});

const redHatMono = localFont({
	src: [
		{
			path: '../public/fonts/Red_Hat_Mono/RedHatMono-VariableFont_wght.ttf',
			style: 'normal'
		},
		{
                        path: '../public/fonts/Red_Hat_Mono/RedHatMono-Italic-VariableFont_wght.ttf',
                        style: 'italic'
                }

	]
});

const redHatText = localFont({
        src: [
                {
                        path: '../public/fonts/Red_Hat_Text/RedHatText-VariableFont_wght.ttf',
                        style: 'normal'
                },
                {
                        path: '../public/fonts/Red_Hat_Text/RedHatText-Italic-VariableFont_wght.ttf',
                        style: 'italic'
                }

        ]
});


export default function MyApp({ Component, pageProps }) {
	return (
		<>
		  <style jsx global>{`
		    html {
		      --font-redHatMono: ${redHatMono.style.fontFamily}, 'Courier New', Courier, monospace;
		      --font-redHatText: ${redHatText.style.fontFamily}, Arial, Helvetica, sans-serif;
		      --font-redHatDisplay: ${redHatDisplay.style.fontFamily}, Arial, Helvetica, sans-serif;
		    }
		 ` }</style>
		  <Layout>
		    <Component {...pageProps} />
		  </Layout>
		</>
	);
};
