import Image from "next/image";
import { Icon } from "@gravity-ui/uikit";
import { ArrowDownToLine, Funnel, Magnifier } from "@gravity-ui/icons";
import { fetchSecureData } from "@/app/lib/core/server";
import BlockButton from "./BlockButton";
import { getUserSession, requireRole } from "@/app/lib/core/session";
import Pagination from "@/app/components/shared/Pagination";

const ManageUsersPage = async ({ searchParams }) => {
  await requireRole("admin");

  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const usersData = await fetchSecureData(
    `/users?page=${currentPage}&limit=${limit}`,
  );

  const currentUser = await getUserSession();

  const users = usersData?.data || [];
  const stats = usersData?.stats || {};
  const pagination = usersData?.pagination || {};

  return (
    <section className="min-h-screen bg-background px-6 py-10 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h1 className="font-serif text-5xl leading-tight md:text-5xl">
            Manage Users
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-surface-secondary-foreground">
            Monitor user activity, manage roles and permissions, and maintain a
            secure and engaging culinary community across the RecipeHub
            platform.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-surface-secondary-foreground">
                  Total Users
                </p>
                <h2 className="mt-2 font-serif text-4xl">
                  {stats.totalUsers || 0}
                </h2>
              </div>

              <div className="bg-surface-secondary p-3">👥</div>
            </div>
          </div>

          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-surface-secondary-foreground">
                  Active Users
                </p>
                <h2 className="mt-2 font-serif text-4xl">
                  {stats.activeUsers || 0}
                </h2>
              </div>

              <div className="bg-surface-secondary p-3">👨‍🍳</div>
            </div>
          </div>

          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-surface-secondary-foreground">
                  New This Week
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <h2 className="font-serif text-4xl">
                    +{stats.newThisWeek || 0}
                  </h2>
                  <span className="text-xs text-success">Trending up</span>
                </div>
              </div>

              <div className="bg-surface-secondary p-3">➕</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-border bg-surface">
          <div className="flex flex-col gap-4 border-b border-separator p-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Icon
                data={Magnifier}
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-secondary-foreground"
              />

              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="w-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex cursor-pointer items-center gap-2 border border-border px-4 py-3 text-sm hover:bg-surface-hover">
                <Icon data={Funnel} size={14} />
                Filter
              </button>

              <button className="flex cursor-pointer items-center gap-2 border border-border px-4 py-3 text-sm hover:bg-surface-hover">
                <Icon data={ArrowDownToLine} size={14} />
                Export
              </button>
            </div>
          </div>

          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] border-b border-separator bg-surface-secondary px-6 py-4 text-xs font-bold uppercase tracking-wider md:grid">
            <span>User</span>
            <span>Role</span>
            <span>Subscription Plan</span>
            <span>Status</span>
            <span>Joined Date</span>
            <span className="text-right">Actions</span>
          </div>

          {users.map((user) => (
            <div
              key={user._id}
              className="grid gap-4 border-b border-separator px-6 py-5 last:border-b-0 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={user.image || "/assets/profile.png"}
                    alt={user.name || "User image"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-xs text-surface-secondary-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="capitalize">
                <span className="bg-surface-secondary px-3 py-1 text-xs">
                  {user.role}
                </span>
              </div>

              <div className="capitalize">
                <span
                  className={`px-3 py-1 text-xs font-medium ${
                    user.plan === "premium"
                      ? "bg-warning/10 text-warning"
                      : "bg-surface-secondary text-surface-secondary-foreground"
                  }`}
                >
                  {user.plan || "free"}
                </span>
              </div>

              <div className="capitalize">
                <span
                  className={`inline-flex items-center gap-2 ${
                    user.status === "active" ? "text-success" : "text-danger"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.status === "active" ? "bg-success" : "bg-danger"
                    }`}
                  />
                  {user.status || "active"}
                </span>
              </div>

              <div className="text-sm text-surface-secondary-foreground">
                {new Date(user.createdAt).toLocaleString()}
              </div>

              <div className="flex justify-end gap-2">
                <BlockButton currentUser={currentUser} user={user} />
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="px-6 py-16 text-center">
              <h3 className="font-serif text-2xl">No users found</h3>
              <p className="mt-2 text-sm text-surface-secondary-foreground">
                There are no users available right now.
              </p>
            </div>
          )}

          {users.length > 0 && (
            <Pagination
              pagination={pagination}
              itemName="users"
              limitOptions={[5, 8, 10, 20]}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageUsersPage;
