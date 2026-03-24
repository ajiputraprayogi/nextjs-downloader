export interface Author {
  id?: string;
  name?: string;
  unique_id?: string;
  avatar?: string;
  signature?: string;
}

export interface DownloadOptions {
  nowm?: string;
  wm?: string;
  hd?: string;
  sd?: string;
  audio?: string;
  [key: string]: string | undefined;
}

export interface MediaResponse {
  id?: string;
  title?: string;
  author?: string | Author;
  cover?: string;
  duration?: number | string;
  view_count?: number;
  options?: DownloadOptions;
  images?: string[];
  [key: string]: any; // Allows extensibility
}
