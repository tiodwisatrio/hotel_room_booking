export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { getReserveById } from "@/libs/data";
import { formatCurrency, formatDate } from "@/libs/utils";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, fontFamily: "Helvetica" },
  header: { fontSize: 32, marginBottom: 32, marginTop: 48, fontWeight: "bold" },
  section: { marginBottom: 16 },
  tableRow: { display: "flex", flexDirection: "row", marginBottom: 4 },
  cell: { flex: 1 },
  rightCell: { flex: 1, textAlign: "right" },
});

// normalize many possible pdf(...) results to Uint8Array
async function toUint8Array(result: any): Promise<Uint8Array> {
  if (!result) throw new Error("Empty PDF result");

  // Node Buffer
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(result)) {
    return new Uint8Array(result);
  }

  // Uint8Array or ArrayBuffer
  if (result instanceof Uint8Array) return result;
  if (result instanceof ArrayBuffer) return new Uint8Array(result);

  // Node Readable stream (async iterator)
  if (typeof result[Symbol.asyncIterator] === "function") {
    const chunks: Buffer[] = [];
    for await (const chunk of result as AsyncIterable<Buffer | string>) {
      if (typeof chunk === "string") chunks.push(Buffer.from(chunk));
      else chunks.push(Buffer.from(chunk));
    }
    return new Uint8Array(Buffer.concat(chunks));
  }

  // WHATWG ReadableStream (has getReader)
  if (typeof result.getReader === "function") {
    const reader = result.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const total = chunks.reduce((s, c) => s + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
      out.set(c, offset);
      offset += c.length;
    }
    return out;
  }

  // object with arrayBuffer() (e.g., Blob-like)
  if (typeof result.arrayBuffer === "function") {
    const ab = await result.arrayBuffer();
    return new Uint8Array(ab);
  }

  // fallback: coerce via Buffer
  return new Uint8Array(Buffer.from(result as any));
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`PDF: request for reservation id=${id}`);

  try {
    const reservation = await getReserveById(id);
    if (!reservation) {
      console.warn("PDF: reservation not found:", id);
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const doc = (
      <Document>
        {/* set landscape orientation (A4 landscape) */}
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Reservation Detail</Text>
            <Text>Reservation ID: {reservation.id}</Text>
            <Text>
              Booked At: {formatDate(reservation.createdAt.toISOString())}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>Guest</Text>
            <Text>Name: {reservation.User?.name || "-"}</Text>
            <Text>Email: {reservation.User?.email || "-"}</Text>
            <Text>Phone: {reservation.User?.phoneNumber || "-"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
              Reservation
            </Text>

            <View style={styles.tableRow}>
              <Text style={styles.cell}>Room</Text>
              <Text style={styles.cell}>Price</Text>
              <Text style={styles.cell}>Arrival</Text>
              <Text style={styles.cell}>Departure</Text>
              <Text style={styles.rightCell}>Subtotal</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.cell}>{reservation.Room?.name || "-"}</Text>
              <Text style={styles.cell}>
                {formatCurrency(reservation.Room?.price ?? 0)}
              </Text>
              <Text style={styles.cell}>
                {formatDate(reservation.startDate.toDateString())}
              </Text>
              <Text style={styles.cell}>
                {formatDate(reservation.endDate.toDateString())}
              </Text>
              <Text style={styles.rightCell}>
                {reservation.Payment
                  ? formatCurrency(reservation.Payment.amount)
                  : "-"}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "bold" }}>
              Total:{" "}
              {reservation.Payment
                ? formatCurrency(reservation.Payment.amount)
                : formatCurrency(0)}
            </Text>
          </View>
        </Page>
      </Document>
    );

    // pdf(...).toBuffer() returns different types depending on environment;
    // treat result generically and convert to Uint8Array
    let result: any;
    try {
      result = await pdf(doc).toBuffer();
    } catch (err) {
      console.error("PDF: pdf(...).toBuffer() threw:", err);
      return NextResponse.json(
        { message: "Failed to render PDF", detail: String(err) },
        { status: 500 }
      );
    }

    let uint8: Uint8Array;
    try {
      uint8 = await toUint8Array(result);
    } catch (err) {
      console.error("PDF: toUint8Array conversion failed:", err);
      return NextResponse.json(
        { message: "Failed to convert PDF buffer", detail: String(err) },
        { status: 500 }
      );
    }

    console.log(`PDF: generated ${uint8.length} bytes for id=${id}`);
    return new Response(uint8 as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="reservation-${id}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error (unexpected):", err);
    return NextResponse.json(
      { message: "Failed to generate PDF", detail: String(err) },
      { status: 500 }
    );
  }
}
