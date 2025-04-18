// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { addressType } from "./types";
import { v4 as uuidv4 } from "uuid";
import { IFormInput } from "@/app/mortgage/calculator/components";

interface InterestPerMonCalculatorInter {
  assetValue: number;
  downPayment: number;
  years: number;
  interest: number;
  advanceOption: IFormInput;
}

export const numberToK = (price: number) => {
  function rnd(n: any, precision: any) {
    const prec = 10 ** precision;
    return round(n * prec) / prec;
  }
  const floor = Math.floor,
    abs = Math.abs,
    log = Math.log,
    round = Math.round,
    min = Math.min;
  const abbrev = ["k", "M", "B"];
  let base = floor(log(abs(price)) / log(1000));
  const suffix = abbrev[min(abbrev.length - 1, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? rnd(price / 1000 ** base, 0) + suffix : "" + price;
};

export const numberToNumeralSystem = (price: number): string => {
  if (typeof price !== "number") return "";
  return new Intl.NumberFormat().format(price);
};

export const numberToDollars = (price: number): string => {
  const priceInString = numberToNumeralSystem(price);

  return `$${priceInString}`;
};

export const numberToCompactDollarString = (price: number): string => {
  if (typeof price !== "number") return "-";

  // const priceInString = new Intl.NumberFormat('en-US', {
  //   notation: 'compact',
  //   maximumFractionDigits: 1,
  // }).format(price)

  // return priceInString

  // function abbreviateNumber(value) {
  //   let newValue = value
  //   if (value >= 1000) {
  //     const suffixes = ['', 'k', 'm', 'b', 't']
  //     const suffixNum = Math.floor(('' + value).length / 3)
  //     let shortValue = ''
  //     for (let precision = 2; precision >= 1; precision--) {
  //       shortValue = parseFloat(
  //         (suffixNum != 0
  //           ? value / Math.pow(1000, suffixNum)
  //           : value
  //         ).toPrecision(precision)
  //       )
  //       const dotLessShortValue = (shortValue + '').replace(
  //         /[^a-zA-Z 0-9]+/g,
  //         ''
  //       )
  //       if (dotLessShortValue.length <= 2) {
  //         break
  //       }
  //     }
  //     if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
  //     newValue = shortValue + suffixes[suffixNum]
  //   }
  //   return newValue
  // }

  // return abbreviateNumber(price)

  // const n = price
  // if (n < 1e3) return n + ''
  // if (n >= 1e3) return +(n / 1e3).toFixed(1) + 'K'
  // if (n < 1e3) return n + ''
  // if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  // if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  // if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  // if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'

  // return '-'

  //@ts-expect-error ignore
  function abbreviate_number(num, fixed) {
    if (num === null) {
      return null;
    } // terminate early
    if (num === 0) {
      return "0";
    } // terminate early
    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
    const b = num.toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ["", "K", "M", "B", "T"][k]; // append power
    return e;
  }

  return abbreviate_number(price, 0) + "";
};

export const getAddressString = (address: addressType): string => {
  return `${
    address?.street ? address?.street + "," : "Undisclosed Location,"
  } ${address?.city ? address?.city + "," : ""} ${
    address?.state ? address?.state + "," : ""
  } ${address?.zip ?? ""}`;
};

export const getStringValue = (
  value: number | string,
  label: string
): string => {
  return `${value ? value : "-"} ${label ?? ""}`;
};

export const removeDashAddSpace = (str: string) => str?.split("-").join(" ");
export const removeUnderscoreAddSpace = (str: string) =>
  str.replace(/_/gi, " ");
export const getNumberValue = (str: string) => parseInt(str);

//@ts-expect-error ignore
export const getParamStringFromObject = (paramQuery, noReverse = false) => {
  if (noReverse)
    return new URLSearchParams(
      //@ts-expect-error ignore
      [...Object.entries(paramQuery)]
    ).toString();
  return new URLSearchParams(
    //@ts-expect-error ignore
    [...Object.entries(paramQuery)].reverse()
  ).toString();
};

export const amtPercentageCaluclator = (amt: number, intAmt: number) => {
  return ((intAmt / amt) * 100).toFixed(1);
};

export const amtPercentageCaluclator2 = (amt: number, intAmt: number) => {
  const cal = ((intAmt / amt) * 100).toFixed(1);
  //@ts-expect-error ignore
  return isNaN(cal) ? "0" : cal;
};

export const percentageAmtCaluclator = (amt: number, percen: number) => {
  return (percen / 100) * amt;
};

export const homeEquaityCalculator = (
  homeSalePrice: number,
  outStanding: number,
  otherSellingCost: number
) => {
  const homeEquality = homeSalePrice - outStanding - otherSellingCost;
  return homeEquality - percentageAmtCaluclator(homeEquality, 3);
};

export const interestPerMonCalculator = (
  values: InterestPerMonCalculatorInter
) => {
  const { assetValue, downPayment, years, interest } = values;
  const L = assetValue > downPayment ? assetValue - downPayment : 0;
  const annualInterestRate = interest / 100;
  const n = years * 12;

  const c = annualInterestRate / 12;

  const numerator = L * c * Math.pow(1 + c, n);
  const denominator = Math.pow(1 + c, n) - 1;

  const P = numerator / denominator;

  const propertyTax = parseInt(values.advanceOption.property_taxes) / 12;

  const homeInsurance = parseInt(values.advanceOption.home_insurance) / 12;

  const mortageInsurance = parseInt(values.advanceOption.PMI) / 12;

  const totalInterestPerMonth =
    P +
    propertyTax +
    homeInsurance +
    parseInt(values.advanceOption.hoa) +
    mortageInsurance;

  const obj = {
    title: `${numberToDollars(Math.ceil(totalInterestPerMonth))} per month`,
    subTitle: `${years}-year fixed, ${interest}% Interest`,
    data: [
      {
        id: uuidv4(),
        text: "Principal and Interest",
        cost: P ? `${numberToDollars(Math.ceil(P))}` : "$0",
        percentage: P
          ? `${amtPercentageCaluclator(totalInterestPerMonth, P)}%`
          : "0%",
        info: `The monthly payments on your home loan to your mortgage lender. Based on your loan size and interest rate. Interest rates vary based on lender and credit score.`,
      },
      {
        id: uuidv4(),
        text: "Property Taxes",
        cost: `${numberToDollars(Math.ceil(propertyTax))}`,
        percentage: propertyTax
          ? `${amtPercentageCaluclator(totalInterestPerMonth, propertyTax)}%`
          : "0%",
        info: `This tax is a percentage of a home’s assessed value and varies by area. Homeowners pay this tax annually, semi-annually, or as part of a monthly mortgage payment.`,
      },
      {
        id: uuidv4(),
        text: "Homeowners Insurance",
        cost: `${numberToDollars(Math.ceil(homeInsurance))}`,
        percentage: homeInsurance
          ? `${amtPercentageCaluclator(totalInterestPerMonth, homeInsurance)}%`
          : "0%",
        info: `Based on average insurance costs nationally.
        Home buyers should purchase insurance when they apply for a mortgage loan to guard against potential damages to their future home. Compare quotes with Policygenius.`,
      },
    ],
  };

  parseInt(values.advanceOption.hoa) &&
    obj.data.push({
      id: uuidv4(),
      text: "HOA Dues",
      cost: `$${parseInt(values.advanceOption.hoa).toFixed(0)}`,
      percentage: `${amtPercentageCaluclator(
        totalInterestPerMonth,
        parseInt(values.advanceOption.hoa)
      )}%`,
      info: `Fees paid by homeowners within a shared complex to pay for building repairs and operation costs.`,
    });
  parseInt(values.advanceOption.PMI) &&
    obj.data.push({
      id: uuidv4(),
      text: "Mortgage Insurance",
      cost: `$${mortageInsurance.toFixed(0)}`,
      percentage: `${amtPercentageCaluclator(
        totalInterestPerMonth,
        mortageInsurance
      )}%`,
      info: `The average homeowners insurance rate in Illinois is 0.44%. Home buyers should purchase insurance when they apply for a mortgage loan to guard against potential damages to their future home. Compare quotes with Policygenius.`,
    });
  return obj;
};

export function unixToRelativeTime(timestamp: number) {
  const currentTimestamp = Date.now();
  const postTimestamp = timestamp * 1000;

  const timePassedInMilliseconds = currentTimestamp - postTimestamp;
  const millsecInOneSec = 1000;
  const millsecInOneMinute = 60 * millsecInOneSec;
  const millsecInOneHour = 60 * millsecInOneMinute;
  const millsecInOneDay = 24 * millsecInOneHour;

  let unitsOfTimePassed;

  const daysPassed = timePassedInMilliseconds / millsecInOneDay;
  const hoursPassed = timePassedInMilliseconds / millsecInOneHour;
  const minPassed = timePassedInMilliseconds / millsecInOneMinute;
  const secPassed = timePassedInMilliseconds / millsecInOneSec;

  const unitTypes = ["day", "hrs", "min", "sec"];
  let displayUnitType;

  if (daysPassed > 1) {
    unitsOfTimePassed = Math.floor(daysPassed);
    displayUnitType = unitTypes[0];
    //Math.floor() so that it does not show 1.x days , we want non-decimal value for time passed
  } else if (hoursPassed > 1) {
    unitsOfTimePassed = Math.floor(hoursPassed);
    displayUnitType = unitTypes[1];
  } else if (minPassed > 1) {
    unitsOfTimePassed = Math.floor(minPassed);
    displayUnitType = unitTypes[2];
  } else {
    unitsOfTimePassed = Math.floor(secPassed);
    displayUnitType = unitTypes[3];
  }
  return `${unitsOfTimePassed} ${displayUnitType} `;
}

export const getPricePerSqft = (totalPrice: number, totalSqft: number) => {
  if (!totalPrice || !totalSqft) return null;
  return "$" + Math.floor(totalPrice / totalSqft) + " per sq ft";
};

export const unixToDate = (UNIX_timestamp: number) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

export const processDateString = (x: string) => {
  if (!x) {
    return "";
  }

  const MONTHS = [
    "Jan",
    "Mon",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(x);
  const year = date.getFullYear();
  const day = date.getDate();
  const monthindex = date.getMonth() + 1;
  // Eg:  'Sep 4 2023'
  return MONTHS[monthindex] + " " + day + " " + year;
};
export const unixToCompactDate = (unix: number) => {
  if (!unix) return "";
  const date = unixToDate(unix);
  return processDateString(date);
};

export const getRelativeUnixDays = (daysfromnow: number) => {
  if (!daysfromnow) return "";
  const currentDate = new Date();
  const daysAgo = new Date(
    currentDate.getTime() - daysfromnow * 24 * 60 * 60 * 1000
  ); // subtracting days in milliseconds
  const unixTime = Math.floor(daysAgo.getTime() / 1000); // convert to unix time
  return unixTime;
};

export const isValidPostalCode = (postalCode: string) => {
  const postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;

  return postalCodeRegex.test(postalCode);
};

export const getacresvalue = (sqftoracrestring: string | null) => {
  if (sqftoracrestring === null || sqftoracrestring === undefined) return null;

  const sqft_regex = new RegExp("sq", "gi");
  const acre_regex = new RegExp("acre", "gi");

  const is_sqft = sqft_regex.test(sqftoracrestring);
  const is_acre = acre_regex.test(sqftoracrestring);

  let val;
  if (is_sqft) {
    const index_of_space = sqftoracrestring.indexOf("s") - 1;
    const sqft_string = sqftoracrestring.slice(0, index_of_space);
    const sqft_num = parseInt(sqft_string, 10);
    const acre = sqft_num / 43560;
    val = acre.toFixed(3);
  }
  if (is_acre) {
    const index_of_space = sqftoracrestring.indexOf("a") - 1;
    val = sqftoracrestring.slice(0, index_of_space);
  }
  return val;
};

export const isDayInFuture = (date: string | number) => {
  if (typeof date === "number") {
    // check if the date is in unix format
    return date * 1000 > Date.now();
  }
  // Create two date objects
  const today = new Date();
  const givenDate = new Date(date);

  const isFutureDate = givenDate.getTime() > today.getTime();

  return isFutureDate;
};

export const is_uri_encoded = (str: string) => {
  const decodedStr = decodeURIComponent(str);
  return decodedStr !== str;
};

export const homeAffordabilityCalculator = (
  dataObj: any,
  debtToIncomeRatio: any
) => {
  const {
    PMI,
    downPayment,
    mortgage_loan_type,
    homeEquality,
    home_insurance,
    monthlyDebt,
    mortgage_interest_rate,
    netIncome,
  } = dataObj;
  let mortgage_months = 0;
  if (mortgage_loan_type == "30 years fixed") {
    mortgage_months = 30;
  } else {
    mortgage_months = 15;
  }
  const monthlyNetIncome = netIncome / 12;
  const maxMonthlyDebtPayment = percentageAmtCaluclator(
    monthlyNetIncome,
    debtToIncomeRatio
  );
  const availableMonthlyIncome = maxMonthlyDebtPayment - monthlyDebt;
  const annualInterestRate = mortgage_interest_rate / 100;
  const n = mortgage_months * 12;

  const c = annualInterestRate / 12;
  const numerator = c * Math.pow(1 + c, n);
  const denominator = Math.pow(1 + c, n) - 1;
  const anotherDen = numerator / denominator;
  const loanAmount = availableMonthlyIncome / anotherDen;
  const HomePrice = loanAmount + downPayment;
  const proprtyTax = percentageAmtCaluclator(HomePrice, 1) / 12;
  const homeInsurance = percentageAmtCaluclator(HomePrice, home_insurance) / 12;
  const pmiMonthly = percentageAmtCaluclator(loanAmount, PMI) / 12;
  const monthlyMortgagePayment =
    availableMonthlyIncome - proprtyTax - homeInsurance - pmiMonthly;
  const actualLoanAmount = monthlyMortgagePayment / anotherDen;
  const affordabilityAmount =
    actualLoanAmount + downPayment + parseInt(homeEquality);
  const summaryContent = {
    title:
      actualLoanAmount > 0
        ? numberToDollars(parseInt(affordabilityAmount))
        : numberToDollars(downPayment + parseInt(homeEquality)),
    subTitle: "Estimated Net Proceeds",
    data: [
      {
        id: uuidv4(),
        text: "Monthly payment",
        cost:
          monthlyMortgagePayment > 0
            ? numberToDollars(monthlyMortgagePayment)
            : "$ _,_ _ _",
      },
      {
        id: uuidv4(),
        text: "Down payment",
        cost:
          actualLoanAmount > 0
            ? parseFloat(
                amtPercentageCaluclator(affordabilityAmount, downPayment)
              ) + "%"
            : "100%",
      },
    ],
  };
  return summaryContent;
};

export const getPropertyPriceDefaults = (is_rental: boolean) => {
  return {
    min: is_rental ? 200 : 50000,
    max: is_rental ? 5000 : 5000000,
    steps: is_rental ? 100 : 25000,
  };
};

export const convertTime12to24 = (time12h = "") => {
  const [time, modifier] = time12h.split(" ");

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    //@ts-expect-error ignore
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const convertTime24to12 = (time: any) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    time[3] = "";
  }
  return time.join(""); // return adjusted time or original string
};

export const homeSaleCalculator = (data: any) => {
  const {
    home_sale_price,
    outstanding_mortgage,
    closing_agent_fee,
    closing_cost,
    selling_concession,
    home_prep,
    moving_term,
  } = data;
  const homeSaleValue =
    home_sale_price -
    outstanding_mortgage -
    (closing_agent_fee +
      closing_cost +
      selling_concession +
      home_prep +
      moving_term);
  const calData = {
    title: numberToDollars(homeSaleValue),
    subTitle: "Estimated Net Proceeds",
    data: [
      {
        id: uuidv4(),
        text: "Home Sale Price",
        cost: numberToDollars(home_sale_price),
        percentage: "67.9%",
      },
      {
        id: uuidv4(),
        text: "Outstanding Mortgage",
        cost: numberToDollars(outstanding_mortgage),
        percentage: "12.1%",
      },
      {
        id: uuidv4(),
        text: "Fees & Misc. Costs",
        cost: numberToDollars(
          closing_agent_fee +
            closing_cost +
            selling_concession +
            home_prep +
            moving_term
        ),
        percentage: "20%",
      },
    ],
  };
  return calData;
};
