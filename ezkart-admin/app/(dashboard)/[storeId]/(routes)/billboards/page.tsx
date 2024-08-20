import { BillBoardClient } from "./components/client";

const Billboardspage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient/>
      </div>
    </div>
  );
};

export default Billboardspage;
