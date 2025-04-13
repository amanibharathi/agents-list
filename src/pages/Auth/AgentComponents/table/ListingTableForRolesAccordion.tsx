import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  VStack,
  Text,
} from '@chakra-ui/react'
import { GoEye, GoPlusCircle, GoTrash } from 'react-icons/go'
import { FaRegEdit } from 'react-icons/fa'

type PermissionSet = {
  is_creatable: boolean
  is_editable: boolean
  is_viewable: boolean
  is_deletable: boolean
}

type Policy = {
  id: number
  identity: string
  permissions: PermissionSet
}

type Module = {
  id: number
  identity: string
  policies: Policy[]
}

const permissions = [
  {
    key: 'is_creatable',
    label: 'Create',
    icon: <GoPlusCircle fontSize={'18px'} />,
  },
  { key: 'is_editable', label: 'Edit', icon: <FaRegEdit fontSize={'18px'} /> },
  { key: 'is_viewable', label: 'View', icon: <GoEye fontSize={'18px'} /> },
  { key: 'is_deletable', label: 'Delete', icon: <GoTrash fontSize={'18px'} /> },
]

const ListingAccordionForRoleAccordion = ({
  modules,
  setModules,
}: {
  modules: Module[]
  setModules: any
}) => {
  const togglePermission = (
    policyId: number,
    permission: keyof PermissionSet
  ) => {
    setModules((prevModules: Module[]) =>
      prevModules.map((mod) => ({
        ...mod,
        policies: mod.policies.map((policy) => {
          if (policy.id !== policyId) return policy

          const updatedPermissions = {
            ...policy.permissions,
            [permission]: !policy.permissions[permission],
          }

          // If "Create" or "Edit" is selected, ensure "View" is checked
          if (permission === 'is_creatable' || permission === 'is_editable') {
            updatedPermissions.is_viewable = true
          }

          // If "Create" and "Edit" are both deselected AND "View" was auto-selected, remove "View"
          if (
            !updatedPermissions.is_creatable &&
            !updatedPermissions.is_editable &&
            policy.permissions.is_viewable // Only uncheck if "View" was previously selected automatically
          ) {
            updatedPermissions.is_viewable = false
          }

          return {
            ...policy,
            permissions: updatedPermissions,
          }
        }),
      }))
    )
  }

  const toggleRow = (policyId: number) => {
    setModules((prevModules: any) =>
      prevModules.map((mod: any) => ({
        ...mod,
        policies: mod.policies.map((policy: any) =>
          policy.id === policyId
            ? {
                ...policy,
                permissions: Object.fromEntries(
                  Object.keys(policy.permissions).map((key) => [
                    key,
                    !Object.values(policy.permissions).every(Boolean),
                  ])
                ) as PermissionSet,
              }
            : policy
        ),
      }))
    )
  }

  const toggleColumn = (permissionKey: keyof PermissionSet) => {
    setModules((prevModules: Module[]) =>
      prevModules.map((mod) => ({
        ...mod,
        policies: mod.policies.map((policy) => {
          const updatedPermissions = {
            ...policy.permissions,
            [permissionKey]: !policy.permissions[permissionKey],
          }

          // If "Create" or "Edit" is selected, ensure "View" is checked
          if (
            permissionKey === 'is_creatable' ||
            permissionKey === 'is_editable'
          ) {
            updatedPermissions.is_viewable = true
          }

          // If "Create" and "Edit" are both deselected AND "View" was auto-selected, remove "View"
          if (
            !updatedPermissions.is_creatable &&
            !updatedPermissions.is_editable &&
            policy.permissions.is_viewable // Only uncheck if "View" was previously selected automatically
          ) {
            updatedPermissions.is_viewable = false
          }

          return {
            ...policy,
            permissions: updatedPermissions,
          }
        }),
      }))
    )
  }

  return (
    <VStack gap={'0px'} width="100%" align="stretch">
      <div className="grid grid-cols-7 bg-[#EAF5FF] p-[26px] text-[#000000] font-[700] border">
        <div className="col-span-1"></div>
        <Text flex="1" className="col-span-2">
          Modules
        </Text>
        {permissions.map((perm) => (
          <div key={perm.key} className="flex flex-col gap-3 items-center">
            <div className="flex gap-3 items-center">
              {perm.icon}
              {perm.label}
            </div>
            <Checkbox
              className="bg-white"
              isChecked={modules.every((mod) =>
                mod.policies.every(
                  (policy) =>
                    policy.permissions[perm.key as keyof PermissionSet]
                )
              )}
              onChange={() => toggleColumn(perm.key as keyof PermissionSet)}
            />
          </div>
        ))}
      </div>
      <Accordion allowMultiple width="100%">
        {modules.map((mod) => (
          <AccordionItem key={mod.id} border="1px solid #ddd" borderRadius="md">
            <AccordionButton width="100%" _expanded={{ bg: 'blue.100' }}>
              <div className="grid grid-cols-7 p-[12px] items-center w-full">
                <Checkbox
                  isChecked={mod.policies.every((policy) =>
                    Object.values(policy.permissions).every(Boolean)
                  )}
                  onChange={() => mod.policies.forEach((p) => toggleRow(p.id))}
                />
                <Text
                  flex="1"
                  className="col-span-2 pr-[240px] whitespace-nowrap"
                >
                  {mod.identity}
                </Text>
                {permissions.map((perm) => (
                  <Checkbox
                    className="pl-[94px]"
                    key={perm.key}
                    isChecked={mod.policies.every(
                      (policy) =>
                        policy.permissions[perm.key as keyof PermissionSet]
                    )}
                    onChange={() =>
                      mod.policies.forEach((p) =>
                        togglePermission(p.id, perm.key as keyof PermissionSet)
                      )
                    }
                  />
                ))}
              </div>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {mod.policies.map((policy) => (
                <div
                  key={policy.id}
                  className="grid grid-cols-7 items-center w-full p-[8px]"
                >
                  <Checkbox
                    isChecked={Object.values(policy.permissions).every(Boolean)}
                    onChange={() => toggleRow(policy.id)}
                  />
                  <Text flex="1" className="col-span-2 pr-[60px]">
                    {policy.identity}
                  </Text>
                  {permissions.map((perm) => (
                    <Checkbox
                      className="pl-[85px]"
                      key={perm.key}
                      isChecked={
                        policy.permissions[perm.key as keyof PermissionSet]
                      }
                      onChange={() =>
                        togglePermission(
                          policy.id,
                          perm.key as keyof PermissionSet
                        )
                      }
                    />
                  ))}
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  )
}

export default ListingAccordionForRoleAccordion
