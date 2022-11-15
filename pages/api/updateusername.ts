import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth, initializeFirebase } from "@/libs/firebase";

initializeFirebase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method != "POST") {
      return res
        .status(400)
        .json({ error: { message: "It should be POST method." } });
    }

    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        error: { message: "Username is invalid." },
      });
    }

    let idToken = req.headers.authorization!;
    if (idToken.includes("Bearer")) {
      const regex = /Bearer (.+)/i;
      idToken = req?.headers.authorization?.match(regex)?.[1]!;
    } else {
      return res.status(400).json({
        error: {
          message: "Authorization token invalid",
        },
      });
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    let user = null;
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      user = null;
    } else {
      user = {
        ...userDoc.data(),
      };
    }

    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    await db.collection("users").doc(decodedToken.uid).update({ username });
    const userSnapshot = await db
      .collection("users")
      .doc(decodedToken.uid)
      .get();
    user = { ...userSnapshot.data() };

    return res.json({
      message: "Successfully updated!",
      user,
    });
  } catch (e: any) {
    if (e.code == "auth/id-token-expired") {
      return res.status(401).json({
        error: {
          message: "token expired",
        },
      });
    } else if (e.code == "auth/argument-error") {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    return res.status(400).json({
      error: {
        message: "Unknown error occured.",
      },
    });
  }
}
