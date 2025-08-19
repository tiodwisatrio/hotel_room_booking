import { getAmenities, getRoomById } from "@/libs/data";
import UpdateForm from "./UpdateForm";
import { notFound } from "next/navigation";

const UpdateRoom = async ({ roomId }: { roomId: string }) => {
  const [amenities, room] = await Promise.all([
    getAmenities(),
    getRoomById(roomId),
  ]);
  //   const amenities = await getAmenities();

  if (!amenities || !room) return notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-10">Update Room</h1>
      <UpdateForm amenities={amenities} room={room} />
    </div>
  );
};

export default UpdateRoom;
