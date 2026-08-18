const BLOG_API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/wywaaiblog.wordpress.com/posts?per_page=100&_embed=1";
const EXCERPT_CHARACTER_LIMIT = 180;
const FALLBACK_IMAGE = "/images/blog-before-we-build.webp";

interface WordPressPost {
  id: number;
  date: string;
  link: string;
  title?: {
    rendered?: string;
  };
  content?: {
    rendered?: string;
  };
  jetpack_featured_media_url?: string;
}

export interface BlogPost {
  id: number;
  date: string;
  title: string;
  body: string;
  image: string;
  postUrl: string;
}

function cleanHtmlContent(html = "") {
  const documentBody = new DOMParser().parseFromString(html, "text/html").body;
  return (documentBody.textContent || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function truncateText(text: string, characterLimit = EXCERPT_CHARACTER_LIMIT) {
  if (text.length <= characterLimit) return text;

  const truncated = text.slice(0, characterLimit).trimEnd();
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const cleanTruncated =
    lastSpaceIndex > characterLimit * 0.65
      ? truncated.slice(0, lastSpaceIndex)
      : truncated;

  return `${cleanTruncated.replace(/[.,;:!?-]+$/, "")}...`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function normalizePost(post: WordPressPost): BlogPost {
  const title = cleanHtmlContent(post.title?.rendered || "Untitled");

  return {
    id: post.id,
    date: formatDate(post.date),
    title,
    body: truncateText(cleanHtmlContent(post.content?.rendered)),
    image: post.jetpack_featured_media_url || FALLBACK_IMAGE,
    postUrl: post.link,
  };
}

export async function fetchBlogPosts(signal?: AbortSignal) {
  const response = await fetch(BLOG_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  const posts = (await response.json()) as WordPressPost[];
  return posts.map(normalizePost);
}
