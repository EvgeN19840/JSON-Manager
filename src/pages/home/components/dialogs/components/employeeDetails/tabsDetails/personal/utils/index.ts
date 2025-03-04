import { IEmployee } from "@/const/types";
import { getDateFormat } from "@/shared/utils/getDateFormat";

export const currentData = (data: IEmployee) => {
  return [
    {
      title: "Employee No",
      value: data.number,
      position: "left",
      customerBambooDomain: data.eId,
      type: "link",
    },
    {
      title: "Full Name",
      value: `${data.firstName} ${data.middleName || ""} ${data.lastName}`,
      position: "left",
      type: "text",
    },
    {
      title: "Birth Date",
      value: data.birthDate ? getDateFormat(data.birthDate) : "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "Hire Date",
      value: getDateFormat(data.hireDate),
      position: "left",
      type: "text",
    },
    {
      title: "End Date",
      value: data.endDate ? getDateFormat(data.endDate) : "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "E-mail",
      value: data.email || "N/A",
      position: "left",
      type: "text",
      mainTitle: "Contact",
    },
    {
      title: "Street 1",
      value: data.addressStreet1 || "N/A",
      position: "left",
      type: "text",
      mainTitle: "Address",
    },
    {
      title: "Street 2",
      value: data.addressStreet2 || "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "City",
      value: data.addressCity || "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "State / Province",
      value: data.addressState || "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "ZIP",
      value: data.addressZip || "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "Country",
      value: data.addressCountry || "N/A",
      position: "left",
      type: "text",
    },
    {
      title: "Enabled for CayPay",
      value: data.enabledForCayPay ? "Yes" : "No",
      position: "left",
      type: "text",
    },
    {
      title: "Pension Member Number",
      value: data.pensionMemberNumber,
      position: "left",
      type: "text",
    },
    {
      title: "Health Insurance Member Number",
      value: data.healthInsuranceMemberNumber,
      position: "left",
      type: "text",
    },
    {
      title: "Life Insurance Member Number",
      value: data.lifeInsuranceMemberNumber,
      position: "left",
      type: "text",
    },
    {
      title: "Transfer Employee Statutory to Voluntary on Cap",
      value: data.transferEmployeeStatutoryToVoluntaryOnCap ? "Yes" : "No",
      position: "left",
      type: "text",
    },
    {
      title: "Transfer Company Statutory to Voluntary on Cap",
      value: data.transferCompanyStatutoryToVoluntaryOnCap ? "Yes" : "No",
      position: "left",
      type: "text",
    },
  ];
};

