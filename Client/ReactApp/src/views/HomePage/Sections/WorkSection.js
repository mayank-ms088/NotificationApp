import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
//utils
import {smsApiCall,pushNotificationApiCall} from "utils/apiCalls.js";
//styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  let state={
    sms: { 
      mobile:"",
      smsBody: ""
    },
    pushNotification: { 
      title:"",
      message:"",
      topic:"",
      token:""
    }
  }
  const getMobileNumber=(event)=>{
    state.sms.mobile = event.target.value;
    //console.log(state.sms);
  }
  const getSmsBody=(event)=>{
    state.sms.smsBody = event.target.value;
    //console.log(state.sms);
  }
  const getTitle=(event)=>{
    state.pushNotification.title = event.target.value;
    //console.log(state.pushNotification);
  }
  const getmsgBody=(event)=>{
    state.pushNotification.message = event.target.value;
    //console.log(state.pushNotification);
  }
  const handleSendMessage = (event)=>{
    event.preventDefault();
    smsApiCall(state.sms);
    alert("SMS Sent!!");
    window.location.reload();
  }
  const handleSendNotification = (event)=>{
    event.preventDefault();
    pushNotificationApiCall(state.pushNotification);
    alert("You Must have received Push Notification");
    window.location.reload();
  }
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Available Services</h2>
        </GridItem>
        <GridItem cs={12} sm={12} md={8}>
          <h4 className={classes.title}>
            Enter SMS INFO
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Mobile Number"
                  id="Number"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "mobile",
                    onChange: getMobileNumber
                    
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  type: "msg",
                  onChange: getSmsBody
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={handleSendMessage}>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>

        <GridItem cs={12} sm={12} md={8}>
          <h4 className={classes.title}>
            Enter Notfication INFO
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Enter Title"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: getTitle
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  onChange: getmsgBody
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={handleSendNotification}>Send Notfication</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>

  );
}