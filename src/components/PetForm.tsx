import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createPet } from "../services/petServices";
import { selectCurrentUser } from "../features/auth/selectore";

const PetForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const petStatus = useAppSelector((s) => s.pets.status);
  const petError = useAppSelector((s) => s.pets.error);

  const [nickname, setNickname] = useState("");
  const [species, setSpecies] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!nickname || !species) {
      setMessage("❌ Please fill nickname and species");
      return;
    }

    try {
      await dispatch(
        createPet({
          nickname,
          species,
          // ownerId is inferred from auth state in the thunk; you can pass it explicitly if your API requires it:
          // ownerId: user?.id,
          photo,
        })
      ).unwrap();

      setMessage("✅ Pet added successfully!");
      setNickname("");
      setSpecies("");
      setPhoto(null);
      // (optional) you could also clear file input’s value via ref if desired
    } catch (err: any) {
      setMessage(`❌ ${err?.message || "Error adding pet"}`);
    }
  };

  const loading = petStatus === "loading";

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Pet</h2>

      {/* who is the owner (informational) */}
      {user && (
        <p className="text-sm text-gray-600 mb-3">
          Owner: <span className="font-medium">{user.name}</span> (ID {user.id})
        </p>
      )}

      {petError && (
        <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {petError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Species"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Removed ownerId input: inferred from logged-in user */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="w-full border rounded-lg p-2 text-gray-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default PetForm;
