const API_URL = "http://localhost:3000";

const handleRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  return handleRequest(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
};

export const signIn = async (email: string, password: string) => {
  return handleRequest(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const getUserData = async (token: string) => {
  return handleRequest(`${API_URL}/auth/userData`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};
