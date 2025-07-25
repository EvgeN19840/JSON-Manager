// ** Hooks
import { useModal } from "@/pages/home/hooks";

// ** Types
import {
  IEmployeeBasicInfo,
  IEmployeeBenefit,
  IJobInfo,
  IEmploymentStatus,
  ISalary,
  IDepositAccounts,
  IBonuses,
  IReimbursement,
  IOtherDeduction,
  ILoanOrSalaryAdvance,
  IFees,
} from "@/types/json";

export const useDefaultEmployeeBasicInfo = (): IEmployeeBasicInfo => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBasicInfo | null;
  };

  return {
    eId: dataForDialog?.eId || 0,
    number: dataForDialog?.number || dataForDialog?.eId || "",
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
    effectiveDate: dataForDialog?.effectiveDate || "2024-01-01",
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || "",
    companyValue: dataForDialog?.companyValue || 0,
    companyCurrencyCode: dataForDialog?.companyCurrencyCode || "",
    isPerentValue: dataForDialog?.isPerentValue || false,

    id: dataForDialog?.id || "",
  };
};

export const useDefaultReimbursement = (): IReimbursement => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IReimbursement | null;
  };

  return {
    name: dataForDialog?.name || "",
    startDate: dataForDialog?.startDate || "2024-01-01",
    endDate: dataForDialog?.endDate || null,
    payrollOperationFrequency: dataForDialog?.payrollOperationFrequency || "",
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    value: dataForDialog?.value || null,
    currencyCode: dataForDialog?.currencyCode || null,
  };
};


export const useDefaultFees = (): IFees => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IFees | null;
  };

  return {
    name: dataForDialog?.name || "",
    startDate: dataForDialog?.startDate || "2024-01-01",
    endDate: dataForDialog?.endDate || null,
    payrollOperationFrequency: dataForDialog?.payrollOperationFrequency || "",
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    value: dataForDialog?.value || null,
    currencyCode: dataForDialog?.currencyCode || null,
  };
};

export const useDefaultJobInfo = (): IJobInfo => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IJobInfo | null;
  };

  return {
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    jobTitle: dataForDialog?.jobTitle || "",
    effectiveDate: dataForDialog?.effectiveDate || "2024-01-01",
    department: dataForDialog?.department || null,
    location: dataForDialog?.location || null,
    division: dataForDialog?.division || null,
    reportsTo: dataForDialog?.reportsTo || null,
  };
};


export const useDefaultBonuses = (): IBonuses => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IBonuses | null;
  };

  return {
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    amount: dataForDialog?.amount || 0,
    effectiveDate: dataForDialog?.effectiveDate || "2024-01-01",
    currencyCode: dataForDialog?.currencyCode || "",
    reason: dataForDialog?.reason || null,
    comment: dataForDialog?.comment || null,
  };
};




export const useDefaultDepositAccounts = (): IDepositAccounts => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IDepositAccounts | null;
  };

  return {
    orderNumber: dataForDialog?.orderNumber || null,
    bank: dataForDialog?.bank || null,
    accountName: dataForDialog?.accountName || null,
    accountNumber: dataForDialog?.accountNumber || null,
    currencyCode: dataForDialog?.currencyCode || null,
    accountType: dataForDialog?.accountType || null,
    transitNumber: dataForDialog?.transitNumber || null,
    depositAmount: dataForDialog?.depositAmount || null,
    description: dataForDialog?.description || null,
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    isPercentValue: dataForDialog?.isPercentValue || false,
  };
};

export const useDefaultOtherDeduction = (): IOtherDeduction => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IOtherDeduction | null;
  };

  return {
    name: dataForDialog?.name || '',
    startDate: dataForDialog?.startDate || "2024-01-01",
    endDate: dataForDialog?.endDate || '',
    payrollOperationFrequency: dataForDialog?.payrollOperationFrequency || '',
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || '',
    isActive: dataForDialog?.isActive || false,
    comment: dataForDialog?.comment || null,
    componentType: dataForDialog?.componentType || 0,
  }
};






export const useDefaultLoanSalaryAdvance = (): ILoanOrSalaryAdvance => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ILoanOrSalaryAdvance | null;
  };

  return {
    name: dataForDialog?.name || '',
    startDate: dataForDialog?.startDate || "2024-01-01",
    endDate: dataForDialog?.endDate || '',
    payrollOperationFrequency: dataForDialog?.payrollOperationFrequency || '',
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || '',
    isActive: dataForDialog?.isActive || false,
    comment: dataForDialog?.comment || null,
    componentType: dataForDialog?.componentType || 0,
  }
};





export const useDefaultEmploymentStatus = (): IEmploymentStatus => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmploymentStatus | null;
  };

  return {
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    employmentStatus: dataForDialog?.employmentStatus || "",
    effectiveDate: dataForDialog?.effectiveDate || "2024-01-01",
    comment: dataForDialog?.comment || null,
  };
};

export const useDefaultSalary = (): ISalary => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ISalary | null;
  };

  return {
    customBambooTableRowId: dataForDialog?.customBambooTableRowId || 0,
    salaryRate: dataForDialog?.salaryRate || 0,
    effectiveDate: dataForDialog?.effectiveDate || "2024-01-01",
    salaryCurrencyCode: dataForDialog?.salaryCurrencyCode || "",
    salaryRatePeriod: dataForDialog?.salaryRatePeriod || "PerMonth",
    payPeriod: dataForDialog?.payPeriod || "Monthly",
    allowOvertime: dataForDialog?.allowOvertime || false,
    changeReason: dataForDialog?.changeReason || null,
    comment: dataForDialog?.comment || null,
    overtimeRate: dataForDialog?.overtimeRate || null,
  };
};
