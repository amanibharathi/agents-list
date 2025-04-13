import { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react'
import { GoEye, GoPlusCircle, GoTrash } from 'react-icons/go'
import { FaRegEdit } from 'react-icons/fa'

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

const dummyData = [
  {
    id: 1,
    identity: 'Meta Management',
    policies: [
      {
        id: 1,
        identity: 'Tool Management Policy',
        description: 'Tool Management Policy',
        policy_category: 1,
        permissions: {
          is_creatable: false,
          is_viewable: false,
          is_editable: false,
          is_deletable: false,
        },
      },
      {
        id: 2,
        identity: 'State Management Policy',
        description: 'State Management Policy',
        policy_category: 1,
        permissions: {
          is_creatable: false,
          is_viewable: false,
          is_editable: false,
          is_deletable: false,
        },
      },
    ],
  },
  {
    id: 2,
    identity: 'Resource Management',
    policies: [
      {
        id: 2,
        identity: 'Resource Management Policy',
        description: 'Resource Management Policy',
        policy_category: 2,
        permissions: {
          is_creatable: false,
          is_viewable: false,
          is_editable: false,
          is_deletable: false,
        },
      },
    ],
  },
]

interface PermissionSet {
  is_creatable: boolean
  is_editable: boolean
  is_viewable: boolean
  is_deletable: boolean
}

interface Policy {
  id: number
  identity: string
  description: string
  policy_category: number
  permissions: PermissionSet
}

interface Module {
  id: number
  identity: string
  policies: Policy[]
}

const ListingTableForRole: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: PermissionSet
  }>({})
  const [headerSelections, setHeaderSelections] = useState<{
    [key: string]: boolean
  }>({})
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  )

  useEffect(() => {
    setModules(dummyData)
    const initialPermissions: { [key: string]: PermissionSet } = {}
    dummyData.forEach((mod: Module) => {
      mod.policies.forEach((policy) => {
        initialPermissions[policy.identity] = { ...policy.permissions }
      })
    })
    setSelectedPermissions(initialPermissions)
  }, [])

  const togglePermission = (
    policy: string,
    permission: keyof PermissionSet
  ) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [policy]: { ...prev[policy], [permission]: !prev[policy][permission] },
    }))
  }

  const toggleHeaderPermission = (permission: keyof PermissionSet) => {
    const newState = !headerSelections[permission]
    setHeaderSelections((prev) => ({ ...prev, [permission]: newState }))
    setSelectedPermissions((prev) => {
      const updatedPermissions = { ...prev }
      modules.forEach((mod) => {
        mod.policies.forEach((policy) => {
          updatedPermissions[policy.identity][permission] = newState
        })
      })
      return updatedPermissions
    })
  }

  const toggleRowSelection = (moduleId: number, policies: Policy[]) => {
    const newState = !selectedRows[moduleId]
    setSelectedRows((prev) => ({
      ...prev,
      [moduleId]: newState,
    }))

    setSelectedPermissions((prev) => {
      const updatedPermissions = { ...prev }
      policies.forEach((policy) => {
        permissions.forEach((perm) => {
          updatedPermissions[policy.identity] = {
            ...updatedPermissions[policy.identity],
            [perm.key]: newState,
          }
        })
      })
      return updatedPermissions
    })
  }

  return (
    <Table variant="simple" borderWidth="1px">
      <Thead bg="#EAF5FF">
        <Tr>
          <Th>
            <Checkbox
              isChecked={modules.every((mod) => selectedRows[mod.id])}
              onChange={() => {
                const allSelected = modules.every((mod) => selectedRows[mod.id])
                const newSelection = modules.reduce(
                  (acc, mod) => {
                    acc[mod.id] = !allSelected
                    return acc
                  },
                  {} as { [key: number]: boolean }
                )
                setSelectedRows(newSelection)

                setSelectedPermissions((prev) => {
                  const updatedPermissions = { ...prev }
                  modules.forEach((mod) => {
                    mod.policies.forEach((policy) => {
                      permissions.forEach((perm) => {
                        updatedPermissions[policy.identity] = {
                          ...updatedPermissions[policy.identity],
                          [perm.key]: !allSelected,
                        }
                      })
                    })
                  })
                  return updatedPermissions
                })
              }}
            />
          </Th>
          <Th className="!text-[#000000] font-[600]">Modules</Th>
          {permissions.map((perm) => (
            <Th key={perm.key}>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 text-[#000000] font-[600]">
                  {perm.icon}
                  {perm.label}
                </div>
                <Checkbox
                  isChecked={modules.every((mod) =>
                    mod.policies.every(
                      (policy) =>
                        //@ts-ignore
                        selectedPermissions[policy.identity]?.[perm.key]
                    )
                  )}
                  onChange={() =>
                    toggleHeaderPermission(perm.key as keyof PermissionSet)
                  }
                />
              </div>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {modules.map((mod) =>
          mod.policies.map((policy, index) => (
            <Tr key={policy.id}>
              <Td>
                {index === 0 && (
                  <Checkbox
                    isChecked={selectedRows[mod.id] || false}
                    onChange={() => toggleRowSelection(mod.id, mod.policies)}
                  />
                )}
              </Td>
              <Td>{policy.identity}</Td>
              {permissions.map((perm) => (
                <Td key={perm.key}>
                  <div className="flex justify-center">
                    <Checkbox
                      isChecked={
                        //@ts-ignore
                        selectedPermissions[policy.identity]?.[perm.key] ||
                        false
                      }
                      onChange={() =>
                        togglePermission(
                          policy.identity,
                          perm.key as keyof PermissionSet
                        )
                      }
                    />
                  </div>
                </Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  )
}

export default ListingTableForRole
