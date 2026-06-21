import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getServerToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token;
};

export const authHeader = async () => {
  const token = await getServerToken();

  const header = {
    Authorization: `Bearer ${token}`,
  };
  return token ? header : {};
};

export const fetchData = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};

export const fetchSecureData = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });

  // handle 401, 403 status
  return res.json();
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
