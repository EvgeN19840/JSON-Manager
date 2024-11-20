import { useModal } from "@/hooks/useModal";
import { IEmployeeBenefit } from "@/const/types";

export const useDefaultValues = (): IEmployeeBenefit => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
  };
  return  {
    name: dataForDialog?.name || '',
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || '',
    companyValue: dataForDialog?.companyValue || 0,
    companyCurrencyCode: dataForDialog?.companyCurrencyCode || '',
    isPerentValue: dataForDialog?.isPerentValue || false,
    effectiveDate: dataForDialog?.effectiveDate || "",
    id: dataForDialog?.id || '',
  };
};
