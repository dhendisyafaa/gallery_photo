import prisma from "../db/db.js";

export const findAllResponses = async () => {
  return await prisma.responseReport.findMany();
};

export const findResponseById = async (id) => {
  return await prisma.responseReport.findUnique({
    where: {
      id,
    },
    include: {
      report: true,
    },
  });
};

export const insertResponseReport = async (data) => {
  const report_id = data.body.report_id;
  const change_status = data.status.change_status;

  const response = await prisma.responseReport.create({
    data: data.body,
  });

  await changeStatusReport(report_id, change_status);

  return response;
};

export const changeStatusReport = async (id, status_report) => {
  return await prisma.reportIssue.update({
    where: {
      id,
    },
    data: {
      status_report,
    },
  });
};
