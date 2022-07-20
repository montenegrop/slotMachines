"use strict";
// <?xml version="1.0"?>
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountBalanceXML = exports.accountDetailsXML = void 0;
const accountDetailsXML = (token, publisher) => {
    const string = `
  <PKT>
    <Method Name="GetAccountDetails">
      <Auth Login="${publisher.login}" Password="${publisher.password}" />
      <Params>
        <Token Type="string" Value="${token}" />
      </Params>
    </Method>
  </PKT>
    `;
    return string;
};
exports.accountDetailsXML = accountDetailsXML;
const accountBalanceXML = (token, publisher) => {
    const string = `
    <PKT>
        <Method Name="GetAccountBalance">
            <Auth Login=${publisher.login} Password=${publisher.password}>
            <Paramas>
                <Token  Type="string" Value=${token} />
            </Params>
            </Auth>   
        <Method>
    <PKT>
    `;
    return string;
};
exports.accountBalanceXML = accountBalanceXML;
