import { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Radio,
  Accordion,
} from "flowbite-react";
import {
  Building2,
  FileText,
  User,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  Save,
  CheckCircle,
} from "lucide-react";
import { createCompany, getLatestCompany, updateCompany } from "../../services/systemaideService";
import swal2 from "sweetalert2";
import { safeJsonParse } from "../../Components/reusable-functions/safeJsonParse";

const months = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

export function SetupCompany() {
  
  const [companyData, setCompanyData] = useState(null);
  const [isFirstOptionDisabled, setIsFirstOptionDisabled] = useState(false);
  const [companyPeriod, setCompanyPeriod] = useState("calendar");
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success
  const [formData, setFormData] = useState({
    tin: "",
    registeredName: "",
    tradeName: "",
    lastName: "",
    firstName: "",
    middleName: "",
    authorizedRepresentativeName: "",
    position: "",
    businessStreetBrgy: "",
    businessCity: "",
    zip: "",
    businessLine: "",
    telNumber: "",
    fax: "",
    rdoNumber: "",
    rdoCity: "",
    fiscalMonth: "",
    businessType: "",
    registrationType: "",
    taxClassification: "",
    companyPeriod: "calendar",
  });
  
  const fetchLatestCompany = async () => {
    try {
      const response = await getLatestCompany();
      setCompanyData(response?.data);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "companyPeriod") {
      setCompanyPeriod(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectFocus = () => {
    setIsFirstOptionDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const modifiedFormData = {
      ...formData,
      taxPayer: JSON.stringify({
        lastName: formData?.lastName || "",
        firstName: formData?.firstName || "",
        middleName: formData?.middleName || "",
      }),
      businessAddress: JSON.stringify({
        businessStreetBrgy: formData?.businessStreetBrgy || "",
        businessCity: formData?.businessCity || "",
        zip: formData?.zip || "",
      }),
      rdo: JSON.stringify({
        rdoNumber: formData?.rdoNumber || "",
        rdoCity: formData?.rdoCity || "",
      }),
      fiscal: JSON.stringify({
        fiscalMonth: formData?.fiscalMonth || "",
        companyPeriod: formData?.companyPeriod || "",
      }),
      telephoneFax: JSON.stringify({
        telNumber: formData?.telNumber || "",
        fax: formData?.fax || "",
      }),
      authorizedRepresentative: JSON.stringify({
        authorizedRepresentativeName: formData?.authorizedRepresentativeName || "",
        position: formData?.position || "",
      }),
    };

    try {
      if (companyData) {
        const response = await updateCompany(companyData?._id, JSON.stringify(modifiedFormData));
        if (response?.success) {
          fetchLatestCompany();
          await swal2.fire({
            icon: "success",
            title: "Company updated successfully",
            // text: response?.message,
          });
          setFormStatus("success");
        } else {
          await swal2.fire({
            icon: "error",
            title: "Error updating Company",
            // text: response?.message,
          });
        }
      } else {
        const response = await createCompany(JSON.stringify(modifiedFormData));
        if (response?.success) {
          fetchLatestCompany();
          await swal2.fire({
            icon: "success",
            title: "Company created successfully",
            // text: response?.message,
          });
          setFormStatus("success");
        } else {
          await swal2.fire({
            icon: "error",
            title: "Error creating Company",
            // text: response?.message,
          });
        }
      }
    } catch (error) {
      console.error("Error creating or saving Company:", error);
    }

    setTimeout(() => {
      setFormStatus("idle");
    }, 3000);
  };

  useEffect(() => {
    fetchLatestCompany();
  }, []);

  useEffect(() => {
    if (companyData) {

      const taxPayer = safeJsonParse(companyData?.taxPayer);
      const authorizedRepresentative = safeJsonParse(companyData?.authorizedRepresentative);
      const businessAddress = safeJsonParse(companyData?.businessAddress);
      const telephoneFax = safeJsonParse(companyData?.telephoneFax);
      const rdo = safeJsonParse(companyData?.rdo);
      const fiscal = safeJsonParse(companyData?.fiscal);

      setFormData({
        tin: companyData?.tin || "",
        registeredName: companyData?.registeredName || "",
        tradeName: companyData?.tradeName || "",
        taxPayerClassification: companyData?.taxPayerClassification || "",
        lastName: taxPayer?.lastName || "",
        firstName: taxPayer?.firstName || "",
        middleName: taxPayer?.middleName || "",
        authorizedRepresentativeName:
          authorizedRepresentative?.authorizedRepresentativeName || "",
        position: authorizedRepresentative?.position || "",
        businessStreetBrgy: businessAddress?.businessStreetBrgy || "",
        businessCity: businessAddress?.businessCity || "",
        zip: businessAddress?.zip || "",
        businessLine: companyData?.businessLine || "",
        telNumber: telephoneFax?.telNumber || "",
        fax: telephoneFax?.fax || "",
        rdoNumber: rdo?.rdoNumber || "",
        rdoCity: rdo?.rdoCity || "",
        fiscalMonth: fiscal?.fiscalMonth || "",
        companyPeriod: fiscal?.companyPeriod || "",
        businessType: companyData?.businessType || "",
        registrationType: companyData?.registrationType || "",
        taxClassification: companyData?.taxClassification || "",
      });

    } else {
      setFormData({
        tin: "",
        registeredName: "",
        tradeName: "",
        lastName: "",
        firstName: "",
        middleName: "",
        authorizedRepresentativeName: "",
        position: "",
        businessStreetBrgy: "",
        businessCity: "",
        zip: "",
        businessLine: "",
        telNumber: "",
        fax: "",
        rdoNumber: "",
        rdoCity: "",
        fiscalMonth: "",
        businessType: "",
        registrationType: "",
        taxClassification: "",
        companyPeriod: "calendar",
      });
    }
  }, [companyData]);
  
  return (
    <>
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">Setup Company</h1>
      {/* <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700"> */}
        {/* <h1 className="text-2xl font-bold mb-2">Setup Company</h1> */}

        {/* SETUP COMPANY FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Basic Information Section */}
          <Accordion collapseAll={false}>
            <Accordion.Panel>
              <Accordion.Title className="bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Basic Information</span>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid sm:grid-cols-2 gap-6 p-2">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="tin"
                      value="TIN"
                      className="mb-2 font-semibold"
                    />
                    <TextInput
                      type="text"
                      name="tin"
                      id="tin"
                      value={formData?.tin}
                      placeholder="Enter TIN"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="taxClassification"
                      value="TAXPAYER CLASSIFICATION"
                      className="mb-2 font-semibold uppercase"
                    />
                    <Select
                      name="taxClassification"
                      id="taxClassification"
                      value={formData?.taxClassification}
                      onFocus={handleSelectFocus}
                      onChange={handleChange}
                      required
                      className="border-blue-600 focus:border-blue-600 focus:ring-blue-600"
                    >
                      <option
                        className="uppercase"
                        value=""
                        disabled={isFirstOptionDisabled}
                      >
                        Select taxpayer classification
                      </option>
                      <option className="uppercase" value="non-individual">
                        NON-INDIVIDUAL
                      </option>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 p-2 mt-4">
                  <div>
                    <Label
                      htmlFor="registeredName"
                      value="REGISTERED NAME"
                      className="mb-2 font-semibold uppercase"
                    />
                    <TextInput
                      type="text"
                      name="registeredName"
                      id="registeredName"
                      value={formData?.registeredName}
                      placeholder="Enter registered name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="tradeName"
                      value="TRADE NAME"
                      className="mb-2 font-semibold uppercase"
                    />
                    <TextInput
                      type="text"
                      name="tradeName"
                      id="tradeName"
                      value={formData?.tradeName}
                      placeholder="Enter trade name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          {/* Taxpayer Information Section */}
          <Accordion collapseAll={false}>
            <Accordion.Panel>
              <Accordion.Title className="bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Taxpayer Information</span>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="p-2">
                  <Label
                    htmlFor="taxpayerName"
                    value="TAXPAYER NAME"
                    className="mb-2 font-semibold uppercase"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <TextInput
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData?.lastName}
                      placeholder="LAST NAME"
                      onChange={handleChange}
                      required={
                        (formData?.firstName || formData?.middleName) && true
                      }
                    />
                    <TextInput
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData?.firstName}
                      placeholder="FIRST NAME"
                      onChange={handleChange}
                      required={
                        (formData?.lastName || formData?.middleName) && true
                      }
                    />
                    <TextInput
                      type="text"
                      name="middleName"
                      id="middleName"
                      value={formData?.middleName}
                      placeholder="MIDDLE NAME"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 p-2 mt-4">
                  <div>
                    <Label
                      htmlFor="authorizedRepresentativeName"
                      value="AUTHORIZED REPRESENTATIVE"
                      className="mb-2 font-semibold"
                    />
                    <TextInput
                      type="text"
                      name="authorizedRepresentativeName"
                      id="authorizedRepresentativeName"
                      value={formData?.authorizedRepresentativeName}
                      placeholder="Enter authorized representative"
                      onChange={handleChange}
                      required={formData?.position && true}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="position"
                      value="POSITION"
                      className="mb-2 font-semibold"
                    />
                    <TextInput
                      type="text"
                      name="position"
                      id="position"
                      value={formData?.position}
                      placeholder="Enter position"
                      onChange={handleChange}
                      required={formData?.authorizedRepresentativeName && true}
                    />
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          {/* Address & Contact Section */}
          <Accordion collapseAll={false}>
            <Accordion.Panel>
              <Accordion.Title className="bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Address & Contact Information</span>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="p-2">
                  <Label
                    htmlFor="businessAddress"
                    value="BUSINESS ADDRESS"
                    className="mb-2 font-semibold uppercase"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                    <div className="lg:col-span-4">
                      <TextInput
                        type="text"
                        name="businessStreetBrgy"
                        id="businessStreetBrgy"
                        value={formData?.businessStreetBrgy}
                        placeholder="STREET OR BARANGAY"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="lg:col-span-4">
                      <TextInput
                        type="text"
                        name="businessCity"
                        id="businessCity"
                        value={formData?.businessCity}
                        placeholder="CITY OR MUNICIPALITY"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <TextInput
                        type="text"
                        name="zip"
                        id="zip"
                        value={formData?.zip}
                        placeholder="ZIP CODE"
                        pattern="\d{4}"
                        maxLength="4"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 p-2 mt-4">
                  <div>
                    <Label
                      htmlFor="businessLine"
                      value="LINE OF BUSINESS"
                      className="mb-2 font-semibold"
                    />
                    <TextInput
                      type="text"
                      name="businessLine"
                      id="businessLine"
                      value={formData?.businessLine}
                      placeholder="Enter line of business"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="telNumber"
                        value="TELEPHONE NUMBER"
                        className="mb-2 font-semibold"
                      />
                      <TextInput
                        type="text"
                        name="telNumber"
                        id="telNumber"
                        value={formData?.telNumber}
                        placeholder="Enter telephone number"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="fax"
                        value="FAX"
                        className="mb-2 font-semibold"
                      />
                      <TextInput
                        type="text"
                        name="fax"
                        id="fax"
                        value={formData?.fax}
                        placeholder="Enter fax"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          {/* Registration Details Section */}
          <Accordion collapseAll={false}>
            <Accordion.Panel>
              <Accordion.Title className="bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Registration Details</span>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-2">
                  <div className="lg:col-span-3">
                    <Label
                      htmlFor="rdoNumber"
                      value="RDO"
                      className="mb-2 font-semibold uppercase"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                      <div className="lg:col-span-2">
                        <TextInput
                          type="text"
                          name="rdoNumber"
                          id="rdoNumber"
                          value={formData?.rdoNumber}
                          placeholder="RDO"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="lg:col-span-3">
                        <TextInput
                          type="text"
                          name="rdoCity"
                          id="rdoCity"
                          value={formData?.rdoCity}
                          placeholder="CITY OR MUNICIPALITY"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center mb-3">
                            <Radio
                              id="companyPeriod-1"
                              name="companyPeriod"
                              value="calendar"
                              checked={
                                !formData?.companyPeriod ||
                                formData?.companyPeriod === "calendar"
                              }
                              onChange={handleChange}
                              className="checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-600"
                            />
                            <Label htmlFor="companyPeriod-1" className="ms-2">
                              CALENDAR
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Radio
                              id="companyPeriod-2"
                              name="companyPeriod"
                              value="fiscal"
                              checked={formData?.companyPeriod === "fiscal"}
                              onChange={handleChange}
                              className="checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-600"
                            />
                            <Label htmlFor="companyPeriod-2" className="ms-2">
                              FISCAL
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="fiscalMonth"
                      value="FISCAL MONTH END"
                      className="mb-2 font-semibold uppercase"
                    />
                    <Select
                      name="fiscalMonth"
                      id="fiscalMonth"
                      value={formData?.fiscalMonth}
                      onFocus={handleSelectFocus}
                      onChange={handleChange}
                      required={companyPeriod === "fiscal"}
                      className="border-blue-600 focus:border-blue-600 focus:ring-blue-600"
                    >
                      <option
                        className="uppercase"
                        value=""
                        disabled={isFirstOptionDisabled}
                      >
                        Select Month
                      </option>
                      {months.map((month) => (
                        <option
                          key={month.value}
                          className="uppercase"
                          value={month.value}
                        >
                          {month.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 p-2 mt-4">
                  <div>
                    <Label
                      htmlFor="businessType"
                      value="BUSINESS TYPE"
                      className="mb-2 font-semibold"
                    />
                    <Select
                      name="businessType"
                      id="businessType"
                      value={formData?.businessType}
                      onFocus={handleSelectFocus}
                      onChange={handleChange}
                      required
                      className="border-blue-600 focus:border-blue-600 focus:ring-blue-600"
                    >
                      <option
                        className="uppercase"
                        value=""
                        disabled={isFirstOptionDisabled}
                      >
                        Select Business Type
                      </option>
                      <option className="uppercase" value="corporation">
                        CORPORATION
                      </option>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="registrationType"
                      value="REGISTRATION TYPE"
                      className="mb-2 font-semibold"
                    />
                    <Select
                      name="registrationType"
                      id="registrationType"
                      value={formData?.registrationType}
                      onFocus={handleSelectFocus}
                      onChange={handleChange}
                      required
                      className="border-blue-600 focus:border-blue-600 focus:ring-blue-600"
                    >
                      <option
                        className="uppercase"
                        value=""
                        disabled={isFirstOptionDisabled}
                      >
                        Select Reg. Type
                      </option>
                      <option className="uppercase" value="vat">
                        VAT REGISTERED
                      </option>
                    </Select>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          {/* Submit Button */}
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-3 rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={formStatus !== "idle"}
            >
              {formStatus === "idle" && (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Company Info
                </>
              )}
              {formStatus === "submitting" && (
                <>
                  <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Saving...
                </>
              )}
              {formStatus === "success" && (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Saved Successfully
                </>
              )}
            </Button>
          </div>
        </form>
      {/* </div> */}
    </>
  );
}