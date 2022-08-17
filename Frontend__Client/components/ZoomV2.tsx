

import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import styles from '../styles/Zoom.module.scss';
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');


interface ZoomProps {
  data: ZoomProp;
  jwtToken: JwtToken;
}
interface JwtToken {
token: string;
value: string;
}
interface ZoomProp {
  meetingNumber: string;
  userName: string;
  userEmail: string;
  role: number;
  password: string;
}
const ZoomV2 = (props: ZoomProps) => {
  const [meetingNumber, setMeetingNumber] = React.useState('');
  const [role, setRole] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [passWord, setPassword] = React.useState('');
  useEffect(() => {
    setMeetingNumber(props?.data?.meetingNumber);
    setRole(props?.data?.role);
    setUserName(props?.data?.userName);
    setUserEmail(props?.data?.userEmail);
    setPassword(props?.data?.password);
    getSignature();
  }, [getSignature, props]);

  // var signatureEndpoint = process.env.BACKEND_PROTOCOL + "://" + process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT + "/zoom/create-signature";
  var signatureEndpoint = "https://api.evenity.page:8443/zoom/create-signature";
  // var signatureEndpoint = "http://localhost:3000/zoom/create-signature";
  var sdkKey = "OWYLmd5UiEI0RchfL8tCFQapDQ7lqOzjNAi6"
  // var leaveUrl = 'http://localhost:8080/'
  var leaveUrl = 'https://api.evenity.page/'
  // var meetingNumber = props.data.meetingNumber.toString();
  // var role = props.data.role;

  // var userName = props.data.userName.toString();
  // var userEmail = props.data.userEmail.toString();
  // var passWord = props.data.password.toString();

  var registrantToken = ''

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getSignature() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    fetch(signatureEndpoint, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    })
    .then(res => res.json())
    .then(response => {
      // console.log(response)
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature: any) {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success: any) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success: any) => {
            console.log(success)
          },
          error: (error: any) => {
            console.log(error)
          }
        })

      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  return (
    <div>
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        {/* <button onClick={() => getSignature}>Join Meeting</button> */}
      </main>

      {/* <style global jsx>{`
        .zmmtg-root{
          display: none !important;
        }
      `}</style> */}
    </div>
  );
}

export default ZoomV2;
