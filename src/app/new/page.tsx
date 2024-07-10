'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        const { id } = await response.json();
        router.push(`/posts/${id}`);
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post');
    }
  };

  return (
    <>
      <h1>Create New Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>
    </>
  );
}