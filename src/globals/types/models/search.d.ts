type SearchResultType = 'COURSE' | 'LESSON' | 'SECTION';

interface GlobalSearchResult {
  description?: string | null;
  id: string;
  score: number;
  subtitle: string;
  title: string;
  type: SearchResultType;
  url: string;
}

type GlobalSearchResponse = Pagination<GlobalSearchResult>;
