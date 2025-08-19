import Image from "next/image";
import { getRoomDetailById, getDisableRoomById } from "@/libs/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/libs/utils";
import ReserveForm from "./ReserveForm";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
  const [room, disabledDates] = await Promise.all([
    getRoomDetailById(roomId),
    getDisableRoomById(roomId),
  ]);
  if (!room || !disabledDates) return notFound();
  return (
    <div className="max-w-screen-xl py-20 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
      <div className="md:col-span-8">
        <Image
          src={room.image}
          alt={room.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-sm mb-8"
        />
        <h1 className="text-4xl font-semibold text-white mb-8">{room.name}</h1>
        <p className="text-white opacity-70">{room.description}</p>
        <h5 className="text-lg font-bold py-1 mt-1 text-white ">Amenities</h5>
        <div className="grid md: grid-cols-3 text-white opacity-70">
          {room.RoomAmenities.map((item) => (
            <div className="flex gap-1 py-1" key={item.id}>
              <IoCheckmark className="size-6" />
              <span>{item.Amenities.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="px-3 py-5 bg-[#1a1b1c] rounded-md shadow-[0px_5px_28px_-5px_rgba(255,_255,_255,_0.05)] text-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-5" />
              <span>
                {room.capacity} {room.capacity === 1 ? "Person" : "People"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-medium text-white">
                {formatCurrency(room.price)}
              </span>

              <span className="text-white opacity-70 text-sm">/Night</span>
            </div>
          </div>

          {/* Reservation Form */}
          <ReserveForm room={room} disabledDates={disabledDates} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
