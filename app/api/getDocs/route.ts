import { database } from "@/firebase-config";
import { ref, get as getFirebaseData, Query } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, source } = await req.json();

    if (!userId) {
      throw new Error("UserId must be provided");
    }

    let queryPath = "";
    switch (source) {
      case "user":
        queryPath = `users/${userId}`;
        break;
      case "completed":
        queryPath = `users/${userId}/tasks/completed`;
        break;
      case "inProgress":
        queryPath = `users/${userId}/tasks/inProgress`;
        break;
      default:
        queryPath = `users/${userId}`;
        break;
    }

    const completedTasksRef: Query = ref(database, queryPath);
    const snapshot = await getFirebaseData(completedTasksRef);

    if (snapshot.exists()) {
      return NextResponse.json({
        data: snapshot.val(),
      });
    } else {
      return NextResponse.json({
        data: "No data found",
      });
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}
