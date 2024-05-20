import React from 'react';
import Icon from "@mdi/react";
import { mdiChevronRight , mdiChevronLeft , mdiChevronDoubleRight, mdiChevronDoubleLeft } from "@mdi/js";
import { cn } from '@/utils/ui';

interface PaginationProps {
  pageIndex: number;
  totalPage: number;
  onPageChange: (newPageIndex: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageIndex, totalPage, onPageChange }) => {
  return (
    <div className="flex justify-center px-4 py-2 rounded-xl mt-auto">
      <ul className="flex items-center">
        <li className="px-[6px]">
          <button
          aria-label="Vá para a primeira página"
          className={cn(
            pageIndex !== 0 
              ? "text-gray-500 hover:border-transparent hover:bg-blue-500 hover:text-white" 
              : "text-gray-400 border-gray-200 cursor-not-allowed",
                "w-9 h-9 rounded-lg bg-white border border-gray-400 text-base"
          )}
          disabled={pageIndex === 0}
          onClick={() => onPageChange(0)}
          >
            <Icon path={mdiChevronDoubleLeft} size={0.8} className="inline" />
          </button>
        </li>
        <li className="px-[6px]">
          <button
          aria-label="Vá para a página anterior"
          className={cn(
            pageIndex !== 0 
              ? "text-gray-500 hover:border-transparent hover:bg-blue-500 hover:text-white" 
              : "text-gray-400 border-gray-200 cursor-not-allowed",
                "w-9 h-9 rounded-lg bg-white border border-gray-400 text-base"
          )}
          disabled={pageIndex === 0}
          onClick={() => onPageChange(pageIndex - 1)}
          >
            <Icon path={mdiChevronLeft} size={0.8} className="inline" />
          </button>
        </li>
        <li className="px-[6px]">
          <button className="w-9 h-9 rounded-lg text-base text-white bg-blue-500 hover:cursor-default">
            {pageIndex + 1}
          </button>
        </li>
        <li className="px-[6px]">
          <button 
          aria-label="Vá para a próxima página"
          className={cn(
            totalPage !== pageIndex + 1
              ? "text-gray-500 hover:border-transparent hover:bg-blue-500 hover:text-white" 
              : "text-gray-400 border-gray-200 cursor-not-allowed",
                "w-9 h-9 rounded-lg border bg-white border-gray-400 text-base"
          )}
          disabled={totalPage === pageIndex + 1}
          onClick={() => onPageChange(pageIndex + 1)}
          >
            <Icon path={mdiChevronRight} size={0.8} className="inline" />
          </button>
        </li>
        <li className="px-[6px]">
          <button
          aria-label="Vá para a última página"
          className={cn(
            totalPage !== pageIndex + 1
              ? "text-gray-500 hover:border-transparent hover:bg-blue-500 hover:text-white" 
              : "text-gray-400 border-gray-200 cursor-not-allowed",
                "w-9 h-9 rounded-lg border border-gray-400 bg-white text-base"
          )}
          disabled={totalPage === pageIndex + 1}
          onClick={() => onPageChange(totalPage - 1)}
          >
            <Icon path={mdiChevronDoubleRight} size={0.8} className="inline" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;