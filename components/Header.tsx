// Header.tsx

import React from "react";

const Header: React.FC = () => {
    return (
        <header className="w-full p-6 bg-green-600 text-white flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-rubikMonoOne">FundTheKeystone</h1>
            </div>
            <div>
                <a href="facebook.com/fundthekeystone" className="mx-2">Facebook</a>
                <a href="instagram.com/fundthekeystone" className="mx-2">Instagram</a>
            </div>
        </header>
    );
};

export default Header;