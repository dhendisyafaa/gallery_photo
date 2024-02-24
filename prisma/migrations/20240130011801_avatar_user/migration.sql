-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "album_cover" TEXT,
ADD COLUMN     "cloudinary_id" TEXT,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cloudinary_id" TEXT,
ADD COLUMN     "links" TEXT[];
