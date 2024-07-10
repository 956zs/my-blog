import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';

const postsDirectory = path.join(process.cwd(), 'src/posts');

interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return []; // 如果目錄是新創建的，返回空數組
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // 只處理 .md 文件
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileStats = fs.statSync(fullPath);
      
      // 確保它是一個文件，而不是目錄
      if (!fileStats.isFile()) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const id = fileName.replace(/\.md$/, '');
      let date = matterResult.data.date;
      if (date instanceof Date) {
        date = date.toISOString();
      } else if (typeof date === 'string') {
        const parsedDate = new Date(date);
        date = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date().toISOString();
      } else {
        date = new Date().toISOString();
      }

      return {
        id,
        title: matterResult.data.title as string,
        date,
        content: matterResult.content,
      };
    })
    .filter((post): post is PostData => post !== null); // 過濾掉任何 null 值

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export function createPost(title: string, content: string): string {
    const id = uuidv4();
    const date = new Date().toISOString();
    const fileName = `${id}.md`;
    const filePath = path.join(postsDirectory, fileName);
  
    const fileContent = `---
  title: ${title}
  date: ${date}
  ---
  
  ${content}`;
  
    fs.writeFileSync(filePath, fileContent);
    return id;
  }
export function getPostData(id: string): PostData | null {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
  
    return {
      id,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      content: matterResult.content,
    };
  }