"use client";
import { type PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { BarLoader } from "react-spinners";
import { IoCloudUpload, IoClose } from "react-icons/io5";
import { Amenities } from "@/app/generated/prisma/client";
import { useActionState } from "react";
import { updateRoom } from "@/libs/actions";
import { RoomProps } from "@/types/room";

const UpdateForm = ({
  amenities,
  room,
}: {
  amenities: Amenities[];
  room: RoomProps;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // Memperbaiki urutan argumen. `room.id` harus diletakkan sebelum `image`.
  const [state, formAction] = useActionState(
    updateRoom.bind(null, room.id, image),
    null
  );

  // Upload file
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setMessage("Please select a file to upload.");
      return;
    }

    const file = event.target.files[0];
    if (file.size === 0 || file.size > 4000000) {
      setMessage("File size must be between 1B and 4MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setMessage("File must be an image.");
      return;
    }

    setMessage("");
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload/", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();
        console.log("Upload response:", data);

        if (response.status !== 200) {
          setMessage(data.message || "Failed to upload image.");
          setImage("");
        } else {
          const img = data as PutBlobResult;
          if (img.url) {
            setImage(img.url);
          } else {
            setImage(URL.createObjectURL(file)); // fallback preview lokal
          }
          setMessage("Image uploaded successfully!");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setMessage("An unexpected error occurred during upload.");
        setImage("");
      }
    });
  };

  // Hapus gambar
  const handleRemoveImage = () => {
    setImage("");
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setMessage("Image removed.");
  };

  const checkedAmenities = room.RoomAmenities.map((item) => item.amenitiesId);

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5 w-full">
        {/* LEFT FORM */}
        <div className="col-span-8 bg-[#1a1b1c] p-4 rounded-md shadow-[0px_5px_28px_-5px_rgba(255,_255,_255,_0.05)] text-white">
          {/* Room Name */}
          <div className="m-6">
            <label
              htmlFor="room_name"
              className="block text-sm font-medium  mb-4"
            >
              Room Name
            </label>
            <input
              id="room_name"
              type="text"
              name="name"
              placeholder="Room Name"
              defaultValue={room.name}
              className="py-2 px-4 rounded-sm border border-gray-600 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-1">
                {state?.error?.name}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="m-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-4"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={8}
              defaultValue={room.description}
              placeholder="Description"
              className="py-2 px-4 rounded-sm border border-gray-600 w-full"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-1">
                {state?.error?.description}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="m-6">
            <label className="block text-sm font-medium mb-4">Amenities</label>
            <div className="grid grid-cols-3 gap-2 text-white">
              {amenities.map((item) => (
                <div className="flex items-center" key={item.id}>
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item.id}
                    defaultChecked={checkedAmenities.includes(item.id)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 checked:bg-teal-600"
                  />
                  <label
                    htmlFor=""
                    className="ms-2 text-sm font-medium opacity-70 capitalize"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
              <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-1">
                  {state?.error?.amenities}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-span-4 bg-[#1a1b1c] p-4 rounded-md shadow-[0px_5px_28px_-5px_rgba(255,_255,_255,_0.05)] text-white sm:w-full">
          {/* Image Upload */}
          {image ? (
            <div className="relative mb-4 aspect-video rounded-md overflow-hidden border border-gray-300">
              <Image src={image} alt="Preview" fill className="object-cover" />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <IoClose className="size-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="input_file"
              className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-600 border-dashed rounded-md cursor-pointer bg-[#1a1b1c] text-white"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isPending ? (
                  <BarLoader color="#3b82f6" />
                ) : (
                  <IoCloudUpload className="size-8" />
                )}
                <p className="mb-1 text-sm font-bold">
                  {isPending ? "Uploading..." : "Select Image"}
                </p>
                <p className="text-xs text-red-500">{message}</p>
              </div>
              <input
                id="input_file"
                type="file"
                ref={inputFileRef}
                onChange={handleUpload}
                // create input file bg-gray
                className="hidden"
                accept="image/*"
                disabled={isPending}
              />
            </label>
          )}

          {/* Capacity */}
          <div className="my-4">
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-white mb-1"
            >
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              name="capacity"
              defaultValue={room.capacity}
              placeholder="Capacity"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-1">
                {state?.error?.capacity}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="my-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-white mb-1"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              defaultValue={room.price}
              placeholder="Price"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-1">
                {state?.error?.price}
              </span>
            </div>
          </div>

          {/* General Messages */}
          {state?.message ? (
            <div className="bg-red-200 p-2 mb-4 rounded-sm">
              <span className="text-sm text-gray-700 m-2">{state.message}</span>
            </div>
          ) : null}

          {/* Submit */}
          <button
            type="submit"
            className="bg-[var(--gold)] text-white w-full hover:bg-[var(--goldhover)] font-semibold py-2.5 px-6 md:px-10 text-lg rounded-sm cursor-pointer my-4"
            disabled={isPending}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
