import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Metadata {
  url: string;
  title: string;
  description: string;
}

interface WrappedDataPageProps {
  metadata: Metadata;
}

const WrappedDataPage = ({ metadata }: WrappedDataPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta
          name="description"
          content={metadata.description}
        />
        <meta
          property="og:title"
          content={metadata.title}
        />
        <meta
          property="og:description"
          content={metadata.description}
        />
        <meta
          property="og:image"
          content={metadata.url}
        />
        <meta
          property="og:type"
          content="article"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content={metadata.title}
        />
        <meta
          name="twitter:description"
          content={metadata.description}
        />
        <meta
          name="twitter:image"
          content={metadata.url}
        />
      </Head>
      <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{metadata.title}</h1>
        <p className="text-gray-600">{metadata.description}</p>
        {metadata.url && (
          <Image
            src={metadata.url}
            alt={metadata.title}
            width={400}
            height={256}
            className="max-w-md max-h-64 object-cover rounded-lg"
          />
        )}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const wrappedData = params?.wrappedData as string;
    const base64 = wrappedData
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(wrappedData.length + ((4 - (wrappedData.length % 4)) % 4), '=');
    const decodedData = decodeURIComponent(atob(base64));
    const metadata: Metadata = JSON.parse(decodedData);
    console.log({ decodedData });

    return {
      props: {
        metadata,
      },
      revalidate: false,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default WrappedDataPage;
