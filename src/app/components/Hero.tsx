// Hero.tsx
export default function Hero({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">
        Your Home Repair Solution
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Welcome to Happy Home Services! Connect with skilled professionals for all your home repair needs.
      </p>
      <form
        className="flex gap-2 mt-4 max-w-md mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder="What service do you need?"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
}
