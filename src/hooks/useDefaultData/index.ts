import { useModal } from "@/hooks/useModal";
import {
  IEmployeeBasicInfo,
  IEmployeeBenefit,
  IJobInfo,
  IEmploymentStatus,
  ISalary,
} from "@/const/types";

export const useDefaultEmployeeBasicInfo = (): IEmployeeBasicInfo => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBasicInfo | null;
  };

  return {
    eId: dataForDialog?.eId || 0,
    number: dataForDialog?.number || "",
    firstName: dataForDialog?.firstName || "",
    middleName: dataForDialog?.middleName || "",
    lastName: dataForDialog?.lastName || "",
    birthDate: dataForDialog?.birthDate || "",
    email: dataForDialog?.email || "",
    addressStreet1: dataForDialog?.addressStreet1 || "",
    addressStreet2: dataForDialog?.addressStreet2 || "",
    addressCity: dataForDialog?.addressCity || "",
    addressState: dataForDialog?.addressState || "",
    addressZip: dataForDialog?.addressZip || "",
    addressCountry: dataForDialog?.addressCountry || "",
    hireDate: dataForDialog?.hireDate || "",
    endDate: dataForDialog?.endDate || "",
    enabledForCayPay: dataForDialog?.enabledForCayPay || false,
    pensionMemberNumber: dataForDialog?.pensionMemberNumber || "",
    healthInsuranceMemberNumber: dataForDialog?.healthInsuranceMemberNumber || "",
    lifeInsuranceMemberNumber: dataForDialog?.lifeInsuranceMemberNumber || "",
    transferEmployeeStatutoryToVoluntaryOnCap:
      dataForDialog?.transferEmployeeStatutoryToVoluntaryOnCap || false,
    transferCompanyStatutoryToVoluntaryOnCap:
      dataForDialog?.transferCompanyStatutoryToVoluntaryOnCap || false,
  };
};

export const useDefaultEmployeeBenefit = (): IEmployeeBenefit => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
  };

  return {
    name: dataForDialog?.name || "",
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || "",
    companyValue: dataForDialog?.companyValue || 0,
    companyCurrencyCode: dataForDialog?.companyCurrencyCode || "",
    isPerentValue: dataForDialog?.isPerentValue || false,
    effectiveDate: dataForDialog?.effectiveDate || "",
    id: dataForDialog?.id || "",
  };
};

export const useDefaultJobInfo = (): IJobInfo => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IJobInfo | null;
  };

  return {
    customBambooTalbeRowId: dataForDialog?.customBambooTalbeRowId || 0,
    effectiveDate: dataForDialog?.effectiveDate || "",
    jobTitle: dataForDialog?.jobTitle || "",
    department: dataForDialog?.department || null,
    location: dataForDialog?.location || null,
    division: dataForDialog?.division || null,
    reportsTo: dataForDialog?.reportsTo || null,
  };
};

export const useDefaultEmploymentStatus = (): IEmploymentStatus => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmploymentStatus | null;
  };

  return {
    customBambooTalbeRowId: dataForDialog?.customBambooTalbeRowId || 0,
    effectiveDate: dataForDialog?.effectiveDate || "",
    employmentStatus: dataForDialog?.employmentStatus || "",
    comment: dataForDialog?.comment || null,
  };
};

export const useDefaultSalary = (): ISalary => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ISalary | null;
  };

  return {
    customBambooTalbeRowId: dataForDialog?.customBambooTalbeRowId || 0,
    salaryRate: dataForDialog?.salaryRate || 0,
    salaryCurrencyCode: dataForDialog?.salaryCurrencyCode || "",
    salaryRatePeriod: dataForDialog?.salaryRatePeriod || "",
    payPeriod: dataForDialog?.payPeriod || null,
    allowOvertime: dataForDialog?.allowOvertime || false,
    effectiveDate: dataForDialog?.effectiveDate || "",
    changeReason: dataForDialog?.changeReason || null,
    comment: dataForDialog?.comment || null,
    overtimeRate: dataForDialog?.overtimeRate || null,
  };
};
