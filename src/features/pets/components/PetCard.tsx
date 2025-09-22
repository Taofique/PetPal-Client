import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { Pet } from "../../../types/petTypes";
import { deletePet, updatePet } from "../../../services/petServices";
import optionsIcon from "../assets/option.png";

function resolveImageUrl(url?: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  const base = "http://localhost:4000";
  return `${base}${url}`;
}

export default function PetCard({ pet }: { pet: Pet }) {
  const dispatch = useAppDispatch();
  const globalStatus = useAppSelector((s) => s.pets.status);
  const loading = globalStatus === "loading";

  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // local edit state
  const [name, setName] = useState(pet.name);
  const [nickname, setNickname] = useState(pet.nickname);
  const [species, setSpecies] = useState(pet.species);
  const [age, setAge] = useState<string>(String(pet.age));
  const [imageUrl, setImageUrl] = useState<string>(pet.imageUrl ?? "");

  // close popovers when clicking outside
  const menuRef = useRef<HTMLDivElement | null>(null);
  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (menuOpen && menuRef.current && !menuRef.current.contains(t)) {
        setMenuOpen(false);
      }
      if (editing && editRef.current && !editRef.current.contains(t)) {
        setEditing(false);
        setErrMsg(null);
        // reset to current pet values on dismiss
        setName(pet.name);
        setNickname(pet.nickname);
        setSpecies(pet.species);
        setAge(String(pet.age));
        setImageUrl(pet.imageUrl ?? "");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen, editing, pet]);

  const src = resolveImageUrl(pet.imageUrl);

  const onDelete = async () => {
    setMenuOpen(false);
    const ok = window.confirm(`Delete "${pet.nickname}"?`);
    if (!ok) return;
    try {
      await dispatch(deletePet(pet.id)).unwrap();
    } catch (e: any) {
      setErrMsg(e?.message || "Failed to delete");
    }
  };

  const onEditSave = async () => {
    setErrMsg(null);
    const ageNum = Number(age);
    if (
      !name.trim() ||
      !nickname.trim() ||
      !species.trim() ||
      Number.isNaN(ageNum)
    ) {
      setErrMsg("Please fill name, nickname, species and a valid age.");
      return;
    }
    if (ageNum < 0) {
      setErrMsg("Age cannot be negative.");
      return;
    }

    try {
      await dispatch(
        updatePet({
          id: pet.id,
          updates: {
            name: name.trim(),
            nickname: nickname.trim(),
            species: species.trim(),
            age: ageNum,
            imageUrl: imageUrl.trim() ? imageUrl.trim() : null,
          },
        })
      ).unwrap();
      setEditing(false);
    } catch (e: any) {
      setErrMsg(e?.message || "Failed to update");
    }
  };

  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* image */}
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

      {/* body */}
      <div className="p-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {pet.nickname}
            </h3>
            <p className="text-sm text-gray-700">{pet.name}</p>
          </div>

          {/* three-dot menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md p-1 hover:bg-gray-100"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Options"
              disabled={loading}
            >
              <img src={optionsIcon} alt="options" className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-1 w-28 rounded-lg border border-gray-200 bg-white shadow-lg z-10"
                role="menu"
              >
                <button
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpen(false);
                    setEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {pet.species} • {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
      </div>

      {/* quick edit overlay */}
      {editing && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div
            ref={editRef}
            className="w-[92%] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:w-[85%]"
          >
            <h4 className="mb-3 text-base font-semibold">Edit Pet</h4>

            {errMsg && (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                {errMsg}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Species"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL (optional)"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditing(false);
                  setErrMsg(null);
                  setName(pet.name);
                  setNickname(pet.nickname);
                  setSpecies(pet.species);
                  setAge(String(pet.age));
                  setImageUrl(pet.imageUrl ?? "");
                }}
                className="rounded-md border px-3 py-2 text-sm"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={onEditSave}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-60"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
