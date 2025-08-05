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
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <Input
        onChange={handleMetadataChange}
        value={metadata.url}
        name="url"
        label="썸넬 URL"
      />
      <Input
        onChange={handleMetadataChange}
        value={metadata.title}
        name="title"
        label="제목"
      />
      <Input
        onChange={handleMetadataChange}
        value={metadata.description}
        name="description"
        label="설명"
      />
      <Button onClick={handleCreateURLClick}>제조</Button>
    </div>
  );
};

export default Index;
