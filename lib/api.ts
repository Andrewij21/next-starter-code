import Cookies from "js-cookie";
export const apiClient = {
  _getHeaders: function () {
    const headers: HeadersInit = {
      "content-type": "application/json",
    };
    const token = Cookies.get("session_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  },

  //  Centralized error handler
  _handleResponse: async function (res: Response) {
    if (res.status === 401) {
      // If the token is invalid or expired, remove it from cookies
      Cookies.remove("session_token");
      // Optionally, you can trigger a redirect to the login page
      // window.location.href = "/login";
      const errorBody = await res.json();
      throw new Error(
        errorBody.message || "Unauthorized: Your session has expired."
      );
    }

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || "API Error");
    }

    return res.json();
  },

  // Method to make a GET request
  get: async function <T>(endpoint: string): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: this._getHeaders(),
    });
    return this._handleResponse(res);
  },

  // Method to make a POST request with a body
  post: async function <T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    });
    return this._handleResponse(res);
  },
  patch: async function <T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    });
    return this._handleResponse(res);
  },
  delete: async function <T>(endpoint: string): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
    return this._handleResponse(res);
  },
};
