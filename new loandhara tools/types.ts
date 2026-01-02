
export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  category: 'pdf' | 'image' | 'convert';
}

export interface ProcessingResult {
  originalSize: number;
  newSize: number;
  downloadUrl: string;
  fileName: string;
}

export enum CompressionQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}
