import { getUserSession } from "../lib/core/session";

const AuthLayout = async({ children }) => {
      const user = getUserSession();
      
  return (
    <main className="min-h-screen bg-emerald-50">
      {children}
    </main>
  );
};

export default AuthLayout;