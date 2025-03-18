import { Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { createLocation, getAllBranches, updateLocation } from "../../services/systemaideService";

export function LocationModalForm({ openModal, setOpenModal, locationData }) {

    const [branchSelectOptions, setBranchSelectOptions] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        tin: "",
        machineId: "",
        branch: "",
    });

    const fetchAllBranches = async () => {
        try {
            const response = await getAllBranches();
            if (!response?.success) console.log(response?.message);
            setBranchSelectOptions(response?.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

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
            if (locationData) {
                await updateLocation(locationData?._id, JSON.stringify(formData));
            } else {
                await createLocation(JSON.stringify(formData));
                setFormData({
                    name: "",
                    address: "",
                    tin: "",
                    machineId: "",
                    branch: "",
                });
            }
            setOpenModal(false);
        } catch (error) {
            console.error("Error creating Location:", error);
        }
    };

    useEffect(() => {
        fetchAllBranches();
    }, [openModal]);

    useEffect(() => {
        if (locationData) {
            setFormData({
                name: locationData?.name || "",
                address: locationData?.address || "",
                tin: locationData?.tin || "",
                machineId: locationData?.machineId || "",
                branch: locationData?.branch?._id || "",
            });
        } else {
            setFormData({
                name: "",
                address: "",
                tin: "",
                machineId: "",
                branch: "",
            });
        }
    }, [locationData]);    

    return (
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {locationData
            ? `Edit Location - ${locationData?.name}`
            : "Add New Location"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Location Name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Enter location name"
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="branch" value="Branch Class" />
              </div>
              <Select
                id="branch"
                name="branch"
                onChange={handleChange}
                value={formData.branch} // This controls the selected value
              >
                <option value="">Select Branch</option>
                {branchSelectOptions.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              {locationData ? "Save" : "Add"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
}