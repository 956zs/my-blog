import { NextResponse } from 'next/server';
import { createPost } from '../../utils/posts';

export async function POST(request: Request) {
  const { title, content } = await request.json();
  
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  try {
    const id = createPost(title, content);
    return NextResponse.json({ id, message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}