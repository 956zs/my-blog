import { getPostData } from '../../app/utils/posts';

export default function Post({ params }: { params: { id: string } }) {
    const postData = getPostData(params.id);
  
    if (!postData) {
      return <div>Post not found</div>;
    }
  
    return (
      <article>
        <h1>{postData.title}</h1>
        <div>{new Date(postData.date).toLocaleDateString()}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    );
  }