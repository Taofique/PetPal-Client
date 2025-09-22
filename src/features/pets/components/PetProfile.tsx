// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import type { Pet } from "../../../types/petTypes";
// import CareLogs from "../../careLogs/components/CareLogs";
// import placeholder from "../assets/placeholder.jpeg";

// // Simple reminder scheduling
// const scheduleReminder = (petName: string, date: string | null) => {
//   if (!date) return;
//   const ms = new Date(date).getTime() - Date.now();
//   if (ms > 0 && "Notification" in window) {
//     Notification.requestPermission().then((perm) => {
//       if (perm === "granted") {
//         setTimeout(() => {
//           new Notification(`Reminder: ${petName}'s appointment today!`);
//         }, ms);
//       }
//     });
//   }
// };

// const PetProfile = () => {
//   const { id } = useParams();
//   const [pet, setPet] = useState<Pet | null>(null);

//   useEffect(() => {
//     const fetchPet = async () => {
//       try {
//         const response = await get(`/pets/${id}`);
//         setPet(response.data.pet);

//         if (response.data.pet.nextVet) {
//           scheduleReminder(
//             response.data.pet.nickname,
//             response.data.pet.nextVet
//           );
//         }
//         if (response.data.pet.nextFeed) {
//           scheduleReminder(
//             response.data.pet.nickname,
//             response.data.pet.nextFeed
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching pet details:", error);
//       }
//     };
//     fetchPet();
//   }, [id]);

//   if (!pet) return <p className="p-6">Loading...</p>;

//   const photoUrl = pet.photo?.startsWith("http")
//     ? pet.photo // external URL (Cat/Dog API)
//     : pet.photo
//     ? `http://localhost:4000/${pet.photo.replace(/\\/g, "/")}` // local uploads
//     : placeholder; // fallback image

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       {/* Pet details card */}
//       <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
//         <img
//           src={photoUrl}
//           alt={pet.nickname}
//           className="w-40 h-40 object-cover rounded-full shadow"
//         />
//         <div className="flex-1 text-center sm:text-left">
//           <h1 className="text-3xl font-bold">{pet.nickname}</h1>
//           <p className="text-gray-600">{pet.species}</p>
//           <p className="text-sm text-gray-500">Owner ID: {pet.ownerId}</p>

//           {pet.nextFeed && (
//             <p className="mt-2 text-sm text-gray-700">
//               🍖 Next Feed: {new Date(pet.nextFeed).toLocaleDateString()}
//             </p>
//           )}
//           {pet.nextVet && (
//             <p className="text-sm text-gray-700">
//               🏥 Next Vet: {new Date(pet.nextVet).toLocaleDateString()}
//             </p>
//           )}

//           <Link
//             to={`/pets/${pet.id}/edit`}
//             className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Edit Pet
//           </Link>
//         </div>
//       </div>

//       {/* Care logs card */}
//       <div className="bg-white shadow-md rounded-2xl p-6">
//         <CareLogs petId={pet.id} />
//       </div>
//     </div>
//   );
// };

// export default PetProfile;
