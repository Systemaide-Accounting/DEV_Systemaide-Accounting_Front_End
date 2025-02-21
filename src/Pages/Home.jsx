import companyLogo from "../assets/company-logo.gif"

export function Home() {
  return (
    <>
      <div className="min-h-[92vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-auto transition-all duration-300 ease-in-out hover:scale-105">
            <img
              src={companyLogo}
              alt="logo"
              className="transition-opacity duration-300 ease-in-out hover:opacity-80 object-contain w-full h-full"
            />
        </div>
      </div>
    </>
  );
}
