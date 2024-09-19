import prisma from "../config/prisma.js";

export async function emailExists(email) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  } catch (error) {
    console.error("Error checking email unique:", error);
    throw error;
  }
}

export async function createUser(name, email, password_hash, phone) {
  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password_hash,
        phone,
      },
    });

    return user
  } catch (error) {
    console.error("Error creating :", error);
    throw error;
  }
}
