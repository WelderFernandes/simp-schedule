/*
  Warnings:

  - You are about to drop the column `bookingStatusId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_bookingStatusId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingStatusId";
