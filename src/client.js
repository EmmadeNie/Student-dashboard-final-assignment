const apiUrl =
  "https://script.googleusercontent.com/macros/echo?user_content_key=YmU6eSi5Fzigj-kXqgfJnYza5vLE_a3OJMcPcViV_dwARibRwPbEv80lCehHEemL3Jc8NRyZVDuhLgOdrr-dwUAVRRAUIttDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCbICk5PDvHAZKytjTtsXLdwZceb7pnMV3Jq7uvdcL0uffUWO8ZrHgfjiCO7xLEOmmi4h2T7mYvt&lib=MAiEp7iWxCR8ynpaFXe3KZbwFOezA__4g";

const getData = async function () {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
};

export default getData;
