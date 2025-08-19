"use server";
import { notFound, redirect } from "next/navigation";
import { prisma } from "./prisma";
import { ContactSchema, RoomSchema, ReserveSchema } from "./zod";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

// Definisikan tipe untuk state yang akan digunakan
interface FormState {
  error?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  message?: string;
}

export const SaveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image)
    return {
      message: "Image is required",
    };
  const rawData = {
    // image: formData.get("image"),
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validateFields = RoomSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }
  const { name, description, capacity, price, amenities } = validateFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({
              amenitiesId: item,
            })),
          },
        },
      },
    });
  } catch (error) {}

  redirect("/admin/room");
};

// Perbarui tanda tangan fungsi untuk menerima prevState sebagai argumen pertama
export const ContactMessage = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const validateFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // Jika validasi gagal, kembalikan error
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validateFields.data;

  try {
    // Logika untuk menyimpan data ke database menggunakan Prisma
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return { message: "Thanks for contact us." };
  } catch (error) {
    console.error(error); // Gunakan console.error untuk kesalahan
    return {
      message: "An error occurred while sending your message.",
    };
  }
};

export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/room");
};

export const updateRoom = async (
  roomId: string,
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  // Cek apakah gambar ada. Ini adalah validasi awal yang baik.
  if (!image) {
    return {
      message: "Image is required",
    };
  }

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: Number(formData.get("capacity")), // Pastikan tipe data benar
    price: Number(formData.get("price")), // Pastikan tipe data benar
    amenities: formData.getAll("amenities"),
  };

  const validateFields = RoomSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }
  const { name, description, capacity, price, amenities } = validateFields.data;

  try {
    // Cari room terlebih dahulu untuk memastikan room tersebut ada.
    const existingRoom = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!existingRoom) {
      // Jika room tidak ditemukan, kembalikan error yang jelas.
      return {
        message: "Room with the provided ID was not found.",
      };
    }

    // Gunakan transaksi untuk memastikan kedua operasi (update dan create) berhasil
    await prisma.$transaction(async (tx) => {
      // Update room yang ada
      await tx.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
        },
      });

      // Hapus semua amenities yang terkait dengan room tersebut
      await tx.roomAmenities.deleteMany({
        where: { roomId: roomId },
      });

      // Buat amenities baru
      await tx.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      });
    });
  } catch (error) {
    console.error("Database operation failed:", error);
    return {
      message: "Failed to update room. An unexpected error occurred.",
    };
  }

  revalidatePath("/admin/room");
  redirect("/admin/room");
};

export const createReserve = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    redirect(`/signin?redirect_url=room/${roomId}`);

  const rawData = {
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"), // Perbaikan: Ambil data dengan nama 'phoneNumber'
  };
  const validatedFields = ReserveSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, phoneNumber } = validatedFields.data;
  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0)
    return {
      messageDate: "Date must be at least 1 night",
    };
  const total = night * price;

  let reservationId;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name,
          phoneNumber,
        },
        where: {
          id: session.user.id,
        },
      });
      const reservation = await tx.reservation.create({
        data: {
          startDate: startDate,
          endDate: endDate,
          price: price,
          roomId: roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount: total,
            },
          },
        },
      });
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }
  redirect(`/checkout/${reservationId}`);
};
