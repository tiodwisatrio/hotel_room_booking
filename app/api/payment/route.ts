import { reservationProps } from "./../../../types/reservation";
import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const POST = async (request: Request) => {
  try {
    const reservation: reservationProps = await request.json();

    const parameter = {
      transaction_details: {
        order_id: reservation.id,
        gross_amount: reservation.Payment?.amount || 0,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: reservation.User.name,
        email: reservation.User.email,
      },
    };

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
