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
    <>
      <HeadingSkeleton />
      <div className="w-full rounded-lg border bg-card">
        <Table className="w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Xolati</TableHead>
              <TableHead>Javob</TableHead>
              <TableHead>Vaqt</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Loading;
