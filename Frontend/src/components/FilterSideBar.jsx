export default function FilterSidebar({ filters, onChange, onApply }) {
  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={filters.genre}
          onChange={onChange}
          className="px-3 py-2 rounded-lg border border-gray-300"
        />
        <select
          name="isAvailable"
          value={filters.isAvailable}
          onChange={onChange}
          className="px-3 py-2 rounded-lg border border-gray-300"
        >
          <option value="">Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <input
          type="number"
          name="year"
          placeholder="Published Year"
          value={filters.year}
          onChange={onChange}
          className="px-3 py-2 rounded-lg border border-gray-300"
        />
        <button
          onClick={onApply}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
