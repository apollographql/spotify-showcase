import { remark } from 'remark';
import remarkParse from 'remark-parse';
import strip from 'strip-markdown';

export function toPlainText(markdown: string) {
  const contents = remark().use(remarkParse).use(strip).processSync(markdown);

  return String(contents);
}
