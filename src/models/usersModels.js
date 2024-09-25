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

    return user;
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    throw error;
  }
}
