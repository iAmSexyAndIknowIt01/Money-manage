import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const transaction = await Transaction.create(body);

    return Response.json(transaction, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // yyyy-mm

    let query = {};

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      query = {
        date: {
          $gte: start,
          $lt: end,
        },
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    return Response.json(transactions);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Transaction.findByIdAndUpdate(
      body._id,
      {
        amount: body.amount,
        category: body.category,
        note: body.note,
        type: body.type,
      },
      { new: true }
    );

    return Response.json(updated);
  } catch (e) {
    return Response.json({ message: "Update failed" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Transaction.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ message: "Delete failed" }, { status: 500 });
  }
}