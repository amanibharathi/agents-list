/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck ignore
import { toast } from "react-hot-toast";
import { UseFormSetError } from "react-hook-form";

export const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, "");

  // Format as (###) ###-####
  if (cleaned.length <= 3) return `(${cleaned}`;
  if (cleaned.length <= 6)
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
};

export const convertToE164 = (phone: string) => {
  // Remove non-numeric characters and ensure it's 10 digits
  const cleaned = phone?.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  return phone; // Return original if it doesn't match 10 digits
};

export const convertToFormatted = (phone: string) => {
  // Remove non-numeric characters
  const cleaned = phone?.replace(/\D/g, "");

  // Remove the +1 if present
  const number = cleaned?.startsWith("1") ? cleaned?.slice(1) : cleaned;

  // Format as (###) ###-####
  if (number.length <= 3) return `(${number}`;
  if (number.length <= 6) return `(${number?.slice(0, 3)}) ${number?.slice(3)}`;
  return `(${number?.slice(0, 3)}) ${number?.slice(3, 6)}-${number?.slice(
    6,
    10
  )}`;
};

type ErrorResponse = {
  data: Record<string, string[]>;
  status: string;
  action_code: string;
};

// Function to set field errors in React Hook Form
export const setFormErrors = (
  errorResponse: ErrorResponse,
  setError: UseFormSetError<unknown>
) => {
  const extractErrors = (fieldPath: string, value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.entries(item).forEach(([nestedField, messages]) => {
            extractErrors(`${fieldPath}.${index}.${nestedField}`, messages);
          });
        } else if (typeof item === "string") {
          setError(fieldPath, { type: "server", message: item });
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([nestedField, messages]) => {
        extractErrors(`${fieldPath}.${nestedField}`, messages);
      });
    } else if (typeof value === "string") {
      setError(fieldPath, { type: "server", message: value });
    }
  };

  Object.entries(errorResponse.data).forEach(([field, value]) => {
    extractErrors(field, value);
  });
};

// Function to show the first error in toast
export const showToastError = (errorResponse: ErrorResponse) => {
  const findFirstError = (value: unknown): string | null => {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          const foundError = findFirstError(item);
          if (foundError) return foundError;
        }
      }
    } else if (typeof value === "object" && value !== null) {
      for (const messages of Object.values(value)) {
        const foundError = findFirstError(messages);
        if (foundError) return foundError;
      }
    } else if (typeof value === "string") {
      return value;
    }
    return null;
  };

  for (const value of Object.values(errorResponse.data)) {
    const message = findFirstError(value);
    if (message) {
      toast.error(message);
      return;
    }
  }
};

export const getTodayDate = () => new Date().toISOString().split("T")[0];

export const setStringAsSelectValue = (val: string) => ({
  label: val ?? "",
  value: val ?? "",
});

export const setSelectValueFromOptions = (
  value: string,
  options: { label: string; value: string; identity: string; id: string }[],
  isMulti?: boolean = false
) => {
  const filteredOpt = options.filter((o) => o.value === value);
  if (!filteredOpt.length) return null;
  if (isMulti) {
    return filteredOpt;
  } else {
    return filteredOpt?.[0];
  }
};
export const debouncerTimeAdmin = 200;
export function truncateString(
  str: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (str?.length <= maxLength) return str;
  return str?.slice(0, maxLength - suffix?.length) + suffix;
}
export const splitByDotgetOne = (val, data) => {
  if (val.includes(".")) {
    const splitedHead = val?.split(".");
    // console.log("chk",data,  [splitedHead?.[0]], [splitedHead?.[1]])
    return data?.[splitedHead?.[1]];
  }
  // console.log("data", data);
  return data?.[val];
};
export function getFirstErrorMessage(errorObject: unknown): string | undefined {
  // const getNestedValue = (obj: any, path: string[]): any => {
  //   let current = obj
  //   for (const key of path) {
  //     current = current[key]
  //     if (current === undefined) {
  //       return undefined
  //     }
  //   }
  //   return current
  // }

  const traverseForError = (
    // @ts-ignore
    obj: unknown,
    currentPath: string[] = []
  ): string | undefined => {
    // @ts-ignore
    for (const key in obj) {
      const newPath = [...currentPath, key];
      // @ts-ignore
      const value = obj[key];
      if (typeof value === "string" && value.trim().length > 0) {
        // Check if value might be an error message
        return `${newPath.join(".")}: ${value}`;
      } else if (typeof value === "object" && value !== null) {
        const nestedError = traverseForError(value, newPath);
        if (nestedError) {
          return nestedError;
        }
      }
    }
    return undefined;
  };

  return traverseForError(errorObject);
}
export const commissionPlanOptions = [
  { label: "60-40 Split", value: "60-40" },
  { label: "85-15 Split", value: "85-15" },
];
export const splitByDotGetMany = (val, data) => {
  if (val?.includes(".")) {
    let _val = { ...data };
    const splitedVal = val?.split(".");
    if (splitedVal?.length == 4)
      return data?.[splitedVal?.[1]]?.[splitedVal?.[2]]?.[splitedVal?.[3]];
    if (splitedVal?.length == 3)
      return data?.[splitedVal?.[1]]?.[splitedVal?.[2]];
    else {
      splitedVal?.map((m) => (_val = _val?.[m]));
      return _val;
    }
  } else {
    return data?.[val];
  }
};
export const getFileUploadErrorMsg = (err: any) => {
  let data = err?.response?.data;
  while (true) {
    if (typeof data === "string") break;
    if (Array.isArray(data)) data = data[0];
    if (typeof data === "object") data = data[Object.keys(data)[0]];
  }
  return data;
};
export const getFileName = (src, isShortName = false) => {
  const s = src?.split("/");
  const last = s?.[s?.length - 1];
  const ext = last?.split(".");
  const extLast = ext?.[ext?.length - 1];
  if (isShortName)
    return last?.length > 10 ? last?.slice(0, 10) + "..." + extLast : last;
  return last;
};
export const downloadFile = async (url: string, filename?: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectURL;
    link.download = filename || url.split("/").pop() || "download";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectURL); // Cleanup
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const formatToUSPhone = (input: string) => {
  if (input === "undefined" || input === undefined) {
    return "NA";
  } else {
    return `+1 ` + input?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
};
export const isEmailValid = (val) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(val);
};
export const logMe = (...args) => {
  // const isStaging = !['production', 'uat']?.includes(
  //   process.env.NEXT_PUBLIC_NODE_ENV
  // )
  if (true) console.log(...args);
};
export const getErrorMsg = (obj: any) => {
  const err = obj?.response?.data?.data;
  if ([null, undefined]?.includes(err)) return "";
  if (typeof err === "string") return err;
  const firstErrorKey = Object?.keys(err)?.[0];
  const msg = `${err?.[firstErrorKey]}`;

  return msg;
};

export const removeSpecialChars = (phoneNumber) => {
  return phoneNumber?.replace(/[^\d]/g, "");
};

export function validateName(value: any) {
  const namePattern = /^[a-zA-Z][a-zA-Z\s-_]*[a-zA-Z]$/;

  if (
    !namePattern.test(value) ||
    value.startsWith("-") ||
    value.startsWith("_") ||
    value.endsWith("-") ||
    value.endsWith("_")
  ) {
    return "Name must include only letters, spaces, - or _.";
  }
}
