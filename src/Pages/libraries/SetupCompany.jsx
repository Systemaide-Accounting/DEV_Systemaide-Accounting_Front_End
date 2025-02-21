import { useState } from "react";

export function SetupCompany() {

  const [isFirstOptionDisabled, setIsFirstOptionDisabled] = useState(false);
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

  const handleSelectFocus = () => {
    setIsFirstOptionDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
      <div className="p-4 pt-1 rounded-lg dark:border-gray-700">
        <h1>Setup Company</h1>
        {/* SETUP COMPANY FORM */}
        <div className="flex items-center justify-center h-auto p-4 rounded bg-blue-100 dark:bg-gray-800">
          <section className="w-full bg-blue-100 dark:bg-gray-900">
            <form action="#" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-center rounded lg:w-1/3 h-auto dark:bg-gray-800">
                  <label
                    htmlFor="tin"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    TIN
                  </label>
                  <input
                    type="text"
                    name="tin"
                    id="tin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type TIN number"
                    required
                  />
                </div>
                <div className="lg:flex lg:justify-end">
                  <div className="flex flex-col justify-center rounded lg:w-2/3 h-auto dark:bg-gray-800">
                    <label
                      htmlFor="tax_classification"
                      className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                    >
                      TAXPAYER CLASSIFICATION
                    </label>
                    <select
                      name="tax_classification"
                      id="tax_classification"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      onFocus={handleSelectFocus}
                      required
                    >
                      <option
                        className="uppercase"
                        value=""
                        // disabled={selectedValue !== ""}
                        disabled={isFirstOptionDisabled}
                      >
                        Select Classification
                      </option>
                      <option className="uppercase" value="NON-INDIVIDUAL">
                        NON-INDIVIDUAL
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-center rounded dark:bg-gray-800">
                  <label
                    htmlFor="company_name"
                    className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company NAME
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Company Name"
                    required
                  />
                </div>
                <div className="flex flex-col justify-center rounded dark:bg-gray-800">
                  <label
                    htmlFor="trade_name"
                    className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                  >
                    TRADE NAME
                  </label>
                  <input
                    type="text"
                    name="trade_name"
                    id="trade_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Trade Name"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center mb-4 rounded dark:bg-gray-800">
                <label
                  htmlFor="taxpayer_name"
                  className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                >
                  Taxpayer NAME
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="LAST NAME"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="FIRST NAME"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="MIDDLE NAME"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center mb-4 rounded dark:bg-gray-800">
                <label
                  htmlFor="bussiness_address"
                  className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                >
                  BUSINESS ADDRESS
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                  <div className="flex items-center lg:col-span-4 justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="street_brgy"
                      id="street_brgy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="STREET OR BARANGAY"
                      required
                    />
                  </div>
                  <div className="flex items-center lg:col-span-4 justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="business_city"
                      id="business_city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="CITY OR MUNICIPALITY"
                      required
                    />
                  </div>
                  <div className="flex items-center lg:col-span-2 justify-center h-auto rounded dark:bg-gray-800">
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="ZIP CODE"
                      pattern="\d{4}"
                      maxLength="4"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4 rounded dark:bg-gray-800">
                <div className="flex flex-col lg:col-span-3">
                  <label
                    htmlFor="rdo"
                    className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                  >
                    RDO
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                    <div className="flex items-center lg:col-span-2 justify-center h-auto rounded dark:bg-gray-800">
                      <input
                        type="text"
                        name="rdo_number"
                        id="rdo_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="NUMBER"
                        pattern="\d{3}"
                        maxLength="3"
                        inputMode="numeric"
                        required
                      />
                    </div>
                    <div className="flex items-center lg:col-span-3 justify-center h-auto rounded dark:bg-gray-800">
                      <input
                        type="text"
                        name="rdo_city"
                        id="rdo_city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="CITY OR MUNICIPALITY"
                        required
                      />
                    </div>
                    <div className="flex lg:flex-col lg:col-span-2 justify-start gap-4 lg:gap-2 h-auto rounded dark:bg-gray-800">
                      <div className="flex items-center">
                        <input
                          checked
                          id="radio-period-1"
                          type="radio"
                          value="CALENDAR"
                          name="radio-period"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="radio-period-1"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          CALENDAR
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="radio-period-2"
                          type="radio"
                          value="FISCAL"
                          name="radio-period"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="radio-period-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          FISCAL
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:col-span-2">
                  <label
                    htmlFor="fiscal_month"
                    className="block mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FISCAL MONTH END
                  </label>
                  <select
                    name="tax_classification"
                    id="tax_classification"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    onFocus={handleSelectFocus}
                    required
                  >
                    <option
                      className="uppercase"
                      value=""
                      // disabled={selectedValue !== ""}
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
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-center rounded h-auto dark:bg-gray-800">
                  <label
                    htmlFor="business_type"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    BUSINESS TYPE
                  </label>
                  <select
                    name="business_type"
                    id="business_type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    onFocus={handleSelectFocus}
                    required
                  >
                    <option
                      className="uppercase"
                      value=""
                      // disabled={selectedValue !== ""}
                      disabled={isFirstOptionDisabled}
                    >
                      Select Business Type
                    </option>
                    <option className="uppercase" value="CORPORATION">
                      CORPORATION
                    </option>
                  </select>
                </div>
                <div className="flex flex-col justify-center rounded h-auto dark:bg-gray-800">
                  <label
                    htmlFor="reg_type"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    REGISTRATION TYPE
                  </label>
                  <select
                    name="reg_type"
                    id="reg_type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    onFocus={handleSelectFocus}
                    required
                  >
                    <option
                      className="uppercase"
                      value=""
                      // disabled={selectedValue !== ""}
                      disabled={isFirstOptionDisabled}
                    >
                      Select Reg. Type
                    </option>
                    <option className="uppercase" value="VAT REGISTERED">
                      VAT REGISTERED
                    </option>
                  </select>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-center rounded h-auto dark:bg-gray-800">
                  <label
                    htmlFor="business_line"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    LINE OF BUSINESS
                  </label>
                  <input
                    type="text"
                    name="business_line"
                    id="business_line"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Line of Business"
                    required
                  />
                </div>
                {/* <div className="flex lg:grid lg:grid-cols-2 gap-4 justify-center rounded h-auto dark:bg-gray-800">
                  <div className="flex flex-col col-span-1">
                    <label
                      htmlFor="tel_number"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      TELEPHONE NUMBER
                    </label>
                    <input
                      type="text"
                      name="tel_number"
                      id="tel_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Telephone Number"
                      required
                    />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <label
                      htmlFor="fax"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      FAX
                    </label>
                    <input
                      type="text"
                      name="fax"
                      id="fax"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Fax"
                      required
                    />
                  </div>
                </div> */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 justify-center rounded h-auto dark:bg-gray-800">
                  <div className="flex flex-col col-span-1">
                    <label
                      htmlFor="tel_number"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      TELEPHONE NUMBER
                    </label>
                    <input
                      type="text"
                      name="tel_number"
                      id="tel_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Telephone Number"
                      required
                    />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <label
                      htmlFor="fax"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      FAX
                    </label>
                    <input
                      type="text"
                      name="fax"
                      id="fax"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Fax"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col justify-center rounded h-auto dark:bg-gray-800">
                  <label
                    htmlFor="representative"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    AUTHORIZED REPRESENTATIVE
                  </label>
                  <input
                    type="text"
                    name="representative"
                    id="representative"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Authorized Representative"
                    required
                  />
                </div>
                <div className="flex flex-col justify-center rounded h-auto dark:bg-gray-800">
                  <label
                    htmlFor="position"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    POSITION
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Position"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center px-5 py-2.5 uppercase text-sm text-white mt-4 border border-transparent rounded-md bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </form>
          </section>
        </div>
      </div>
  );
}
