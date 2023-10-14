import { addUsersRequestBody } from "@/docTypes";
import { database } from "@/firebase-config";
import { set, ref, push } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName, tasks }: addUsersRequestBody = await req.json();

    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef); // Generates a unique ID for the new user

    if (tasks.completed.length == 0 || tasks.inProgress.length == 0) {
      throw new Error(
        "completed tasks or in progress can't be empty during initialization"
      );
    }

    set(newUserRef, {
      userName: userName,
      tasks: tasks,
    });
    return NextResponse.json({
      userId: newUserRef.key,
      message: "Successfully Added User to firebase👍",
    });
  } catch (error: any) {
    return NextResponse.error();
  }
}
