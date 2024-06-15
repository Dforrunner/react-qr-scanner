declare function QrScanner(options: {
  onError?: (error: any) => void;
  onScan?: (value: any) => void;
  facingMode?: 'environment' | 'user';
  constraints?: MediaTrackConstraints | null;
  onLoad?: () => void;
  flipHorizontally?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showViewFinder?: boolean;
  delay?: number;
  resolution?: number;
  aspectRatio?: string;
  viewFinder?: React.CSSProperties;
}): JSX.Element;

export { QrScanner };
