-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NORMALUSER', 'ADMIN', 'HOST');

-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "FirstName" TEXT,
    "LastName" TEXT,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Email" TEXT NOT NULL,
    "ImageUrl" TEXT,
    "Role" "Role" NOT NULL DEFAULT E'NORMALUSER',
    "ConferenceID" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Conference" (
    "ConferenceID" SERIAL NOT NULL,
    "ConferenceName" TEXT NOT NULL,
    "TicketPrice" DOUBLE PRECISION NOT NULL,
    "Description" TEXT,
    "Address" TEXT,
    "DateStart" TIMESTAMP(3) NOT NULL,
    "DateEnd" TIMESTAMP(3) NOT NULL,
    "RecordURL" TEXT,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CategoryID" INTEGER NOT NULL,
    "TypeID" INTEGER NOT NULL,
    "MethodID" INTEGER NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("ConferenceID")
);

-- CreateTable
CREATE TABLE "ConferenceCategory" (
    "CategoryID" INTEGER NOT NULL,
    "CategoryName" TEXT NOT NULL,

    CONSTRAINT "ConferenceCategory_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "paymentMethod" (
    "MethodID" INTEGER NOT NULL,
    "MethodName" TEXT NOT NULL,

    CONSTRAINT "paymentMethod_pkey" PRIMARY KEY ("MethodID")
);

-- CreateTable
CREATE TABLE "ConferenceType" (
    "TypeID" INTEGER NOT NULL,
    "TypeName" TEXT NOT NULL,

    CONSTRAINT "ConferenceType_pkey" PRIMARY KEY ("TypeID")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "AnalyticID" INTEGER NOT NULL,
    "ConferenceID" INTEGER NOT NULL,
    "NumberofTicketBought" INTEGER,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("AnalyticID")
);

-- CreateTable
CREATE TABLE "UserCreate_Conference" (
    "ID" SERIAL NOT NULL,
    "UserID" TEXT NOT NULL,
    "ConferenceID" INTEGER NOT NULL,

    CONSTRAINT "UserCreate_Conference_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserBuy_Conference" (
    "ID" SERIAL NOT NULL,
    "UserID" TEXT NOT NULL,
    "ConferenceID" INTEGER NOT NULL,
    "DateBuy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBuy_Conference_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_ConferenceName_key" ON "Conference"("ConferenceName");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceCategory_CategoryName_key" ON "ConferenceCategory"("CategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "paymentMethod_MethodName_key" ON "paymentMethod"("MethodName");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceType_TypeName_key" ON "ConferenceType"("TypeName");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_ConferenceID_key" ON "Analytics"("ConferenceID");

-- CreateIndex
CREATE UNIQUE INDEX "UserCreate_Conference_ConferenceID_key" ON "UserCreate_Conference"("ConferenceID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ConferenceID_fkey" FOREIGN KEY ("ConferenceID") REFERENCES "Conference"("ConferenceID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "ConferenceCategory"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_MethodID_fkey" FOREIGN KEY ("MethodID") REFERENCES "paymentMethod"("MethodID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_TypeID_fkey" FOREIGN KEY ("TypeID") REFERENCES "ConferenceType"("TypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_ConferenceID_fkey" FOREIGN KEY ("ConferenceID") REFERENCES "Conference"("ConferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreate_Conference" ADD CONSTRAINT "UserCreate_Conference_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreate_Conference" ADD CONSTRAINT "UserCreate_Conference_ConferenceID_fkey" FOREIGN KEY ("ConferenceID") REFERENCES "Conference"("ConferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuy_Conference" ADD CONSTRAINT "UserBuy_Conference_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBuy_Conference" ADD CONSTRAINT "UserBuy_Conference_ConferenceID_fkey" FOREIGN KEY ("ConferenceID") REFERENCES "Conference"("ConferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;
