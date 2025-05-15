import { Label, Modal, Select, TextInput } from "flowbite-react";
import { createAgent, updateAgent } from "../../services/systemaideService";
import { useEffect, useState } from "react";
import { HandleFullNameFormat } from "../reusable-functions/NameFormatter";
import { safeJsonParse } from "../reusable-functions/safeJsonParse"; // Assuming you have this function in a separate file
import swal2 from "sweetalert2";

export function AgentModalForm({ openModal, setOpenModal, agentData }) {
  
  const [formData, setFormData] = useState({
    agentCode: "",
    taxClassification: "",
    tin: "",
    registeredName: "",
    registrationType: "",
    agentLastName: "",
    agentFirstName: "",
    agentMiddleName: "",
    agentBrgy: "",
    agentCity: "",
    agentType: "",
    tradeName: "",
    authorizedRepresentative: "",
    telephoneNo: "",
    fax: "",
    phone: "",
    email: "",
    website: "",
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
    
    const modifiedFormData = {
      ...formData,
      agentName: JSON.stringify({
        lastName: formData?.agentLastName || "",
        firstName: formData?.agentFirstName || "",
        middleName: formData?.agentMiddleName || "",
      }),
      agentAddress: JSON.stringify({
        brgy: formData?.agentBrgy || "",
        city: formData?.agentCity || "",
      }),
      phone: JSON.stringify({
        telephoneNo: formData?.telephoneNo || "",
        phone: formData?.phone || "",
      }),
    };
    
    try {
      let response = null;
     if (agentData) {
      response = await updateAgent(agentData?._id, JSON.stringify(modifiedFormData));
     } else {
      response = await createAgent(JSON.stringify(modifiedFormData));
      setFormData({
        agentCode: "",
        taxClassification: "",
        tin: "",
        registeredName: "",
        registrationType: "",
        agentLastName: "",
        agentFirstName: "",
        agentMiddleName: "",
        agentBrgy: "",
        agentCity: "",
        agentType: "",
        tradeName: "",
        authorizedRepresentative: "",
        telephoneNo: "",
        fax: "",
        phone: "",
        email: "",
        website: "",
      });
     }
      setOpenModal(false); 
      if (response?.success) {
        await swal2.fire({
          icon: "success",
          title: "Success",
          text: agentData ? "Agent updated successfully!" : "Agent created successfully!",
        });
      } else {
        await swal2.fire({
          icon: "error",
          title: "Error",
          text: agentData ? "Failed to update agent!" : "Failed to create agent!",
        });
      }
    } catch (error) {
      console.error("Error creating Agent:", error);
    }
  };

  useEffect(() => {
    if (agentData) {
      
      const agentName = safeJsonParse(agentData?.agentName);
      const agentAddress = safeJsonParse(agentData?.agentAddress);
      const phone = safeJsonParse(agentData?.phone);
      
      setFormData({
        agentCode: agentData?.agentCode || "",
        taxClassification: agentData?.taxClassification || "",
        tin: agentData?.tin || "",
        registeredName: agentData?.registeredName || "",
        registrationType: agentData?.registrationType || "",
        agentLastName: agentName?.lastName || agentName || "",
        agentFirstName: agentName?.firstName || "",
        agentMiddleName: agentName?.middleName || "",
        agentBrgy: agentAddress?.brgy || agentAddress || "",
        agentCity: agentAddress?.city || "",
        agentType: agentData?.agentType || "",
        tradeName: agentData?.tradeName || "",
        authorizedRepresentative: agentData?.authorizedRepresentative || "",
        telephoneNo: phone?.telephoneNo || "",
        fax: agentData?.fax || "",
        phone: phone?.phone || phone || "",
        email: agentData?.email || "",
        website: agentData?.website || "",
      });
    } else {
      setFormData({
        agentCode: "",
        taxClassification: "",
        tin: "",
        registeredName: "",
        registrationType: "",
        agentLastName: "",
        agentFirstName: "",
        agentMiddleName: "",
        agentBrgy: "",
        agentCity: "",
        agentType: "",
        tradeName: "",
        authorizedRepresentative: "",
        telephoneNo: "",
        fax: "",
        phone: "",
        email: "",
        website: "",
      });
    }
  }, [agentData]);

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="capitalize">
        {agentData?.agentName
          ? (() => {
              const parsedName = safeJsonParse(agentData?.agentName);
              if (parsedName && typeof parsedName === "object") {
                return (
                  <>
                    Edit Agent -{" "}
                    <HandleFullNameFormat
                      firstName={parsedName?.firstName}
                      lastName={parsedName?.lastName}
                      middleName={parsedName?.middleName}
                    />
                  </>
                );
              } else {
                return `Edit Agent - ${agentData?.agentName}`; // Pass the value as is if not JSON
              }
            })()
          : "Add New Agent"}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="mb-2 block">
                  <Label htmlFor="agentCode" value="Agent Code" />
                </div>
                <TextInput
                  id="agentCode"
                  name="agentCode"
                  type="text"
                  placeholder="Enter agent code"
                  value={formData?.agentCode}
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <div className="mb-2 block">
                  <Label
                    htmlFor="taxClassification"
                    value="Tax Classification"
                  />
                </div>
                <Select
                  id="taxClassification"
                  name="taxClassification"
                  onChange={handleChange}
                  className="uppercase"
                  value={formData?.taxClassification} // This controls the selected value
                  required={true}
                >
                  <option value="">Select Tax Classification</option>
                  <option className="uppercase" value="individual">
                    INDIVIDUAL
                  </option>
                  <option className="uppercase" value="non-individual">
                    NON-INDIVIDUAL
                  </option>
                </Select>
              </div>
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <div className="mb-2 block">
                <Label htmlFor="registeredName" value="Registered Name" />
              </div>
              <TextInput
                id="registeredName"
                name="registeredName"
                type="text"
                value={formData?.registeredName}
                placeholder="Enter registered name"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-2 block">
                <Label htmlFor="registrationType" value="Registration Type" />
              </div>
              <Select
                id="registrationType"
                name="registrationType"
                onChange={handleChange}
                className="uppercase"
                value={formData?.registrationType} // This controls the selected value
                required={true}
              >
                <option value="">Select Registration Type</option>
                <option className="uppercase" value="vat">
                  VAT
                </option>
                <option className="uppercase" value="non-vat">
                  NON-VAT
                </option>
              </Select>
            </div>
          </div>

          {/* Agent Name */}
          <div className="flex flex-col">
            <div className="mb-2 block">
              <Label htmlFor="agentName" value="Agent Name" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TextInput
                id="agentLastName"
                name="agentLastName"
                type="text"
                value={formData?.agentLastName}
                placeholder="LAST NAME"
                required={true}
                onChange={handleChange}
              />
              <TextInput
                id="agentFirstName"
                name="agentFirstName"
                type="text"
                value={formData?.agentFirstName}
                placeholder="FIRST NAME"
                required={true}
                onChange={handleChange}
              />
              <TextInput
                id="agentMiddleName"
                name="agentMiddleName"
                type="text"
                value={formData?.agentMiddleName}
                placeholder="MIDDLE NAME"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="mb-2 block">
                <Label htmlFor="agentAddress" value="Agent Address" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  id="agentBrgy"
                  name="agentBrgy"
                  type="text"
                  value={formData?.agentBrgy}
                  placeholder="No, Street, Barangay"
                  required={true}
                  onChange={handleChange}
                />
                <TextInput
                  id="agentCity"
                  name="agentCity"
                  type="text"
                  value={formData?.agentCity}
                  placeholder="District, City, Zip Code"
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2 block">
                <Label htmlFor="agentType" value="Agent Type" />
              </div>
              <Select
                id="agentType"
                name="agentType"
                className="uppercase"
                onChange={handleChange}
                value={formData?.agentType} // This controls the selected value
                required={true}
              >
                <option value="">Select Agent Type</option>
                <option className="uppercase" value="customer">
                  CUSTOMER
                </option>
                <option className="uppercase" value="supplier">
                  SUPPLIER
                </option>
                <option className="uppercase" value="government-agency">
                  GOVERNMENT AGENCY
                </option>
                <option className="uppercase" value="employee">
                  EMPLOYEE
                </option>
                <option className="uppercase" value="others">
                  OTHERS
                </option>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="tradeName" value="Trade Name" />
            </div>
            <TextInput
              id="tradeName"
              name="tradeName"
              type="text"
              value={formData?.tradeName}
              placeholder="Enter trade name"
              required={true}
              onChange={handleChange}
            />
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="authorizedRepresentative"
                  value="Authorized Representative"
                />
              </div>
              <TextInput
                id="authorizedRepresentative"
                name="authorizedRepresentative"
                type="text"
                value={formData?.authorizedRepresentative}
                placeholder="Enter authorized representative"
                // required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telephoneNo" value="Telephone No." />
              </div>
              <TextInput
                id="telephoneNo"
                name="telephoneNo"
                type="text"
                value={formData?.telephoneNo}
                placeholder="Enter telephone no."
                // required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fax" value="Fax No." />
              </div>
              <TextInput
                id="fax"
                name="fax"
                type="text"
                value={formData?.fax}
                placeholder="Enter fax no."
                // required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Cellphone No." />
              </div>
              <TextInput
                id="phone"
                name="phone"
                type="text"
                value={formData?.phone}
                placeholder="Enter cellphone no."
                // required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData?.email}
                placeholder="Enter email"
                // required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="website" value="Website" />
              </div>
              <TextInput
                id="website"
                name="website"
                type="text"
                value={formData?.website}
                placeholder="Enter website"
                // required={true}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {agentData ? "Save" : "Add"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}