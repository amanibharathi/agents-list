/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckboxGroupProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  SystemStyleObject,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";

export interface inputOptions extends AppInputProps {
  labelWrapperClassName?: string;
  radioStyles?: SystemStyleObject | undefined;
  checkboxStyles?: SystemStyleObject | undefined;
  radioOptionsWrapperStyles?: SystemStyleObject | undefined;
  formControlClassName?: string;
  customBottomContent?: ReactNode;
  isLoading?: boolean;
  onInputChange?: (val: string) => void;
  isCreatable?: boolean;
  checkboxOptionsLableStyles?: SystemStyleObject | undefined;
  onCreateOption?: (e: React.ChangeEvent) => void;
  handleUpload?: (file: any) => void;
}

export interface InputObj {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  otherRegProps?: RegisterOptions<FieldValues, string> | undefined;
  inputOptions?: inputOptions;
  labelStyles?: SystemStyleObject | undefined;
  labelWrapperStyles?: SystemStyleObject | undefined;
  bottomDesc?: string | ReactNode;
  bottomDescStyles?: SystemStyleObject | undefined;
  inputStyles?: SystemStyleObject | undefined;
  options?: { value: string | number; label: string; desc?: ReactNode }[];
  imageState?: any;
  setImageState?: any;
  // types for the agent tools
  //TODO: Remove these
  title?: string;
  image?: any;
  desc?: string;
  price?: number;
  linkMessage?: string;
  linkTag?: string;
  width?: string;
  comp?: ReactNode;
}

export interface AppInputPickerProps {
  inputObj: InputObj;
  labelClassName?: string;
  labelWrapperClassName?: string;
  control?: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  noStarSymbol?: boolean;
  errors?: unknown;
  labelStyles?: SystemStyleObject | undefined;
  labelWrapperStyles?: SystemStyleObject | undefined;
  bottomDesc?: string | ReactNode;
  bottomDescStyles?: SystemStyleObject | undefined;
}

export interface AppInputProps extends InputProps {
  readonly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  error?: { message?: string } | unknown;
  formMessage?: string;
  formControlClassName?: string;
  variant?: string;
  size?: string;
  prefixContent?: React.ReactNode;
  suffixContent?: React.ReactNode;
  prefixClassName?: string;
  suffixClassName?: string;
  inputInputGroupClassName?: string;
  customPrefix?: React.ReactNode;
  customprefixClassName?: string;
  inputControlClassName?: string;
  errorClassName?: string;
  onKeyDownCapture?: React.KeyboardEventHandler<HTMLInputElement>;
  formControlStyles?: SystemStyleObject | undefined;
  isPassword?: boolean;
  endPoint?: string;
  isMultiple?: boolean;
}

//@ts-expect-error ignore
export interface AppSelectProps extends Partial<SelectProps> {
  name: string;
  value?: OptionType | OptionType[] | null;
  defaultValue?: OptionType | OptionType[];
  control?: Control<FieldValues>;
  onChange?: (value: OptionType | OptionType[] | null) => void;
  onInputChange?: (inputValue: string) => void;
  onFocus?: () => void;
  onCreateOption: () => void;
  isRequired?: boolean;
  readonly?: boolean;
  isDisabled?: boolean;
  variant?: string;
  size?: string;
  isInvalid?: boolean;
  error?: { message?: string } | unknown;
  isLoading?: boolean;
  placeholder?: string;
  formControlClassName?: string;
  selectControlClassName?: string;
  selectPrefixClassName?: string;
  errorClassName?: string;
  formControlStyles?: SystemStyleObject | undefined;
  options?: OptionType[];
  dontAlterOptions?: boolean;
  isMulti?: boolean;
  zIndex?: boolean;
  menuMaxHeight?: number | false;
  isClearable?: boolean;
  CustomOptionFromProps?: unknown;
  customBottomContent?: ReactNode;
}

export interface AppRadioProps extends RadioGroupProps {
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly: boolean;
  isInvalid?: boolean;
  error?: { message?: string } | unknown;
  formControlClassName?: string;
  variant?: string;
  size?: string;
  defaultValue?: string;
  inputControlClassName?: string;
  errorClassName?: string;
  formControlStyles?: SystemStyleObject | undefined;
  radioStyles?: SystemStyleObject | undefined;
  options?: OptionType[];
  control: Control<FieldValues> | undefined;
  radioOptionsWrapperStyles?: SystemStyleObject | undefined;
}

export interface AppCheckboxProps extends CheckboxGroupProps {
  name?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  readonly?: boolean;
  control?: Control<FieldValues>;
  error?: { message?: string } | unknown;
  formControlClassName?: string;
  variant?: string;
  size?: string;
  checkboxStyles?: SystemStyleObject | undefined;
  errorClassName?: string;
  formControlStyles?: SystemStyleObject | undefined;
  options?: OptionType[];
  checkboxOptionsLableStyles?: SystemStyleObject | undefined;
}

export interface AppFileUploadProps {
  name?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  error?: { message?: string } | unknown;
  errorClassName?: string;
  customUiBody?: any;
  fileTypes?: string | string[];
  handleUpload?: any;
  handleRemoveImage?: any;
  imageState?: { file: string; id: string | number }[];
  setImageState?: any;
  maxFileSize?: string;
  maxW?: string;
  endPoint?: string;
  customClassName?: string;
  isMultiple?: boolean;
}

export interface OptionType {
  identity?: string;
  label?: string;
  value?: string | number;
  id?: string | number;
  desc?: ReactNode;
}

export interface IInputList {
  thisWrapperClassName?: string;
  thisWrapperStyles?: SystemStyleObject | undefined;
  render: InputObj[];
}

export interface IMultipartInputList {
  title?: string | ReactNode;
  titleStyles?: SystemStyleObject | undefined;
  descStyles?: SystemStyleObject | undefined;
  desc?: string | undefined;
  inputs: IInputList[];
  reviewTitle?: string;
  route?: string;
}

export interface IMultipartFormContext {
  formUtils: UseFormReturn<FieldValues, unknown, undefined>;
  handleSubmitAppropriateData: () => void;
  isPending: boolean;
  getCurrentStep: () => void;
  inputSectionAndSteps: any;
  goBackStep: () => void;
  AgentDatamutate: () => any;
  AgentToolsdata: any[];
  isAgentToolsSuccess: boolean;
  isAgentToolLoading: boolean;
  setActiveStage: () => any;
  isStageLoading: boolean;
  formLoading: boolean;
  setFormLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IState {
  label: string;
  value: number;
  id: number;
  uuid: string;
  identity: string;
  code: string;
  license_transfer_fee: number | null;
  is_locked: boolean;
  created: string; // ISO date string
}

interface IOptions {
  label: string;
  value: string;
  __isNew__?: boolean;
}

interface License {
  state: IState;
  license_type: IOptions;
  license_no: string;
  expiry_date: string;
  planned_transfer_date: string;
  boards: IOptions[];
  mls: IOptions[];
}

interface ISponsorData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  sponsor?: number | string;
}

interface ITaxInformation {
  taxpayer_id: string;
  taxpayer_id_display: string;
  filer_classification: string;
  identity: string;
  disregarded_entity_name: string;
  tax_classification: { label?: string; value?: string };
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IMultipartFormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  preferred_name: string;
  dob: string;
  current_page: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  zipcode: string;
  state: string;
  ec_email: string;
  ec_name: string;
  ec_relationship: string;
  ec_phone_number: string;
  multiple_license_enabled: string;
  licenses: License[];
  is_license_has_complaint: string;
  is_license_suspended: string;
  suspension_detail: string | null;
  nrds_id: string | null;
  last_12_month_volume: IOptions;
  last_12_month_closed_transaction: IOptions;
  affiliated_brokerage: IOptions;
  provided_service: string[] | IOptions[];
  closed_transaction_type: IOptions[] | null;
  is_transactions_pending: IOptions | null;
  sponsor_data: ISponsorData;
  __isNoSponsorOpened__?: boolean;
  __isNoSponsorSelected__?: boolean;
  is_part_of_team: boolean | string;
  //tax information
  tax_information: ITaxInformation;
  brokrage_engine: string;
  workvivo: string;
  skyslope: string;
  okta: string;
  cloze: string;
  reat_scout: string;
  microsolft365: string;
  //agent tools
  tools: [];
  //roa_email
  roa_email: {
    id: number;
    label: string;
    identity: string;
  };
  forwarding_email: string;
  team: Team;
  team_member: any;
}

export interface Team {
  mls_membership: any[];
  number_of_agents: number;
  primary_state: IState;
  real_estate_boards: any[];
  team_contact_email: string;
  team_name: string;
  team_phone_number: string;
  team_role: string;
  team_transactions_last_12_months: string;
  team_volume_last_12_months: string;
  team_website: string;
  team_document: any[];
}

export interface TransferLicense {
  status?: { type?: string; label?: string };
  state?: string | undefined;
  licenseNumber?: string;
  plannedTransferDate?: string;
  associations?: string[];
  instructions?: string;
  confirmationText?: string;
  additionalMessage?: { type?: string; title?: string; message?: string };
}

export type AgentTool = {
  id: number;
  identity: string;
  logo: number; // Assuming this is a logo ID, not a URL
  tool_type: "free" | "paid";
  description: string;
  site_link: string;
  price: number;
  is_default: boolean;
  is_mandatory: boolean;
  is_selected: boolean;
};

export type AgentToolsList = AgentTool[];

// stage type

export type StageStatus = "completed" | "in_progress" | "yet_to_start";

export interface OnboardingStage {
  id: number;
  stage: {
    id: string; // e.g., "application", "tools", etc.
    identity: string; // e.g., "ROA Application"
  };
  status: StageStatus;
  index: number;
  started_at: string | null;
  completed_at: string | null;
}

// payment types

export type PaymentResponse = {
  data: {
    client_secret: string;
    amount_to_pay: number;
    payment_summary: {
      [key: string]: PaymentSummaryItem | string[]; // Includes the "fixed_keys" array
      fixed_keys: string[];
    };
    payment_uuid: string;
  };
  status: string;
  action_code: string;
};

export type PaymentSummaryItem = {
  payment: number;
  is_waived: boolean;
  state_id?: number;
};

export type PaymentSummary = {
  [key: string]: PaymentSummaryItem;
  //@ts-expect-error test
  fixed_keys: string[];
};

export interface PaymentResponseMain {
  data: PaymentResponse;
  status: string;
  action_code: string;
}

// payload-react response
export type PaystackSuccessResponse = {
  status: "success";
  type: string;
  message: string;
  reference: string;
  transaction: string;
  trans: string;
  trxref: string;
  redirecturl: string;
};

export type PaystackErrorResponse = {
  message: string;
};

export type PaystackInvalidTypeError = {
  name: "InvalidTypeError";
  message: string;
  expectedType: string;
  receivedType: string;
  field?: string; // optional: field name where the error occurred
};

export type OnboardingStages = OnboardingStage[];

export type Typevalidationmsg = {
  data: {
    roa_email: string[];
  };
  status: string;
  action_code: string;
};

export interface LicenseState {
  id: number;
  identity?: string;
  instructions?: string;
}

export type IdentityObject = {
  id: number;
  identity: string;
};

export type MlsBoardResponse = {
  id: number;
  state: IdentityObject;
  board_mls: {
    boards: IdentityObject[];
  };
  boards?: IdentityObject[];
  mls: IdentityObject[];
  manual_mls: IdentityObject[];
  manual_boards: IdentityObject[];
};

export interface LicenseData {
  board_mls: MlsBoardResponse;
  id: number;
  license_no: string;
  license_type: string;
  expiry_date: string;
  planned_transfer_date: string;
  status: string;
  is_primary: boolean;
  is_acknowledged: boolean;
  transferred_at: string | null;
  license_instruction: LicenseState;
  license_documents: any[]; // You can define a more specific type if needed
  stage: any; // Replace with proper type if available
  state: LicenseState;
}

export interface LicenseResponse {
  action_code: string;
  status: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: LicenseData[];
  };
}

// file types

export type FileData = {
  id: number;
  file_name: string;
  file: string;
  size: string;
};

export type FileDataResponse = {
  data: FileData[];
  status: "success" | "error";
  action_code: "DO_NOTHING" | string;
};
