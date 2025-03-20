import { useState, useMemo, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Badge,
  Card,
  Checkbox,
} from "flowbite-react";
import { Search } from "lucide-react";
// import permissionsDataJSON from "../../sample-data/permissionsData.json";
import { createRole, getAllPermissions, updateRole } from "../../services/systemaideService";

// Custom indeterminate checkbox component
function IndeterminateCheckbox({ checked, onChange, indeterminate }) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return <Checkbox ref={checkboxRef} checked={checked} onChange={onChange} />;
}

export function RoleModalForm({ openModal, setOpenModal, roleData, fetchAllRoles }) {
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [formData, setFormData] = useState({
    // id: roleData?.id || undefined,
    name: "",
    permissions: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter permissions based on search query
  const filteredPermissions = useMemo(() => {
    if (!searchQuery) return availablePermissions;

    return availablePermissions.filter(
      (p) => (p?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      // || p?._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, availablePermissions]);

  const fetchAllPermissions = async () => {
    try {
      const response = await getAllPermissions();
      if (!response?.success) console.log(response?.message);
      setAvailablePermissions(response?.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => {
      const permissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId];

      return {
        ...prev,
        permissions,
      };
    });
  };

  const handleToggleAll = () => {
    setFormData((prev) => {
      // If all filtered permissions are selected, deselect them all
      const allFilteredIds = filteredPermissions.map((p) => p?._id);
      const allSelected = filteredPermissions.every((p) =>
        prev.permissions.includes(p?._id)
      );

      if (allSelected) {
        // Remove all filtered permissions
        return {
          ...prev,
          permissions: prev.permissions.filter(
            (id) => !allFilteredIds.includes(id)
          ),
        };
      } else {
        // Add all filtered permissions that aren't already selected
        const newPermissions = [...prev.permissions];

        for (const permission of filteredPermissions) {
          if (!newPermissions.includes(permission?._id)) {
            newPermissions.push(permission?._id);
          }
        }

        return {
          ...prev,
          permissions: newPermissions,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (roleData) {
        await updateRole(roleData?._id, JSON.stringify(formData));
      } else {
        await createRole(JSON.stringify(formData));
        setFormData({ name: "", permissions: [] });
      }
      setOpenModal(false);
      fetchAllRoles();
    } catch (error) {
      console.error("Error creating Role:", error);
    }
  };

  // Calculate stats for the select all checkbox
  const getStats = () => {
    const total = filteredPermissions.length;
    const selected = filteredPermissions.filter((p) =>
      formData.permissions.includes(p?._id)
    ).length;
    return { total, selected };
  };

  const { total, selected } = getStats();
  const allSelected = total > 0 && selected === total;
  const isIndeterminate = selected > 0 && selected < total;

  useEffect(() => {
    fetchAllPermissions();
  }, [openModal]);

  useEffect(() => {
    if (roleData) {
      setFormData({
        name: roleData?.name || "",
        // permissions: roleData?.permissions || [],
        permissions:
          roleData?.permissions.map((permission) => permission._id) || [],
      });
    } else {
      setFormData({
        name: "",
        permissions: [],
      });
    }
  }, [roleData]);

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        {roleData
          ? `Edit Role - ${roleData?.name.toUpperCase()}`
          : "Add New Role"}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Role Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter role name"
              required={true}
            />
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="permissions" value="Permissions" />
              <Badge color="info">
                {formData.permissions.length}/{availablePermissions.length}{" "}
                selected
              </Badge>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <TextInput
                id="search"
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Card>
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <div className="font-medium">All Permissions</div>
                <div className="flex items-center gap-2">
                  <Badge color="gray">
                    {selected}/{total}
                  </Badge>
                  <IndeterminateCheckbox
                    checked={allSelected}
                    onChange={handleToggleAll}
                    indeterminate={isIndeterminate}
                  />
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto pr-2">
                {filteredPermissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredPermissions.map((permission) => (
                      <div
                        key={permission?._id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={permission?._id}
                          checked={formData.permissions.includes(
                            permission?._id
                          )}
                          onChange={() =>
                            handlePermissionToggle(permission?._id)
                          }
                        />
                        <Label
                          htmlFor={permission?._id}
                          className="cursor-pointer"
                        >
                          {permission?.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No permissions match your search
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              {roleData ? "Save Changes" : "Add Role"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}