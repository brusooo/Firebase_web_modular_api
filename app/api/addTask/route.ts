import { database } from "@/firebase-config";
import { push, ref, get as getFirebaseData } from "firebase/database";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { get } from "http";

export async function POST(req: Request) {
  try {
    // Parse request body to get userId and newTask object
    const { userId, newTask } = await req.json();

    if (!userId || !newTask) {
      throw new Error(
        !userId ? "UserId must be provided" : "TaskId must be provided"
      );
    }

    // Create a reference to the user's completed tasks in the Firebase database
    const completedTasksRef = ref(database, `users/${userId}/tasks/inProgress`);

    // Get the existing tasks from the database
    const snapshot = await getFirebaseData(completedTasksRef);

    if (snapshot.exists() && Array.isArray(snapshot.val())) {
      // Push the new task object to the completed tasks array
      const newTaskObj = {
        task: newTask,
      };

      // Use push method to add the new task object inside the array
      const newTaskRef = push(completedTasksRef, newTaskObj);

      return NextResponse.json({
        message: "Task added to completed tasks successfully👍",
        taskId: newTaskRef.key, // Return the unique key generated for the new task
      });
    } else {
      return NextResponse.json({
        message: `User with userid ${userId} not found`,
        taskId: "none",
      });
    }
  } catch (error: any) {
    // Handle errors and send an error response back to the client
    return NextResponse.error();
  }
}
