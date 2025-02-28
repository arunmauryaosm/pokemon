import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface PaginationProps {
    count: number;
    limit: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, limit, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(count / limit);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * limit)}</span> of{' '}
                        <span className="font-medium">{count}</span> results
                    </p>
                </div>
                <div>
                    <nav className="flex gap-2 rounded-md">
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePrevious();
                            }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-800 ring-1 hover:bg-gray-400"
                        >
                            <ChevronLeftIcon aria-hidden="true" className="size-5" />
                        </Link>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNext();
                            }}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-800 ring-1 hover:bg-gray-400"
                        >
                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;