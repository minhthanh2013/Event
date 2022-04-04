-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "Host" (
    "hostID" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("hostID")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "speakerID" SERIAL NOT NULL,
    "dateJoin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("speakerID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" SERIAL NOT NULL,
    "dateBuy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
);

-- CreateTable
CREATE TABLE "TicketPlan" (
    "planID" SERIAL NOT NULL,
    "planPrice" DOUBLE PRECISION NOT NULL,
    "planName" TEXT NOT NULL,
    "ticketID" INTEGER NOT NULL,

    CONSTRAINT "TicketPlan_pkey" PRIMARY KEY ("planID")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "methodID" SERIAL NOT NULL,
    "methodName" TEXT NOT NULL,
    "ticketID" INTEGER NOT NULL,
    "subscriptionID" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("methodID")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscriptionID" SERIAL NOT NULL,
    "subscriptionStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "hostID" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionID")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "planID" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "pricePerMonth" DOUBLE PRECISION NOT NULL,
    "subscriptionID" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("planID")
);

-- CreateTable
CREATE TABLE "Conference" (
    "conferenceID" SERIAL NOT NULL,
    "conferenceName" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "dateStartConference" TIMESTAMP(3) NOT NULL,
    "dateStartSell" TIMESTAMP(3) NOT NULL,
    "dateEndSell" TIMESTAMP(3) NOT NULL,
    "isConferenceEnd" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "hostID" INTEGER NOT NULL,
    "isValidated" BOOLEAN NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("conferenceID")
);

-- CreateTable
CREATE TABLE "InvitationQueue" (
    "invitationQueueID" SERIAL NOT NULL,
    "isAgreeByUser" BOOLEAN NOT NULL,
    "userID" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "InvitationQueue_pkey" PRIMARY KEY ("invitationQueueID")
);

-- CreateTable
CREATE TABLE "Record" (
    "recordID" SERIAL NOT NULL,
    "recordURL" TEXT NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("recordID")
);

-- CreateTable
CREATE TABLE "ConferenceCategory" (
    "categoryID" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "ConferenceCategory_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "ConferenceType" (
    "typeID" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "ConferenceType_pkey" PRIMARY KEY ("typeID")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analyticID" SERIAL NOT NULL,
    "numberTicketBougt" INTEGER NOT NULL,
    "numberOfAttendee" INTEGER NOT NULL,
    "conferenceID" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analyticID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userName_key" ON "Admin"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Host_userName_key" ON "Host"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Host_conferenceID_key" ON "Host"("conferenceID");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_userID_key" ON "Speaker"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_conferenceName_key" ON "Conference"("conferenceName");

-- CreateIndex
CREATE UNIQUE INDEX "Record_conferenceID_key" ON "Record"("conferenceID");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceCategory_categoryName_key" ON "ConferenceCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceType_typeName_key" ON "ConferenceType"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_conferenceID_key" ON "Analytics"("conferenceID");

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketPlan" ADD CONSTRAINT "TicketPlan_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "Ticket"("ticketID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "Ticket"("ticketID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_subscriptionID_fkey" FOREIGN KEY ("subscriptionID") REFERENCES "Subscription"("subscriptionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_hostID_fkey" FOREIGN KEY ("hostID") REFERENCES "Host"("hostID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_subscriptionID_fkey" FOREIGN KEY ("subscriptionID") REFERENCES "Subscription"("subscriptionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationQueue" ADD CONSTRAINT "InvitationQueue_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationQueue" ADD CONSTRAINT "InvitationQueue_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceCategory" ADD CONSTRAINT "ConferenceCategory_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceType" ADD CONSTRAINT "ConferenceType_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_conferenceID_fkey" FOREIGN KEY ("conferenceID") REFERENCES "Conference"("conferenceID") ON DELETE RESTRICT ON UPDATE CASCADE;
