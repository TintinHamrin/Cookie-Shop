export class ApiClient {
  static fetch(url: string, options: RequestInit = {}) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    options.headers = { ...headers, ...options.headers };
    return fetch("/api/v1"+url, options);
  }
}
