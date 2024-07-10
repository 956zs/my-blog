import Link from 'next/link';
import { getSortedPostsData } from './utils/posts';
import { ClientCard } from './ClientComponents';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <h1>Welcome to My Blog</h1>
      {allPostsData.map(({ id, date, title }) => {
        const formattedDate = new Date(date).toLocaleDateString();
        return (
          <ClientCard
            key={id}
            title={title}
            subtitle={formattedDate}
            link={{ href: `/posts/${id}`, text: 'Read more' }}
          />
        );
      })}
    </>
  );
}