import { notFound } from "next/navigation";
import Card from "./Card";
import { getRooms } from "@/libs/data";

const Main = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-12 md:grid-cols-3">
        {rooms.map((room) => (
          <div className="hover:*:scale-105 transition-all duration-100 " key={room.id}>
            <Card room={room} key={room.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
