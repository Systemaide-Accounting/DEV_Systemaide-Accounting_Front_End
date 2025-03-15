import { Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { createPermission, updatePermission } from "../../services/systemaideService";

export function PermissionModalForm({ openModal, setOpenModal, permissionData }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            if (permissionData) {
              await updatePermission(
                permissionData?._id,
                JSON.stringify(formData)
              );
            } else {
              await createPermission(JSON.stringify(formData));
            }
            setOpenModal(false);
        } catch (error) {
            console.error("Error creating Permission:", error);
        }
    };

    useEffect(() => {
        if (permissionData) {
            setFormData({
                name: permissionData?.name || "",
                description: permissionData?.description || "",
            });
        } else {
            setFormData({
                name: "",
                description: "",
            });
        }
    }, [permissionData]);

    return (
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Permission</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Permission" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Enter permission"
                value={formData?.name}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                value={formData?.description}
                required={true}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              {permissionData ? "Save" : "Add"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
}