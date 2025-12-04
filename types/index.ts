export interface ScrapeResult {
  status: 'success' | 'error';
  url: string;
  title: string;
  description: string;
  content: string;
  metadata: {
    wordCount: number;
    imageCount: number;
    linkCount: number;
    scrapeDuration: number;
  };
  extractedData: {
    headings: string[];
    links: { text: string; href: string }[];
    images: { src: string; alt: string }[];
  };
  aiAnalysis?: string;
  error?: string;
}
