// ...existing code...
import { PaymentProps } from "./../../../../types/payment";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import crypto from "crypto";

export const POST = async (request: Request) => {
  const data: PaymentProps = await request.json();
  const reservationId = data.order_id;

  let responseData = null;
  const transactionStatus = data.transaction_status;
  const paymentType = data.payment_type;
  const fraudStatus = data.fraud_status;
  const statusCode = data.status_code;
  const grossAmount = data.gross_amount;
  const signatureKey = data.signature_key;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${reservationId}${transactionStatus}${paymentType}${fraudStatus}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (hash !== signatureKey) {
    return NextResponse.json(
      { error: "Missing signature key" },
      { status: 400 }
    );
  }

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      responseData = await prisma.payment.update({
        data: {
          method: paymentType,
          status: "paid",
        },
        where: { reservationId },
      });
    }
  } else if (transactionStatus == "settlement") {
    responseData = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "paid",
      },
      where: { reservationId },
    });
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    responseData = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "Failure",
      },
      where: { reservationId },
    });
  } else if (transactionStatus == "pending") {
    responseData = await prisma.payment.update({
      data: {
        method: paymentType,
        status: "pending",
      },
      where: { reservationId },
    });
  }

  return NextResponse.json({
    responseData: responseData,
    success: true,
    status: transactionStatus,
  });
};