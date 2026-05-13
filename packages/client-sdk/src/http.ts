// Browser-or-Node Fetch wrapper for the speech-score-engine API.
//
// Lives in @sse/client-sdk because the blueprint specifies a single client
// surface for the web app, share viewers, and any future client (mobile, CLI).
// Scattering raw fetch calls in apps/web is the anti-pattern this package
// prevents (per docs/product/repository-blueprint-handoff-package.md §5.3).

export interface SseClientOptions {
  /** Base URL of the API, e.g. http://localhost:4000 — no trailing slash. */
  baseUrl: string;
  /** Optional bearer token. Injected as `Authorization: Bearer <token>`. */
  authToken?: string | (() => string | Promise<string>);
  /** Optional fetch override (for tests, SSR, custom transports). */
  fetchImpl?: typeof fetch;
  /** Default headers applied to every request. */
  defaultHeaders?: Record<string, string>;
}

export interface SseClient {
  get<TResponse>(path: string, init?: RequestInit): Promise<TResponse>;
  post<TResponse>(path: string, body?: unknown, init?: RequestInit): Promise<TResponse>;
  patch<TResponse>(path: string, body?: unknown, init?: RequestInit): Promise<TResponse>;
  delete<TResponse>(path: string, init?: RequestInit): Promise<TResponse>;
}

export class ApiError extends Error {
  override readonly name = 'ApiError';
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
  }
}

interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

const isErrorEnvelope = (v: unknown): v is ApiErrorEnvelope =>
  typeof v === 'object' &&
  v !== null &&
  'error' in v &&
  typeof (v as { error: unknown }).error === 'object' &&
  (v as { error: { code?: unknown; message?: unknown } }).error !== null &&
  typeof (v as { error: { code?: unknown } }).error.code === 'string' &&
  typeof (v as { error: { message?: unknown } }).error.message === 'string';

export function createClient(options: SseClientOptions): SseClient {
  const fetchImpl = options.fetchImpl ?? fetch;
  const baseUrl = options.baseUrl.replace(/\/$/, '');

  const resolveToken = async (): Promise<string | undefined> => {
    if (typeof options.authToken === 'function') return options.authToken(); // allow-secret
    return options.authToken; // allow-secret
  };

  const request = async <T>(
    method: string,
    path: string,
    body: unknown,
    init?: RequestInit,
  ): Promise<T> => {
    const url = path.startsWith('http')
      ? path
      : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const token = await resolveToken(); // allow-secret

    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.defaultHeaders ?? {}),
      ...((init?.headers as Record<string, string> | undefined) ?? {}),
    };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;

    // exactOptionalPropertyTypes forces us to omit `body` when there isn't one;
    // assemble the RequestInit conditionally.
    const requestInit: RequestInit = { ...init, method, headers };
    if (body !== undefined) requestInit.body = JSON.stringify(body);
    const res = await fetchImpl(url, requestInit);

    const text = await res.text();
    const json = text.length === 0 ? null : (JSON.parse(text) as unknown);

    if (!res.ok) {
      if (isErrorEnvelope(json)) {
        throw new ApiError(res.status, json.error.code, json.error.message, json.error.details);
      }
      throw new ApiError(res.status, 'http_error', `HTTP ${res.status} ${res.statusText}`, text);
    }

    return json as T;
  };

  return {
    get: (path, init) => request('GET', path, undefined, init),
    post: (path, body, init) => request('POST', path, body, init),
    patch: (path, body, init) => request('PATCH', path, body, init),
    delete: (path, init) => request('DELETE', path, undefined, init),
  };
}
