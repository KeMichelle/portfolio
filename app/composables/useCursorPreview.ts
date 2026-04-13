export interface CursorPreviewPayload {
  mode?: 'video' | 'link';
  src?: string;
  title?: string;
  subtitle?: string;
  scale?: number;
  bubbleSize?: number;
}

export function useCursorPreview() {
  const preview = useState<CursorPreviewPayload | null>(
    'cursor-preview',
    () => null,
  );

  function showPreview(payload: CursorPreviewPayload) {
    preview.value = payload;
  }

  function clearPreview() {
    preview.value = null;
  }

  return {
    preview,
    showPreview,
    clearPreview,
  };
}
