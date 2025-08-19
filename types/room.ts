import { Prisma } from "../app/generated/prisma/client";
export type RoomProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      select: {
        amenitiesId: true;
      };
    };
  };
}>;

export type RoomDetailProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      include: {
        Amenities: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type DisabledDatesProps = Prisma.ReservationGetPayload<{
  select: {
    startDate: true;
    endDate: true;
  };
}>;
