import React from 'react'
import {View, Text, Button} from 'react-native'
import { WebView } from 'react-native-webview'

export default class Home extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      html: '',
      html1: `
      
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Zaakpay</title>
<script type="text/javascript">
function submitForm(){
			var form = document.forms[0];
			form.submit();
		}
</script>
</head>
<body>
<body onload="">
<center>
<table width="500px;">
	<tr>
		<td align="center" valign="middle">Do Not Refresh or Press Back <br/> Redirecting to Zaakpay</td>
	</tr>
	<tr>
		<td align="center" valign="middle">
			<form action="https://api.zaakpay.com/api/paymentTransact/V7" method="post">
<input type="hidden" name="buyerEmail", value="songwei@mintechai.com">
<input type="hidden" name="currency", value="INR">
<input type="hidden" name="orderId", value="QY1565945861891779376">
<input type="hidden" name="returnUrl", value="http://www.villeboss.com:10080/api/user/callback?">
<input type="hidden" name="amount", value="5000">
<input type="hidden" name="checksum", value="c0d9bd863284351bcc2e37358cc66ba305935a372a8b48642e4b6f2490091991">
</form>
		</td>
	</tr>
	<tr>
		<button onclick="submitForm()">OK 提交</button>
	</tr>
</table>
</center>	
</body>
</html>
`
    }
  }
  render() {
    let { html }: any = this.state
    if (!html) {
      return (
        <Button title="点击" onPress={this.getMobiwik}/>
      )
    }
    return (
      <WebView source={{html: html}}/>
    )
  }

  getMobiwik = async () => {
    let url = 'https://api.zaakpay.com/api/paymentTransact/V7'
    const options: any = {
      "amount": '5000',
      "buyerEmail": 'songwei@mintechai.com',
      "currency": 'INR',
      "orderId": 'QY1565945861891779376',
      "returnUrl": 'http://www.villeboss.com:10080/api/user/callback?',
      "checksum": 'c0d9bd863284351bcc2e37358cc66ba305935a372a8b48642e4b6f2490091991'
    }
    let _tmpArr = []
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
          let encodeKey = encodeURIComponent(key);
          let encodeValue = encodeURIComponent(options[key]);
          _tmpArr.push(encodeKey + '=' + encodeValue)
      }
    }
    let formBody = _tmpArr.join('&')
    console.log(formBody)
    let req = {
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: formBody
    }
    let res = await fetch(url, req)
    console.log(res)
    let html = await res.text()
    console.log(html)
    this.setState({html: html})
  }
}







