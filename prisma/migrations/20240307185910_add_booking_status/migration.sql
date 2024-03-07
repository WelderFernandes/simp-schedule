/*
  Warnings:

  - Added the required column `bookingStatusId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingStatusId" TEXT NOT NULL,
ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BookingStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BookingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingStatus_id_name_key" ON "BookingStatus"("id", "name");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookingStatusId_fkey" FOREIGN KEY ("bookingStatusId") REFERENCES "BookingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
