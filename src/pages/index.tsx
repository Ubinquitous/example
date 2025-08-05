import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import Router from 'next/router';
import React, { ChangeEvent, useState } from 'react';

const Index = () => {
  const [metadata, setMetadata] = useState({ url: '', title: '', description: '' });

  const handleMetadataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateURLClick = () => {
    const jsonString = JSON.stringify(metadata);
    const utf8Bytes = new TextEncoder().encode(jsonString);
    let binaryString = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binaryString += String.fromCharCode(utf8Bytes[i]);
    }
    const wrappedData = btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    Router.push(`/news/${wrappedData}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">뉴스 생성기</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">홈</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">도구</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">도움말</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            손쉽게 뉴스 페이지를 만들어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            제목, 설명, 이미지를 입력하면 완성도 높은 뉴스 페이지가 생성됩니다
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              뉴스 정보 입력
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  썸네일 이미지 URL
                </label>
                <Input
                  onChange={handleMetadataChange}
                  value={metadata.url}
                  name="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  뉴스 제목
                </label>
                <Input
                  onChange={handleMetadataChange}
                  value={metadata.title}
                  name="title"
                  placeholder="뉴스 제목을 입력하세요"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  뉴스 설명
                </label>
                <Input
                  onChange={handleMetadataChange}
                  value={metadata.description}
                  name="description"
                  placeholder="뉴스 내용을 간략히 설명하세요"
                  className="w-full"
                />
              </div>
              <div className="pt-4">
                <Button 
                  onClick={handleCreateURLClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  뉴스 페이지 생성하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            주요 기능
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">이미지 지원</h4>
              <p className="text-gray-600">다양한 이미지 URL을 지원하여 시각적으로 풍부한 뉴스를 만들 수 있습니다</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">빠른 생성</h4>
              <p className="text-gray-600">몇 초 만에 완성도 높은 뉴스 페이지를 생성할 수 있습니다</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">SEO 최적화</h4>
              <p className="text-gray-600">소셜 미디어와 검색 엔진에 최적화된 메타데이터를 자동으로 생성합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">뉴스 생성기</h3>
              <p className="text-gray-300">누구나 쉽게 사용할 수 있는 뉴스 페이지 생성 도구</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">링크</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">홈</a></li>
                <li><a href="#" className="hover:text-white">사용법</a></li>
                <li><a href="#" className="hover:text-white">문의</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">도움말</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">연락처</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 뉴스 생성기. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
