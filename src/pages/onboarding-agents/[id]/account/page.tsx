import { useState } from 'react'
import CustomContendHeader, {
  ButtonDataInterFace,
} from '../components/custom-content-header'
import { v4 as uuid } from 'uuid'
import { Box, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import EditWhiteIcon from '../components/editWhiteIcon'
import AdminFormWrapper from '../../../../login/adminlogin/AdminFormWrapper'
import NewAdminInputRenderer from '../../../../login/adminlogin/NewAdminInputRenderer'
import AppButton from '../../../../AppComponents/AppButton-agent'

const Page = () => {
  const [isEditable, setEditable] = useState(false)
  const {
    register,
    control,
    formState: { errors },
  } = useForm()

  const mainContentInfoInputField = [
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Name*',
          name: 'name',
        },
        {
          label: 'Title/Certifications*',
          name: 'title_certificatiiona',
          type: 'select',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Homepage Title*',
          name: 'homepage_title',
        },
        {
          label: 'Homepage Subtitle *',
          name: 'homepage_subtitle',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Message Title*',
          name: 'message_title',
        },
        {
          label: 'Message Content *',
          name: 'message_content',
        },
      ],
    },
  ]

  const aboutContentInfoInputField = [
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'I Work With*',
          name: 'i_work_with',
          type: 'select',
        },
        {
          label: 'Services Area ZIP Codes *',
          name: 'services_area_zip_codes',
          type: 'number',
        },
      ],
    },
  ]

  const featuredContentInfoInpitField = [
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Feature Title 1*',
          name: 'feature_title_1',
        },
        {
          label: 'Feature Title 2*',
          name: 'feature_title_2',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Feature Content 1*',
          name: 'feature_content_1',
          type: 'textarea',
        },
        {
          label: 'Feature Content 2*',
          name: 'feature_content_2',
          type: 'textarea',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Feature Title 3*',
          name: 'feature_title_3',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Feature Content 3*',
          name: 'feature_content_3',
          type: 'textarea',
        },
      ],
    },
  ]

  const testimonialsInfoInputField = [
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Client Name*',
          name: 'client_name_1',
        },
        {
          label: 'Client Name*',
          name: 'client_name_1',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Testimonial*',
          name: 'testimonial_1',
          type: 'textarea',
        },
        {
          label: 'Testimonial*',
          name: 'testimonial_2',
          type: 'textarea',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Client Name*',
          name: 'client_name_3',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Testimonial*',
          name: 'testimonial_3',
          type: 'textarea',
        },
      ],
    },
  ]

  const contentInfoInputField = [
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'ROA Website*',
          name: 'roa_website',
        },
        {
          label: 'Email*',
          name: 'email',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Phone*',
          name: 'phone',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: 'grid grid-cols-2 gap-x-[30px]',
      render: [
        {
          label: 'Instagram*',
          name: 'instagran',
        },
        {
          label: 'Facebook *',
          name: 'facebook',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Linked In*',
          name: 'linked_in',
        },
      ],
    },
    {
      key: uuid(),
      thisWrapperClassName: '',
      render: [
        {
          label: 'Show Agent Referral Link*',
          name: 'show_agent_referral_link',
        },
      ],
    },
  ]
  const formsList = [
    {
      title: 'Main Content',
      inputObj: mainContentInfoInputField,
    },
    {
      title: 'About Content',
      inputObj: aboutContentInfoInputField,
    },
    {
      title: 'Featured Content',
      inputObj: featuredContentInfoInpitField,
    },
    {
      title: 'Testimonials',
      inputObj: testimonialsInfoInputField,
    },
    {
      title: 'Contact Information',
      inputObj: contentInfoInputField,
    },
  ]
  const buttonData: ButtonDataInterFace[] = [
    {
      buttonClassName: '',
      label: 'Edit Details',
      icon: <EditWhiteIcon />,
      onClick: () => setEditable(true),
    },
  ]

  return (
    <div>
      <div className="my-10">
        <CustomContendHeader
          heading={'Agent ROA Website'}
          buttonData={buttonData}
        />
      </div>
      <form>
        <Flex pb={'57px'} gap={'40px'} flexFlow={'column'}>
          {formsList?.map((m) => (
            <AdminFormWrapper
              titleClassName="mb-[39px] mt-[-4px]"
              key={m?.title}
              title={m?.title}
            >
              <Box className="">
                <NewAdminInputRenderer
                  register={register}
                  control={control}
                  errors={errors}
                  boxWrapperClassName="grid grid-cols-1 gap-[28px] w-full max-w-[850px]"
                  inputObj={m?.inputObj}
                  inputWrapperClassName="w-full max-w-[410px]"
                />
              </Box>
            </AdminFormWrapper>
          ))}
          {isEditable ? (
            <Flex justifyContent={'end'} gap={'10px'}>
              <AppButton
                className="!text-[#10295A] border border-[#CDCDCD] rounded px-[30px]"
                label={'Cancel'}
                variant="transparent"
                onClick={() => setEditable(false)}
                type="button"
              />
              <AppButton label={'Save Changes'} type="submit" />
            </Flex>
          ) : null}
        </Flex>
      </form>
    </div>
  )
}

export default Page
