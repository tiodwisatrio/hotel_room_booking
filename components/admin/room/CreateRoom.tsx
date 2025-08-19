import CreateForm from "./CreateForm";
import { getAmenities } from "@/libs/data";

const CreateRoom = async () => {
  const amenities = await getAmenities();

  if (!amenities) return null;
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Create New Room</h1>
      <CreateForm amenities={amenities} />
    </div>
  );
};

export default CreateRoom;
