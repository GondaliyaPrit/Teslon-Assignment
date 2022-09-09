import "../App.css";
import { useState } from 'react';
function Header() {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="header">
        <img
          src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png"
          className="logo"
          alt="header-logo"
        />
      </div>
    </>
  );
}

export default Header;
