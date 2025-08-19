import { object, string, coerce, array } from "zod";

export const ContactSchema = object({
  name: string().min(3, "Name at least 3 character"),
  email: string()
    .min(6, "Email at least 6 character")
    .email("Please enter a valid email"),
  subject: string().min(6, "Subject at least 6 character"),
  message: string()
    .min(6, "Message at least 6 character")
    .max(200, "Message max 200 character"),
});

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

export const ReserveSchema = object({
  name: string().min(1),
  phoneNumber: string().min(10),
});
