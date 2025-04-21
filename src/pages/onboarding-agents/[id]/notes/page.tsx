import { Box, Flex, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import NotesHeader from "../components/notesHeader";
import NotesBody from "../components/notesBody";
import AdminInputRenderer from "../../../../login/adminlogin/AdminInputRenderer";
import { AGENT_NOTES_CREATE, AGENT_NOTES_LIST } from "../../../../api-utils";
import AppButton from "../../../../AppComponents/AppButton-agent";
import makeGetRequest from "../../../../api/makeGetRequest";
import makePostRequest from "../../../../api/makePostRequest";

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

export default function Page() {
  const { id } = useParams();
  const notesForm = useForm();
  const { data, refetch } = useQuery(
    [AGENT_NOTES_LIST() + `?review_type=internal_notes&user=${id}`],
    () =>
      makeGetRequest(
        AGENT_NOTES_LIST() + `?review_type=internal_notes&user=${id}`
      )
  );
  const { mutate, isLoading } = useMutation(
    (body) => makePostRequest(AGENT_NOTES_CREATE, body),
    {
      onSuccess: () => {
        refetch();
        notesForm.reset();
        toast.success("Note Created Successfully");
      },
      onError: (err: any) => {
        //@ts-expect-error ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data);
      
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
      review_type: "internal_notes",
      notes: body?.data?.notes,
    };
    //@ts-expect-error ignore
    mutate(bdyObj);
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <div className="w-[100%]">
        <form onSubmit={notesForm.handleSubmit(handleNoteSubmit)}>
          <Box w={"100%"} className="mt-[40px]">
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
            <Flex
              justifyContent={"end"}
              px={"20px"}
              py={"5px"}
              bg={"rgba(14, 93, 176, 0.1)"}
              borderBottomEndRadius={"4px"}
              borderBottomStartRadius={"4px"}
            >
              <AppButton
                isLoading={isLoading}
                type="submit"
                // onClick={handleSubmit}
                // disabled={!watch('message')}
                className="text-[13px] !rounded-[20px]"
              >
                Create Note
              </AppButton>
            </Flex>
          </Box>
        </form>
      </div>
      <div className="w-[100%] mt-[40px]">
        {notesList?.map((note: any, index: any) => (
          <div key={index} className="min-h-[90px] flex gap-[20px] mt-[20px]">
            <Image
              alt=""
              src={"/assets/notes-icon.png"}
              className="object-cover w-[36px] h-[36px]"
            />
            <div className="flex flex-col gap-[20px] pb-[20px] border-b-[1px] border-[#CDCDCD] w-[95%]">
              <NotesHeader created={note?.created} title={note?.identity} />
              <NotesBody desc={note?.notes} isExpand={false} />
            </div>
          </div>
        ))}
      </div>

      {/* list */}
      {/* <>
        <ActivityBoxHeader
          readOnly={readOnly}
          created={data?.contacted_date}
        />
        <ActivityBoxBody
          desc={data?.message}
          isExpand={false}
        />
      </> */}
    </Flex>
  );
}
