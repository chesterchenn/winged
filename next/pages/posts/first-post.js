import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../../components/layout';
import Alert from '../../components/alert';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
          <a>Back to Home</a>
        </Link>
      </h2>
      <Image src='/images/profile.jpg' height={144} width={144} alt='profile' />
      <img src='/images/profile.jpg' height='140px' width='140px' alt='profile' />
      <Alert type="success">Success</Alert>
      <Alert type="error">Error</Alert>
    </Layout>
  );
}
