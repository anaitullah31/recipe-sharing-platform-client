import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientToken = async () => {
  const session = await authClient.getSession();

  return session?.data?.session?.token || null;
};

export const authHeader = async () => {
  const token = await getClientToken();
  console.log(token, "TOKEN");

  const header = {
    Authorization: `Bearer ${token}`,
  };
  return token ? header : {};
};

export const clientMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
