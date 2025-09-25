export default function NotFound() {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-800">404</h1>
        <p class="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p class="text-gray-500 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a
          href="/"
          class="mt-6 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
}
