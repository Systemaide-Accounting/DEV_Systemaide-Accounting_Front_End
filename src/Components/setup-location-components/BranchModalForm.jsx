import { Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { createBranch, updateBranch } from "../../services/systemaideService";

export function BranchModalForm({ openModal, setOpenModal, branchData }) {
    
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      tin: "",
      machineId: "",
    });

    const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (branchData) {
                await updateBranch(branchData?._id, JSON.stringify(formData));
            } else {
                await createBranch(JSON.stringify(formData));
                setFormData({
                  name: "",
                  address: "",
                  tin: "",
                  machineId: "",
                });
            }
            setOpenModal(false);
        } catch (error) {
            console.error("Error creating branch:", error);
        }
    };

    useEffect(() => {
        if (branchData) {
            setFormData({
                name: branchData?.name || "",
                address: branchData?.address || "",
                tin: branchData?.tin || "",
                machineId: branchData?.machineId || "",
            });
        } else {
            setFormData({
                name: "",
                address: "",
                tin: "",
                machineId: "",
            });
        }
    }, [branchData]);   

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                {branchData
                ? `Edit Branch - ${branchData?.name}`
                : "Add New Branch"}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Branch Name" />
                        </div>
                        <TextInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter branch name"
                        value={formData?.name}
                        required={true}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <TextInput
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter address"
                        value={formData?.address}
                        required={true}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tin" value="TIN" />
                        </div>
                        <TextInput
                        id="tin"
                        name="tin"
                        type="text"
                        placeholder="Enter TIN"
                        value={formData?.tin}
                        required={true}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="machineId" value="Machine ID No." />
                        </div>
                        <TextInput
                        id="machineId"
                        name="machineId"
                        type="text"
                        value={formData?.machineId}
                        placeholder="Enter machine ID no."
                        // required={true}
                        onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        {branchData ? "Save" : "Add"}
                    </button>
                    </form>
            </Modal.Body>
        </Modal>
    );
}