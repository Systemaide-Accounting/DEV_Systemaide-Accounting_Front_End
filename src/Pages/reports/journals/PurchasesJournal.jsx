export function PurchasesJournal() {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1>Purchases Journal</h1>
        {/* 3 columns but vertical for mobile devices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
        {/* fixed 3 columns */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-blue-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 rounded bg-blue-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 rounded bg-blue-100 dark:bg-gray-800"></div>
        </div>
        {/* 3 column-size per card but overflows horizontally when added */}
        {/* <div className="grid grid-cols-3 gap-4 mb-4"> */}
        <div className="grid grid-flow-col gap-4 mb-4 overflow-x-auto">
          <div className="flex items-center justify-center h-24 min-w-[85px] lg:min-w-[220px] md:min-w-[142px] rounded bg-green-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 min-w-[85px] lg:min-w-[220px] md:min-w-[142px] rounded bg-green-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 min-w-[85px] lg:min-w-[220px] md:min-w-[142px] rounded bg-green-100 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center h-24 min-w-[85px] lg:min-w-[220px] md:min-w-[142px] rounded bg-green-100 dark:bg-gray-800"></div>
        </div>

        {/* 1 column */}
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-red-100 dark:bg-gray-800"></div>
        {/* fixed 2 columns */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-yellow-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-yellow-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-yellow-100 h-28 dark:bg-gray-800"></div>
        </div>
        {/* 4 columns become 2 columns for mobile devices */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-purple-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-purple-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-purple-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-purple-100 h-28 dark:bg-gray-800"></div>
        </div>

        {/* unequal columns */}
        <div className="grid sm:grid-cols-3 gap-4 ">
          <div className="flex items-center sm:col-span-2 justify-center rounded bg-orange-100 h-28 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center rounded bg-orange-100 h-28 dark:bg-gray-800"></div>
        </div>
      </div>
    </>
  );
}
