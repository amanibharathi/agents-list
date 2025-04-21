// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import BulkUploadTeamMembersModal from './BulkUploadTeamMembersModal'
import AddATeamMemberModal from './AddATeamMemberModal'
import AddANewMemberModal from './AddANewMemberModal'

interface ITeamDocumentationTabModals {
  bulkUploadIsOpen: boolean
  bulkUploadOnClose: () => void
  teamMemberIsOpen: boolean
  teamMemberOnClose: () => void
  teamMemberOnOpen: () => void
  params: string
  teamMemberExistingIsOpen: boolean
  isBulkLicenseUpload: boolean
  refetch?: any
  teamMemberExistingOnClose: () => void
}

const TeamDocumentationTabModals = (props: ITeamDocumentationTabModals) => {
  return (
    <div>
      <BulkUploadTeamMembersModal
        isOpen={props?.bulkUploadIsOpen}
        onClose={props?.bulkUploadOnClose}
        onOptionRemove={() => console.log('removesd')}
        isBulkLicenseUpload={props?.isBulkLicenseUpload}
        inputObj={{
          label: '',
          name: '',
          type: '',
          imageState: undefined,
          setImageState: function (): void {
            console.log('removed')
          },
          uploadKey: '',
          fileTypes: ['csv'],
          placeholder: '',
          fileTypeKey: '',
        }}
      />
      <AddANewMemberModal
        params={props?.params}
        isOpen={props?.teamMemberIsOpen}
        onClose={props?.teamMemberOnClose}
      />
      <AddATeamMemberModal
        params={props?.params}
        isOpen={props?.teamMemberExistingIsOpen}
        onClose={props?.teamMemberExistingOnClose}
      />
    </div>
  )
}

export default TeamDocumentationTabModals
