import DashFilterDateRange from "./DashFilterDateRange";
import DashFilterSelect from "./DashFilterSelect";
import DateRangePicker from "./DateRangePicker";
import AppText from "../../../../AppComponents/AppText-agent";

//@ts-expect-error ignore
const AdminFilterRenderer = ({
  filterTitle = "",
  filterArr,
  control,
  register,
  setValue,
  watch,
  dateRange = {},
  setDateRange = () => {},
  // reset,
}) => {
  const clearFilters = () => {
    // if (reset) reset()
    // else
    if (!!Object.keys(dateRange)?.length) {
      setDateRange({});
    }
    filterArr?.map((m) => {
      if (m?.name == "dateRange")
        setValue(m?.name, [
          {
            startDate: null,
            endDate: null,
            key: "selection",
          },
        ]);
      else setValue(m?.name, null);
    });
  };

  const getFilterType = (type: string, m: unknown, ind: number) => {
    if (type == "select")
      return (
        <DashFilterSelect
          className={`!z-[${20 - ind}]`}
          key={m?.name}
          filterLabel={m?.filterLabel || m?.name}
          {...register(m?.name, { value: m?.value })}
          control={control}
          options={
            m?.options?.map((m) => ({
              label: m?.identity || m?.title || m?.name,
              value: m?.id,
              ...m,
            })) || []
          }
          isAdminFilter={true}
          selectIcon={m?.icon}
          {...m}
        />
      );

    if (type == "dateRange")
      return (
        <DashFilterDateRange
          watch={watch}
          setValue={setValue}
          filterLabel={m?.filterLabel}
        />
      );
    if (type == "dob")
      return (
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      );
  };
  return (
    <div>
      <div className="flex items-center gap-[20px]">
        {filterTitle ? (
          <AppText className="text-[14px]" text={filterTitle} />
        ) : null}
        <div className="flex  flex-wrap w-[100%] list-filters  gap-[10px]">
          {/* @ts-ignore */}
          {filterArr?.map((m, ind) => (
            <>{getFilterType(m?.type, m, ind)}</>
          ))}
        </div>
        <AppText
          onClick={clearFilters}
          text="Clear"
          className="underline text-[16px] cursor-pointer hover:text-[#ff4b4b] self-center py-1 px-2"
        />
      </div>
    </div>
  );
};

export default AdminFilterRenderer;
