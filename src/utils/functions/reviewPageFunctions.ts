export const handleShowData = (
  val: string | number | boolean | object | undefined | null
) => {
  if (typeof val == "object")
    //@ts-expect-error ignore
    return val?.label || val?.identity || val?.name || val?.id || val?.value;
  if (val == "true") return "Yes";
  if (val == "false") return "No";

  return val;
};
