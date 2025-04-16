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

  return msg
}
export function getFirstErrorMessageCms(
  errorObject: unknown
): string | undefined {
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
      const newPath = [...currentPath, key]
      // @ts-ignore
      const value = obj[key]
      if (
        typeof value === 'string' &&
        value.trim().length > 0 &&
        key === 'message'
      ) {
        // Check if value might be an error message
        return `Error: ${value}`
      } else if (typeof value === 'object' && value !== null) {
        const nestedError = traverseForError(value, newPath)
        if (nestedError) {
          return nestedError
        }
      }
    }
    return undefined
  }

  return traverseForError(errorObject)
}
export function validateName(value: any) {
  const namePattern = /^[a-zA-Z][a-zA-Z\s-_]*[a-zA-Z]$/

  if (
    !namePattern.test(value) ||
    value.startsWith('-') ||
    value.startsWith('_') ||
    value.endsWith('-') ||
    value.endsWith('_')
  ) {
    return 'Name must include only letters, spaces, - or _.'
  }
}
export const removeSpecialChars = (phoneNumber) => {
  return phoneNumber?.replace(/[^\d]/g, '')
}
export const addSpecialCharsForPhoneNumber = (phoneNumber) => {
  if (phoneNumber?.startsWith('+')) {
    return phoneNumber
      ?.substr(2)
      ?.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
  }
  return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
}
export function addCommas(str: any) {
  if (!str && str !== 0) return 'N/A'
  const parts = str?.split('.')
  const integerPart = parts?.[0]
  const decimalPart = parts?.length > 1 ? '.' + parts[1] : ''

  const formattedIntegerPart = integerPart?.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  )

  return formattedIntegerPart + decimalPart
}
export const extractIdentities = (data) => {
  // Map the "identity" values to a new array
  const identities = data?.map((item) => item?.identity || item)

  // Join the identities into a comma-separated string
  return identities?.join(', ')
}
export const getResponse = (data: any) => {
  if (data === null) {
    return [] // Return an empty array if input is null
  }

  const newArray = data?.map((item: any) => ({
    label: item?.identity || item?.name,
    value: item?.id,
    identity: item?.identity || item?.name,
    id: item?.id,
  }))

  return newArray
}
export const checkBoxDummyData = [
  {
    title: 'Join the ROA Community',
    description:
      'Powered by Workvivo. Join the ROA Community — an agent experience platform designed to enhance communication, collaboration, and engagement between peers and state groups. To join download the Workvivo app or log in here:',
    link: 'https://roa.workvivo.us',
    checked: false,
    id: null,
  },
  {
    title: 'Login to Skyslope',
    description:
      'Your Real Estate Forms & Signing Solution designed to streamline collaboration and accelerate workflows, Skyslope Forms centralizes and consolidates compliance, document libraries, form editing and e-signatures into one easy-to-use tool. Initiate real estate contracts quickly & professionally. Click here to log in:',
    link: 'https://app.skyslope.com',
    checked: false,
    id: null,
  },
  {
    title: 'Join Cloze CRM',
    description:
      'Cloze is your "personal assistant in your pocket" providing a relationship management platform that automatically tracks your emails, phone calls, text, meetings, notes, and social media interactions while providing insight to AI based nurturing opportunities. Click here to log in:',
    link: 'https://www.cloze.com/in/',
    checked: false,
    id: null,
  },
  {
    title: 'Set up Learning @ROA',
    description:
      'COMING SOON! Launch your learning journey with ROA. Powered by Continu, our training-on-demand learning system offers a solution for agents and brokers to access our learning programs in a single, streamlined platform. ',
    link: '',
    checked: false,
    id: null,
  },
  {
    title: 'Set up Lead Management',
    description:
      'COMING SOON! Nurture & ReDiscover LEADS through RealScout. RealScout is a real estate platform designed to enhance the home search experience for both agents and their clients',
    link: '',
    checked: false,
    id: null,
  },
  // {
  //   title: 'Forms/Signing',
  //   description:
  //     'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odioKorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  //   link: 'Select Here',
  //   checked: false,
  //   id: null,
  // },
]
export const getDateFormat = (dateString: any) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Determine the ordinal suffix for the day
  const ordinalSuffix = (n: any) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }

  return `${day}${ordinalSuffix(day)} ${month} ${year}`
}
export const getInputOptions = (val: string, valToRemove?: string[]) => {
  let valArray = val?.split(';')
  if (valToRemove?.[0])
    valArray = valArray?.filter((f) => !valToRemove?.includes(f))
  const options: any = []
  valArray?.map((item: any) => {
    options.push({
      identity: item.replaceAll('_', ' '),
      id: item,
    })
  })
  return options
}
export const getResponseBasedOnInputType = (inputType: any, data: any) => {
  if (
    inputType == 'primary_phone_number' ||
    inputType == 'alternate_phone_number' ||
    inputType == 'emergency_contact_phone_number'
  ) {
    if (data?.response?.response?.startsWith('+1')) {
      return {
        response: data?.response?.response
          ?.substr(2)
          ?.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3'),
      }
    } else {
      return {
        response: data?.response?.response?.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '($1)-$2-$3'
        ),
      }
    }
  }
  if (inputType == 'select' && data?.response) {
    if (typeof data?.response?.response === 'string')
      return {
        response: data?.response?.response
          ? {
              label: data?.response?.response?.replaceAll('_', ' '),
              value: data?.response?.response,
              id: data?.response?.response,
              identity: data?.response?.response,
            }
          : null,
      }
    else return { response: data?.response?.response }
  }
  if (inputType == 'multi-select' || inputType == 'checkbox') {
    if (typeof data?.response?.response === 'string') {
      const responseArray = data?.response?.split(';')
      const multiSelectResponse = <any>[]
      responseArray?.map((each: any) => {
        if (typeof each == 'string')
          multiSelectResponse.push({
            label: getInputOptions(each),
            value: each,
            id: each,
            identity: each,
          })
        console.log('res', multiSelectResponse)
      })
    } else return { response: data?.response?.response }
    // return multiSelectResponse
    return null
  }
  return data?.response
}
export const formatDateTime = (datetimeStr: string) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const dt = new Date(datetimeStr)
  return dt.toLocaleDateString('en-US', options)
}
export function upperToLowercaseInString(str: string) {
  return str?.replace(
    /\b[A-Z]+\b/g,
    (word) => word[0] + word.slice(1).toLowerCase()
  )
}
export function getNextMonthText(dateString) {
  return moment(dateString, 'YYYY-MM-DD').add(1, 'month').format('MMMM')
}
export function transformSelectData(item) {
  if (!item || typeof item !== 'object') return null

  const id = item?.id ?? ''
  const identity = item?.identity ?? ''

  return {
    id,
    identity,
    label: identity,
    value: id,
  }
}
export function formatDate(isoString) {
  const date = new Date(isoString)
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}
export function formatDateWithMonth(isoString) {
  const date = new Date(isoString)
  const options = { year: 'numeric', month: 'short', day: '2-digit' }
  return date.toLocaleDateString('en-US', options)
}
export const closedValueOptions = [
  { label: '< $1 Million', value: '< $1 Million' },
  { label: '$1 Million - $2 Million', value: '$1 Million - $2 Million' },
  { label: '$2 Million - $5 Million', value: '$2 Million - $5 Million' },
  { label: '$5 Million', value: '$5 Million' },
]