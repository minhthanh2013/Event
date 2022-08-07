

import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import styles from '../styles/Zoom.module.scss';
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const ZoomV2 = () => {

  useEffect(() => {
    getSignature();
  }, [getSignature]);
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  // var signatureEndpoint = process.env.BACKEND_PROTOCOL + "://" + process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT + "/zoom/create-signature";
  var signatureEndpoint = "https://api.evenity.page:8443/zoom/create-signature";
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = "OWYLmd5UiEI0RchfL8tCFQapDQ7lqOzjNAi6"
  var meetingNumber = '86728842678'
  var role = 0
  var leaveUrl = 'http://localhost:8080/'
  var userName = 'React'
  var userEmail = ''
  var passWord = '912284'
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
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
    console.log(signature)
    console.log(ZoomMtg)
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
