export default function Pages() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* //right div */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form>
          <div className=" flex items-center gap-2 ">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            ></input>
          </div>
        </form>
      </div>

      {/* //left div */}
      <div className="">
        <h1>Listing Results:</h1>
      </div>
    </div>
  );
}
