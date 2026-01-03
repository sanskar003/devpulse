import type { DevArticle } from "../types/DevTo";

interface Props {
  article: DevArticle;
}

const DevArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-600">
        By {article.author} on {new Date(article.published_at).toDateString()}
      </p>
      <p className="text-sm text-gray-700">Tags: {article.tags.join(", ")}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Read on Dev.to
      </a>
    </div>
  );
};

export default DevArticleCard;
