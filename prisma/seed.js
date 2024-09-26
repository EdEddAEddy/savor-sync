import { PrismaClient, PriceRange, Status, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.users.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password_hash: await hash("password123", 10),
        phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      },
    });
    users.push(user);
  }

  const restaurants = [];
  for (let i = 1; i <= 10; i++) {
    const restaurant = await prisma.restaurants.create({
      data: {
        name: `Restaurant ${i}`,
        description: `Description for Restaurant ${i}`,
        address: `${i} Main St, City, Country`,
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
        cuisine_type: ["Italian", "Chinese", "Mexican", "Indian", "Japanese"][
          Math.floor(Math.random() * 5)
        ],
        price_range: Object.values(PriceRange)[Math.floor(Math.random() * 4)],
        opening_hours: JSON.stringify({
          monday: "9:00-22:00",
          tuesday: "9:00-22:00",
          wednesday: "9:00-22:00",
          thursday: "9:00-22:00",
          friday: "9:00-23:00",
          saturday: "10:00-23:00",
          sunday: "10:00-21:00",
        }),
      },
    });
    restaurants.push(restaurant);
  }

  const tables = [];
  for (let i = 1; i <= 10; i++) {
    const table = await prisma.tables.create({
      data: {
        capacity: Math.floor(Math.random() * 6) + 2,
        table_number: `T${i}`,
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
      },
    });
    tables.push(table);
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.reservations.create({
      data: {
        usersId: users[Math.floor(Math.random() * users.length)].id,
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
        tablesId: tables[Math.floor(Math.random() * tables.length)].id,
        reservation_date: new Date(
          Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        reservation_time: new Date(
          Date.now() + Math.random() * 24 * 60 * 60 * 1000
        ),
        party_size: Math.floor(Math.random() * 6) + 1,
        status: Object.values(Status)[Math.floor(Math.random() * 3)],
      },
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.reviews.create({
      data: {
        usersId: users[Math.floor(Math.random() * users.length)].id,
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `This is review ${i}. The food was great!`,
      },
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.restaurantAdmins.create({
      data: {
        usersId: users[Math.floor(Math.random() * users.length)].id,
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
        role: Object.values(Role)[Math.floor(Math.random() * 2)],
      },
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.menuItems.create({
      data: {
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
        name: `Dish ${i}`,
        description: `Description for Dish ${i}`,
        price: Math.floor(Math.random() * 3000 + 500) / 100,
        category: ["Appetizer", "Main Course", "Dessert", "Beverage"][
          Math.floor(Math.random() * 4)
        ],
      },
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.restaurantPhotos.create({
      data: {
        restaurantsId:
          restaurants[Math.floor(Math.random() * restaurants.length)].id,
        photo_url: `https://example.com/restaurant-photo-${i}.jpg`,
        is_primary: i === 1,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
