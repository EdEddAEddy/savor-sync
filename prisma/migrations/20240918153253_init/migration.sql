-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('one', 'two', 'three', 'four');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('owner', 'manager');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cuisine_type" TEXT NOT NULL,
    "price_range" "PriceRange" NOT NULL,
    "opening_hours" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "table_number" TEXT NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "tablesId" INTEGER NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL,
    "reservation_time" TIMESTAMP(3) NOT NULL,
    "party_size" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurantAdmins" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'manager',

    CONSTRAINT "restaurantAdmins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItems" (
    "id" SERIAL NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantPhotos" (
    "id" SERIAL NOT NULL,
    "restaurantsId" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL,

    CONSTRAINT "RestaurantPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tablesId_fkey" FOREIGN KEY ("tablesId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurantAdmins" ADD CONSTRAINT "restaurantAdmins_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurantAdmins" ADD CONSTRAINT "restaurantAdmins_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantPhotos" ADD CONSTRAINT "RestaurantPhotos_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
