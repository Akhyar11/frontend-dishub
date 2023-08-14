import NavbarAdmin from "./NavbarAdmin";
import React from "react";
import { useEffect } from "react";
import Card from "../../components/Card";
import Ruasjalan from "../../assets/18678-ruasjalan.png";
import Rambu from "../../assets/18678-NRTTQT.jpg";
import List from "../../components/admin/List";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const ruasJalan = useSelector((state) => state.ruasJalan);
  const rambu = useSelector((state) => state.rambu);
  const statusLogin = useSelector((state) => state.admin.statusLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!statusLogin) navigate("/login");
  }, []);
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="w-full md:flex">
          <Card
            title={"TOTAL RUAS JALAN"}
            description={"Total ruas jalan di Kota Boyolali adalah"}
            count={ruasJalan.total}
            image={Ruasjalan}
            addClas="md:mr-8"
          />
          <Card
            title={"TOTAL RAMBU"}
            description={"Total rambu di Kota Boyolali adalah"}
            count={rambu.total}
            image={Rambu}
          />
        </div>
        <List />
      </div>
    </>
  );
};

export default DashboardAdmin;
