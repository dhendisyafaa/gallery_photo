import prisma from "../db/db.js";

export const findAllReport = async () => {
  return await prisma.reportIssue.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

export const findReportById = async (id) => {
  return await prisma.reportIssue.findUnique({
    where: {
      id,
    },
    include: {
      response: true,
    },
  });
};

export const generateReportIssue = async (data) => {
  return await prisma.reportIssue.create({
    data,
  });
};
