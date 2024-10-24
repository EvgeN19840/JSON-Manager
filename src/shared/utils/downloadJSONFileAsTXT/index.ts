// ** Types
import { ITypeJSON } from "@/const/types";

export const downloadJSONFileAsTXT = (filename: string, data: ITypeJSON) => {
    const jsonStr = JSON.stringify(data);

    const blob = new Blob([jsonStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.txt`;

    document.body.appendChild(link);  // added link in DOM
    link.click();


    document.body.removeChild(link);  // delete <a>


    URL.revokeObjectURL(url);   //delete url blob
};
