import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl animate-bounce">
            404
          </h1>
          <h3 className="text-gray-500 text-xl">Page Not Found</h3>
        </div>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-10 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
