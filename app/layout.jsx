import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
   title: {
      template: '%s | promptsphere.io',
      default:
         'Prompt Sphere: Unleash Your Creativity with Open-Source AI Prompts',
   },
   metadataBase: new URL('https://promptsphere-io.vercel.app'),
   description:
      'Prompt Sphere is an open-source AI prompting tool for modern world to discover, create and share creative prompts',
   generator: 'Next.js',
   applicationName: 'promptsphere.io',
   referrer: 'origin-when-cross-origin',
   keywords: [
      'Generative AI',
      'Prompt Share',
      'Prompt generate',
      'Open AI',
      'Prompt for Software Engineer',
      'Prompt for backend Engineer',
      'Prompt for Frontend Engineer',
      'Prompt for Writer',
      'Prompt for content creator',
      'Prompt for SEO article',
   ],
   authors: [{ name: 'Ahtasham', url: 'http://ahtashamabbas.com' }],
   colorScheme: 'light',
   creator: 'Ahtasham Abbas',
   publisher: 'Ahtasham Abbas',
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   openGraph: {
      images: '/images/og-img.png',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Prompt Sphere',
      description:
         'Prompt Sphere is an open-source AI prompting tool for modern world to discover, create and share creative prompts',
      creator: '@ahtashamabbasse',
      images: ['/images/og-img.png'],
   },
   robots: {
      index: true,
      follow: true,
      nocache: true,
   },
};

const RootLayout = ({ children }) => {
   return (
      <html lang='en'>
         <body>
            <Provider>
               <div className='main'>
                  <div className='gradient'></div>
               </div>
               <main className={'app'}>
                  <Nav />
                  {children}
               </main>
            </Provider>
         </body>
      </html>
   );
};

export default RootLayout;
