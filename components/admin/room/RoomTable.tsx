import { getRooms } from "@/libs/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/libs/utils";
import { DeleteButton, UpdateButton } from "./button";

const RoomTable = async () => {
  const rooms = await getRooms();
  if (!rooms?.length) return <p>No Room Found</p>;

  return (
    <div className="bg-[#1a1b1c] p-4 mt-5 shadow-sm rounded-2xl text-white">
      <table className="w-full divide-y divide-gray-600">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-white uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white  uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white  uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white  uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {rooms.map((room) => (
            <tr className="hover:bg-zinc-900" key={room.id}>
              <td className="px-6 py-4">
                <div className="h-20 w-32 relative">
                  <Image
                    src={room.image}
                    fill
                    alt="room image"
                    className="object-cover rounded-md"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{room.name}</td>
              <td className="px-6 py-4">{formatCurrency(room.price)}</td>
              <td className="px-6 py-4">
                {formatDate(room.createdAt.toString())}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex flex-row justify-center items-center gap-4">
                  <UpdateButton id={room.id} />
                  <DeleteButton id={room.id} image={room.image} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
