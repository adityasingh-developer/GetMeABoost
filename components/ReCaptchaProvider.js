"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptchaProvider = ({ children, siteKey }) => {
  if (!siteKey) {
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaProvider;
