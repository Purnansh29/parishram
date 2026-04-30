import React from 'react';

// Reusable skeleton building blocks
const Pulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`}></div>
);

// Dashboard Skeleton Loader
export const DashboardSkeleton = () => (
  <div className="p-6 lg:p-8 space-y-8">
    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Pulse className="h-4 w-24" />
            <Pulse className="h-10 w-10 rounded-xl" />
          </div>
          <Pulse className="h-8 w-20" />
          <Pulse className="h-3 w-32" />
        </div>
      ))}
    </div>

    {/* Chart + Table Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <Pulse className="h-5 w-40" />
        <Pulse className="h-64 w-full" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <Pulse className="h-5 w-36" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Pulse className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Pulse className="h-3 w-28" />
              <Pulse className="h-2 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Course Card Skeleton Loader
export const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <Pulse className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Pulse className="h-5 w-16 rounded-full" />
        <Pulse className="h-5 w-20 rounded-full" />
      </div>
      <Pulse className="h-6 w-3/4" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-2/3" />
      <div className="flex items-center justify-between pt-2">
        <Pulse className="h-8 w-20" />
        <Pulse className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

// Table Skeleton Loader
export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    {/* Header */}
    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
      <Pulse className="h-4 w-20" />
      <Pulse className="h-4 w-32" />
      <Pulse className="h-4 w-24" />
      <Pulse className="h-4 w-28 ml-auto" />
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="px-6 py-4 border-b border-gray-50 flex items-center gap-4">
        <Pulse className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Pulse className="h-3 w-36" />
          <Pulse className="h-2 w-24" />
        </div>
        <Pulse className="h-3 w-20" />
        <Pulse className="h-6 w-16 rounded-full" />
      </div>
    ))}
  </div>
);

// Generic Page Skeleton
export const PageSkeleton = () => (
  <div className="p-6 lg:p-8 space-y-6">
    <div className="flex items-center justify-between">
      <Pulse className="h-8 w-48" />
      <Pulse className="h-10 w-32 rounded-xl" />
    </div>
    <TableSkeleton rows={6} />
  </div>
);

export default {
  DashboardSkeleton,
  CourseCardSkeleton,
  TableSkeleton,
  PageSkeleton,
};
