-- DropIndex
DROP INDEX "BookingStatus_id_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookingStatusId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bookingStatusId_fkey" FOREIGN KEY ("bookingStatusId") REFERENCES "BookingStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
