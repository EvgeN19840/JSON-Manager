import { useModal } from "@/hooks/useModal";
import { IEmployeeBasicInfo } from "@/const/types";

export const useDefaultValues = (): IEmployeeBasicInfo => {
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
    healthInsuranceMemberNumber:
      dataForDialog?.healthInsuranceMemberNumber || "",
    lifeInsuranceMemberNumber: dataForDialog?.lifeInsuranceMemberNumber || "",
    transferEmployeeStatutoryToVoluntaryOnCap:
      dataForDialog?.transferEmployeeStatutoryToVoluntaryOnCap || false,
    transferCompanyStatutoryToVoluntaryOnCap:
      dataForDialog?.transferCompanyStatutoryToVoluntaryOnCap || false,
  };
};
