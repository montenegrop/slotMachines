"use strict";
// <?xml version="1.0"?>
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeBetXML = exports.accountBalanceXML = exports.accountDetailsXML = void 0;
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
            <Auth Login="${publisher.login}" Password="${publisher.password}">
            <Paramas>
                <Token  Type="string" Value="${token}" />
            </Params>
            </Auth>   
        <Method>
    <PKT>
    `;
    return string;
};
exports.accountBalanceXML = accountBalanceXML;
const placeBetXML = (token, bet, publisher, transactionID, betReferenceNum, gameReference) => {
    const string = `
    <PKT>
      <Method Name="PlaceBet">
      <Auth Login="${publisher.login}" Password="${publisher.password}" />
        <Params>
          <Token Type="string" Value="${token}" />
          <TransactionID Type="string" Value="${transactionID}" />
          <BetReferenceNum Type="long" Value="${betReferenceNum}" />
          <BetAmount Type="int" Value="${bet}" />
          <GameReference Type="string" Value="${gameReference}" />
        </Params>
      </Method>
    </PKT>
    `;
    return string;
};
exports.placeBetXML = placeBetXML;
