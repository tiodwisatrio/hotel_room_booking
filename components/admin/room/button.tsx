import { deleteRoom } from "@/libs/actions";
import Link from "next/link";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const DeleteRoomWithId = deleteRoom.bind(null, id, image);
  return (
    <form action={DeleteRoomWithId}>
      <button
        type="submit"
        className="rounded-sm p-2 bg-red-500 text-white hover:bg-red-600"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};

export const UpdateButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/room/edit/${id}`}
      className="rounded-sm p-2 bg-blue-500 text-white hover:bg-blue-600"
    >
      <IoPencil className="size-5" />
    </Link>
  );
};
