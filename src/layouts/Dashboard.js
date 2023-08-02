import React from "react";
import Card from "../components/Card";
import Ruasjalan from "../assets/18678-ruasjalan.png";
import Rambu from "../assets/18678-NRTTQT.jpg";
import List from "../components/List";

const Dashboard = () => {
  return (
    <div className="p-8 mx-36">
      <div className="w-full flex">
        <Card
          title={"TOTAL RUAS JALAN"}
          description={"Total ruas jalan di Kota Boyolali adalah"}
          count={200}
          image={Ruasjalan}
        />
        <Card
          title={"TOTAL RAMBU"}
          description={"Total rambu di Kota Boyolali adalah"}
          count={200}
          image={Rambu}
        />
      </div>
      <List />
    </div>
  );
};

export default Dashboard;
