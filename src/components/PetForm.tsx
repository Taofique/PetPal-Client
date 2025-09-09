import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createPet } from "../services/petServices";
import { selectCurrentUser } from "../features/auth/selectore";
import { Link, useNavigate } from "react-router-dom";
import type { PetCreateInput } from "../types/petTypes";

const PetForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const { status, error } = useAppSelector((s) => s.pets);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const loading = status === "loading";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const ageNum = Number(age);
    if (!name || !nickname || !species || Number.isNaN(ageNum)) {
      setMessage("❌ Please fill name, nickname, species and a valid age.");
      return;
    }
    if (ageNum < 0) {
      setMessage("❌ Age cannot be negative.");
      return;
    }

    const payload: PetCreateInput = {
      name: name.trim(),
      nickname: nickname.trim(),
      species: species.trim(),
      age: ageNum,
      imageUrl: imageUrl.trim() ? imageUrl.trim() : null,
    };

    try {
      await dispatch(createPet(payload)).unwrap();
      setMessage("✅ Pet created.");
      // reset
      setName("");
      setNickname("");
      setSpecies("");
      setAge("");
      setImageUrl("");
      // optional: redirect to list
      navigate("/pets");
    } catch (err: any) {
      setMessage(`❌ ${err?.message || "Failed to create pet"}`);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Add Pet</h2>
        <Link
          to="/pets"
          className="rounded-md bg-gray-100 px-3 py-2 text-gray-800 hover:bg-gray-200"
        >
          Back to list
        </Link>
      </div>

      {user && (
        <p className="text-sm text-gray-600 mb-3">
          Owner: <span className="font-medium">{user.name}</span> (ID {user.id})
        </p>
      )}

      {(error || message) && (
        <div
          className={`mb-4 rounded-xl border p-3 text-sm ${
            error || message.startsWith("❌")
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {error ?? message}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (e.g., Charlie)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname (unique per owner)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Species (e.g., Dog, Cat)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age (years)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional, paste a Cloudinary URL)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </main>
  );
};

export default PetForm;
