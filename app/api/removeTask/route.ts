import { database } from "@/firebase-config";
import { ref, get as getFirebaseData, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    // Parse request body to get userId and taskId
    const { userId, taskId, taskIn } = await req.json();

    if (!userId || !taskId) {
      throw new Error(
        !userId ? "UserId must be provided" : "TaskId must be provided"
      );
    }

    // Create a reference to the user's completed tasks in the Firebase database
    const completedTasksRef = ref(database, `users/${userId}/tasks/${taskIn}`);

    // Get the existing tasks from the database
    const snapshot = await getFirebaseData(completedTasksRef);

    if (snapshot.exists() && snapshot.val()) {
      // Check if the task with the specified taskId exists in the array
      const tasks: { [key: string]: any } = snapshot.val(); // Type assertion here

      if (tasks[taskId]) {
        // Create an update object to remove the task
        const updateObj = {
          [taskId]: null,
        };

        // Use update method to delete the task object from the array
        await update(completedTasksRef, updateObj);

        return NextResponse.json({
          message: `Task with taskId ${taskId} deleted successfully👍`,
        });
      } else {
        return NextResponse.json({
          message: `Task with taskId ${taskId} not found`,
        });
      }
    } else {
      return NextResponse.json({
        message: `User with userid ${userId} not found`,
      });
    }
  } catch (error: any) {
    // Handle errors and send an error response back to the client
    return NextResponse.error();
  }
}
