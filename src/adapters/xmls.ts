// <?xml version="1.0"?>

import { Publisher } from './interface'

export const accountDetailsXML = (token: string, publisher: Publisher): string => {
  const string = `
  <PKT>
    <Method Name="GetAccountDetails">
      <Auth Login="${publisher.login}" Password="${publisher.password}" />
      <Params>
        <Token Type="string" Value="${token}" />
      </Params>
    </Method>
  </PKT>
    `
  return string
}

export const accountBalanceXML = (token: string, publisher: Publisher): string => {
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
    `
  return string
}
