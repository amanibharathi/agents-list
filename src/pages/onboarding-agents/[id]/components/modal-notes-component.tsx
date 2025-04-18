// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useForm } from "react-hook-form";
//import SendIcon from '@/app/icons/sendIcon'
import { AGENT_NOTES_LIST, AGENT_NOTES_CREATE } from "../../../../api-utils";
import makeGetRequest from "../../../../api/makeGetRequest";
import { useMutation, useQuery } from "react-query";
import makePostRequest from "../../../../api/makePostRequest";
// import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
import toast from "react-hot-toast";
import moment from "moment";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import AppButton from "../../../../AppComponents/AppButton-agent";
import AppText from "../../../../AppComponents/AppText-agent";
import SendIcon from "./sendIcon";
import { getFirstErrorMessage } from "../../../../utils/functions/commonFunctions";

const inputFields = [
  {
    name: "identity",
    placeholder: "Add Note Title...",
    otherRegProps: {
      required: true,
    },
  },
  {
    name: "notes",
    placeholder: "Description...",
    otherRegProps: {
      required: true,
    },
    type: "textarea",
  },
];

const getDate = (date: string) => {
  const inputDate = moment(date);

  // Current date and time
  const now = moment();

  // Check if the input date is today
  const formattedDate = inputDate.isSame(now, "day")
    ? `Today, ${inputDate.format("HH:mm:ss")}`
    : inputDate.format("MMMM D, YYYY, HH:mm:ss");

  return formattedDate;
};

export default function ModalNotesComponent({ id, review_type = "" }: any) {
  const notesForm = useForm();
  const { data, refetch } = useQuery(
    [
      AGENT_NOTES_LIST() +
        `?review_type=${review_type ? review_type : "notes"}&user=${id}`,
    ],
    () =>
      makeGetRequest(
        AGENT_NOTES_LIST() +
          `?review_type=${review_type ? review_type : "notes"}&user=${id}`
      )
  );
  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(AGENT_NOTES_CREATE, body),
    {
      onSuccess: () => {
        refetch();
        notesForm.reset();
        toast.success("Assigned Successfully");
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
        //@ts-expect-error ignore
        toast.error(errMsg);
      },
    }
  );
  const notesList = data?.data?.results ?? [];
  const handleNoteSubmit = (body: any) => {
    const bdyObj = {
      user: id,
      identity: body?.data?.identity,
      form_group: null,
      form_subgroup: [],
      review_type: review_type ? review_type : "notes",
      notes: body?.data?.notes,
    };
    //@ts-expect-error ignore
    mutate(bdyObj);
  };

  return (
    <div className="flex flex-col">
      <div className="px-[20px] py-[14px] flex flex-col gap-[14px] max-h-[300px]  overflow-scroll no-scrollbar">
        {notesList.length !== 0 ? (
          notesList.map((each: any, index: any) => (
            <div
              key={index}
              className="p-[20px] border border-[#E6E7E9] rounded-lg shadow-[2px_2px_48px_0px_#00000014] flex flex-col gap-[10px]"
            >
              <div className="flex justify-between items-center">
                <AppText className="font-semibold !text-black">
                  {each?.form_group
                    ? `You had requested changes in ${each?.form_subgroup[0]?.identity} of ${each?.form_group?.identity}`
                    : each.identity}
                </AppText>
                <AppText className="!text-[#6D6D6D] text-xs">
                  {getDate(each?.created)}
                </AppText>
              </div>
              <AppText className="!text-[#6D6D6D] text-sm">
                {each.notes}
              </AppText>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center p-[30px]">
            <AppText className="font-semibold !text-[#10295A]">No Data</AppText>
          </div>
        )}
      </div>
      <div className="border-t border-[#DBDBDB4D] p-[20px] bg-[#FBFBFF]">
        <form onSubmit={notesForm.handleSubmit(handleNoteSubmit)}>
          <div className="flex items-end">
            <div className="flex flex-col gap-[18px] basis-[92%]">
              {inputFields?.map((i: any) => (
                <AdminInputRenderer
                  className="w-full max-w-[100%]"
                  wrapperClassName={`flex gap-[20px] text-[14px] ${
                    i?.wrapperName ?? ""
                  }`}
                  labelClassName=""
                  inputObj={i}
                  key={i?.name}
                  register={notesForm.register}
                  control={notesForm.control}
                  errors={notesForm.formState.errors?.data}
                  inputControlClassName={i?.wrapperName}
                />
              ))}
            </div>
            <div className="basis-[8%] flex justify-end">
              <AppButton
                type="submit"
                label=""
                className="!px-[12px] !py-[10px]"
                icon={<SendIcon />}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
