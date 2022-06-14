import React from "react";
import BlacklistedIPs from "./blacklisted-ips/BlacklistedIPs";
import CorsOptions from "./cors-options/CorsOptions";
import WhitelistedIPs from "./whitelisted-ips/WhitelistedIPs";

export default function AdvancedOptions() {
  return (
    <div>
      <CorsOptions />
      <WhitelistedIPs />
      <BlacklistedIPs />
    </div>
  );
}
