"use client";

import { Chip, Pagination, Table } from "@heroui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState } from "react";

const statusColorMap = {
  active: "success",
  inactive: "danger",
  pending: "warning",
  blocked: "danger",
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => {
      const image = info.getValue();

      return (
        <Image
          width={60}
          height={60}
          src={image || "/default-avatar.png"}
          alt="User"
          className="h-10 w-10 rounded-full object-cover"
        />
      );
    },
  }),

  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue() || "N/A",
  }),

  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue() || "user",
  }),

  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue() || "N/A",
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue() || "active";

      return (
        <Chip
          color={statusColorMap[status] || "default"}
          size="sm"
          variant="soft"
        >
          {status}
        </Chip>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Joined",
    cell: (info) => {
      const date = info.getValue();

      return date ? new Date(date).toLocaleDateString("en-GB") : "N/A";
    },
  }),

  columnHelper.display({
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const status = row.original.status || "active";

      return (
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status === "active"
              ? "bg-red-50 text-red-500"
              : "bg-green-50 text-green-600"
          }`}
        >
          {status === "active" ? "Block" : "Activate"}
        </button>
      );
    },
  }),
];

function toSortDescriptor(sorting) {
  const first = sorting[0];

  if (!first) return undefined;

  return {
    column: first.id,
    direction: first.desc ? "descending" : "ascending",
  };
}

function toSortingState(descriptor) {
  if (!descriptor) return [];

  return [
    {
      id: descriptor.column,
      desc: descriptor.direction === "descending",
    },
  ];
}

const PAGE_SIZE = 5;

export function UserTable({ users = [] }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const start = users.length === 0 ? 0 : pageIndex * PAGE_SIZE + 1;
  const end = Math.min((pageIndex + 1) * PAGE_SIZE, users.length);

  return (
    <div className="">
      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium text-accent">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Manage Users
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-surface-tertiary-foreground">
            Manage registered users, review their roles, account status, and
            take necessary actions.
          </p>
        </div>

        <Table>{/* your existing table code stays here */}</Table>
      </section>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Users table"
            className="min-w-150"
            sortDescriptor={sortDescriptor}
            onSortChange={(descriptor) =>
              setSorting(toSortingState(descriptor))
            }
          >
            <Table.Header>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <Table.Column
                  key={header.id}
                  id={header.id}
                  allowsSorting={header.column.getCanSort()}
                  isRowHeader={header.id === "name"}
                >
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>
              ))}
            </Table.Header>

            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} id={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {users.length} results
            </Pagination.Summary>

            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={!table.getCanPreviousPage()}
                  onPress={() => table.previousPage()}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>

              {pages.map((page) => (
                <Pagination.Item key={page}>
                  <Pagination.Link
                    isActive={page === pageIndex + 1}
                    onPress={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={!table.getCanNextPage()}
                  onPress={() => table.nextPage()}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  );
}
