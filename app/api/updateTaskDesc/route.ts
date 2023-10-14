import { database } from "@/firebase-config";
import { ref, get as getFirebaseData, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    // Parse request body to get userId, taskId, and newDescription
    const { userId, taskId, source, newDescription } = await req.json();

    if (!userId || !taskId || !newDescription) {
      throw new Error(
        !userId
          ? "UserId must be provided"
          : !taskId
          ? "TaskId must be provided"
          : "New task name must be provided"
      );
    }

    // Create a reference to the user's tasks array in the Firebase database
    const tasksRef = ref(database, `users/${userId}/tasks/${source}`);

    // Get the existing tasks from the database
    const snapshot = await getFirebaseData(tasksRef);

    if (snapshot.exists() && snapshot.val()) {
      // Check if the task with the specified taskId exists in the array
      const tasks: { [key: string]: any } = snapshot.val();

      if (tasks[taskId]) {
        // Update the task name for the specified taskId
        tasks[taskId].task = newDescription;

        // Use update method to update the task object in the array
        await update(tasksRef, tasks);

        return NextResponse.json({
          message: `Task with taskId ${taskId} updated successfully👍`,
        });
      } else {
        return NextResponse.json({
          message: `Task with taskId ${taskId} not found`,
        });
      }
    } else {
      return NextResponse.json({
        message: `User with userid ${userId} not found or tasks array is empty`,
      });
    }
  } catch (error: any) {
    // Handle errors and send an error response back to the client
    return NextResponse.error();
  }
}
