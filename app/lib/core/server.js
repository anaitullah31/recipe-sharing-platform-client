const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const fetchData = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};


