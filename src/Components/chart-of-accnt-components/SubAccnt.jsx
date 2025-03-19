import { useContext, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Modal, Label, TextInput } from "flowbite-react";
import ChartOfAccntContext from "../../context/ChartOfAccntContext";

export function SubAccnt() {
    
    const { selectedAccount } = useContext(ChartOfAccntContext);
    const [openModal, setOpenModal] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [accountCode, setAccountCode] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const data = [
      { id: 1, code: "2000", name: "Accounts Payable" },
      { id: 2, code: "2100", name: "Accrued Expenses" },
      { id: 3, code: "2200", name: "Notes Payable" },
      { id: 4, code: "2300", name: "Unearned Revenue" },
    ];

    const filteredData = data.filter(
      (item) =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (e, item) => {
      e.stopPropagation();
      console.log("Edit item:", item);
      // Implement edit functionality here
    };

    const handleDelete = (e, item) => {
      e.stopPropagation();
      console.log("Delete item:", item);
      // Implement delete functionality here
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("New account:", { title: accountName, code: accountCode });
      // Here you would typically update your state or send data to an API
      setAccountName("");
      setAccountCode("");
      setOpenModal(false);
    };

    return (
      <>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex justify-end items-center mb-4">
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={selectedAccount ? false : true}
              onClick={() => setOpenModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Sub-Account
            </button>
          </div>
          <h2 className="text-xl mb-4">
            {selectedAccount && selectedAccount?.accountName} - Account
          </h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-2">Code</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="px-4 py-2">{item.code}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => handleEdit(e, item)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Add New Sub-Account</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="accountClass" value="Account Class" />
                </div>
                <TextInput
                  id="accountClass"
                  type="text"
                  required={true}
                  value={selectedAccount?.name || ""}
                  readOnly={true}
                  color="failure"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="accountName" value="Account Name" />
                </div>
                <TextInput
                  id="accountName"
                  type="text"
                  placeholder="Enter account name"
                  required={true}
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="accountCode" value="Account Code" />
                </div>
                <TextInput
                  id="accountCode"
                  type="text"
                  placeholder="Enter account code"
                  required={true}
                  value={accountCode}
                  onChange={(e) => setAccountCode(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Add
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
}