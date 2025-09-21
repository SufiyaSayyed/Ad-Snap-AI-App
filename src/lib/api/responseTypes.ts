export interface ImageGenResponse {
  data: {
    result: ImageGenResult[];
  };
  status: number;
  statusText: string;
}

export interface ImageGenResult {
  urls: string[];
  seed: number;
  uuid: string;
}
