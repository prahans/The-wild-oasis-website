import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ cabinId: string }> },
) {
  try {
    const { cabinId } = await params;
    if (cabinId.trim() === "" || !Number.isSafeInteger(Number(cabinId))) {
      return Response.json({ message: "Invalid cabin ID" }, { status: 400 });
    }

    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    if (!cabin) {
      return Response.json({ message: "Cabin not found" }, { status: 404 });
    }

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json(
      { message: "Cabin data could not be loaded" },
      { status: 500 },
    );
  }
}
