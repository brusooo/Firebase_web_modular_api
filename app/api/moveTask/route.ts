import { database } from "@/firebase-config";
import { ref, get as getFirebaseData, update, push } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    // Parse request body to get userId, taskId, and destination array
    const { userId, taskId, source, destination } = await req.json();

    if (!userId || !taskId || !destination) {
      throw new Error(
        !userId
          ? "UserId must be provided"
          : !taskId
          ? "TaskId must be provided"
          : "Destination must be provided"
      );
    }

    // Create references to the source and destination arrays in the Firebase database
    const sourceArrayRef = ref(database, `users/${userId}/tasks/${source}`);
    const destinationArrayRef = ref(
      database,
      `users/${userId}/tasks/${destination}`
    );

    // Get the existing tasks from the source array in the database
    const sourceSnapshot = await getFirebaseData(sourceArrayRef);

    if (sourceSnapshot.exists() && sourceSnapshot.val()) {
      // Check if the task with the specified taskId exists in the source array
      const sourceTasks: { [key: string]: any } = sourceSnapshot.val();

      if (sourceTasks[taskId]) {
        // Remove the task from the source array
        const sourceUpdateObj = {
          [taskId]: null,
        };
        await update(sourceArrayRef, sourceUpdateObj);

        // Add the task to the destination array
        const destinationUpdateObj = {
          [taskId]: sourceTasks[taskId],
        };
        await update(destinationArrayRef, destinationUpdateObj);

        return NextResponse.json({
          message: `Task with taskId ${taskId} moved from ${sourceArrayRef.key} to ${destinationArrayRef.key} successfully👍`,
        });
      } else {
        return NextResponse.json({
          message: `Task with taskId ${taskId} not found in ${sourceArrayRef.key}`,
        });
      }
    } else {
      return NextResponse.json({
        message: `User with userid ${userId} not found or ${sourceArrayRef.key} is empty`,
      });
    }
  } catch (error: any) {
    // Handle errors and send an error response back to the client
    return NextResponse.error();
  }
}
