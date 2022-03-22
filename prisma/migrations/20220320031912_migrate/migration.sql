-- CreateEnum
CREATE TYPE "role" AS ENUM ('NORMALUSER', 'ADMIN', 'HOST', 'SPEAKER');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "role" "role" NOT NULL DEFAULT E'NORMALUSER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Conference" (
    "conferenceID" SERIAL NOT NULL,
    "conferenceName" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "recordURL" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    "methodID" INTEGER NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("conferenceID")
);

-- CreateTable
CREATE TABLE "ConferenceCategory" (
    "categoryID" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "ConferenceCategory_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "paymentMethod" (
    "methodID" INTEGER NOT NULL,
    "methodName" TEXT NOT NULL,

    CONSTRAINT "paymentMethod_pkey" PRIMARY KEY ("methodID")
);

-- CreateTable
CREATE TABLE "ConferenceType" (
    "typeID" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "ConferenceType_pkey" PRIMARY KEY ("typeID")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analyticID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,
    "numberofTicketBought" INTEGER,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analyticID")
);

-- CreateTable
CREATE TABLE "UserCreate_Conference" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "UserCreate_Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBuy_Conference" (
    "ID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,
    "dateBuy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBuy_Conference_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_conferenceName_key" ON "Conference"("conferenceName");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceCategory_categoryName_key" ON "ConferenceCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "paymentMethod_methodName_key" ON "paymentMethod"("methodName");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceType_typeName_key" ON "ConferenceType"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_conferenceID_key" ON "Analytics"("conferenceID");

-- CreateIndex
CREATE UNIQUE INDEX "UserCreate_Conference_conferenceID_key" ON "UserCreate_Conference"("conferenceID");

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "ConferenceCategory"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_methodID_fkey" FOREIGN KEY ("methodID") REFERENCES "paymentMethod"("methodID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "ConferenceType"("typeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreate_Conference" ADD CONSTRAINT "UserCreate_Conference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreate_Conference" ADD CONSTRAINT "UserCreate_Conference_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuy_Conference" ADD CONSTRAINT "UserBuy_Conference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuy_Conference" ADD CONSTRAINT "UserBuy_Conference_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;
