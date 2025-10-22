import HeadingSkeleton from "@/components/core/heading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Loading = () => {
  return (
    <div className="space-y-3 w-full">
      <HeadingSkeleton />
      <div className="w-full rounded-lg border bg-card">
        <Table className="w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Yaratilgan sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {/* Name column with avatar skeleton */}
                <TableCell className="font-medium">
                  <div className="flex gap-2 items-center justify-start">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </TableCell>

                {/* Email column */}
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>

                {/* Status column */}
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                {/* Created date column */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Loading;
