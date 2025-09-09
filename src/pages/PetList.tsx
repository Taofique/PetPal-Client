import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { fetchPets } from "../services/petServices";
import PetCard from "../components/PetCard";

export default function PetList() {
  const dispatch = useAppDispatch();
  const { items, status, error, total, pageSize } = useAppSelector(
    (s) => s.pets
  );

  const [params, setParams] = useSearchParams();
  const currentPage = Math.max(1, Number(params.get("page") || 1));
  const limit = Math.max(1, Number(params.get("limit") || pageSize || 10));

  useEffect(() => {
    dispatch(fetchPets({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(next));
    newParams.set("limit", String(limit));
    setParams(newParams);
    // fetchPets is triggered by useEffect on params change
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pets</h1>
        <Link
          to="/pets/new"
          className="rounded-md bg-blue-600 px-3 py-2 text-white hover:opacity-90"
        >
          Add Pet
        </Link>
      </div>

      {status === "loading" && <p className="text-gray-600">Loading pets…</p>}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {items.length === 0 && status === "succeeded" ? (
        <p className="text-gray-600">No pets yet. Add your first one.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => go(currentPage - 1)}
                disabled={!hasPrev}
                className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => go(currentPage + 1)}
                disabled={!hasNext}
                className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
