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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">뉴스센터</h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900">홈</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">뉴스</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">연락처</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            {metadata.url && (
              <div className="aspect-video relative">
                <Image
                  src={metadata.url}
                  alt={metadata.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Article Content */}
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <time dateTime={new Date().toISOString()}>
                  {new Date().toLocaleDateString('ko-KR')}
                </time>
                <span className="mx-2">•</span>
                <span>뉴스센터</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {metadata.title || '제목 없음'}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {metadata.description || '내용이 없습니다.'}
                </p>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">관련 뉴스</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">최신 뉴스 1</h4>
                      <p className="text-sm text-gray-600">관련된 최신 뉴스 내용입니다.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">최신 뉴스 2</h4>
                      <p className="text-sm text-gray-600">또 다른 관련 뉴스 내용입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">뉴스센터</h3>
                <p className="text-gray-300">신뢰할 수 있는 뉴스와 정보를 제공합니다.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">링크</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">홈</a></li>
                  <li><a href="#" className="hover:text-white">뉴스</a></li>
                  <li><a href="#" className="hover:text-white">연락처</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">연락처</h3>
                <p className="text-gray-300">
                  이메일: info@newscenter.com<br />
                  전화: 02-1234-5678
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 뉴스센터. All rights reserved.</p>
            </div>
          </div>
        </footer>
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
    
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedData = new TextDecoder().decode(bytes);
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
