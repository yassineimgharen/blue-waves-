let csrf = '';
export function setCsrf(value: string) { csrf = value; }
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/admin${path}`, { ...options, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(csrf ? { 'X-CSRF-Token': csrf } : {}), ...options.headers } });
  const body = await response.json();
  if (!response.ok) throw new ApiError(body.error || 'The request failed.', response.status);
  return body;
}
export async function uploadImage(file: File): Promise<{ id: string; src: string; name: string }> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Choose a JPEG, PNG or WebP image up to 5 MB.');
  const bitmap = await createImageBitmap(file);
  if (bitmap.width > 12000 || bitmap.height > 12000) { bitmap.close(); throw new Error('Please resize this image to at most 12,000 pixels per side.'); }
  bitmap.close();
  const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]); reader.onerror = reject; reader.readAsDataURL(file); });
  return api('/uploads', { method: 'POST', body: JSON.stringify({ name: file.name, data }) });
}
