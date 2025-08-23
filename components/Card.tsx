import { Room } from "@prisma/client";
import { formatCurrency } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";

const Card = ({ room }: { room: Room }) => {
  return (
    <div className="bg-[var(--background)] shadow-[0px_5px_61px_-10px_rgba(255,_255,_255,_0.05)] rounded-sm transition duration-100 hover:shadow-sm">
      <div className="h-[260px] w-auto rounded-t-sm relative">
        <Image
          src={room.image}
          width={384}
          height={256}
          alt="room image"
          className="w-full h-full object-cover rounded-t-sm"
        />
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-medium">
          <Link
            href={`/room/${room.id}`}
            className="text-white hover:text-[var(--gold)] transition duration-150"
          >
            {room.name}
          </Link>
        </h4>
        <h4 className="text-2xl mb-7">
          <span className="font-semibold text-white">
            {formatCurrency(room.price)}
          </span>
          <span className="text-white text-sm opacity-70">/Night</span>
        </h4>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <IoPeopleOutline />
            <span>
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>
          <Link
            href={`/room/${room.id}`}
            className="px-6 py-3 md:px-10 md:py-4 font-semibold text-white bg-[var(--gold)] rounded-sm hover:bg-[var(--goldhover)] transition duration-150"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
