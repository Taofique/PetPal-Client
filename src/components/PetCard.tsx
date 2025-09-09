import type { Pet } from "../types/petTypes";

function resolveImageUrl(url?: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  const base = import.meta.env.VITE_API_URL ?? "";
  return `${base}${url}`;
}

export default function PetCard({ pet }: { pet: Pet }) {
  const src = resolveImageUrl(pet.imageUrl);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
        {src ? (
          <img
            src={src}
            alt={pet.nickname}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <span className="text-4xl" aria-hidden>
              🐾
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{pet.nickname}</h3>
        <p className="text-sm text-gray-700">{pet.name}</p>
        <p className="text-sm text-gray-600">
          {pet.species} • {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
      </div>
    </article>
  );
}
