import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  let state={
    mobile:"",
    smsBody: "",
    topic:"",
    token:"",
    title:"",
    msgBody:""
  }
  const getMobileNumber=(event)=>{
    state.mobile = event.target.value;
    console.log(state);
  }
  const getSmsBody=(event)=>{
    state.smsBody = event.target.value;
    console.log(state);
  }
  const getTopic=(event)=>{
    state.topic = event.target.value;
    console.log(state);
  }
  const getTitle=(event)=>{
    state.title = event.target.value;
    console.log(state);
  }
  const getToken=(event)=>{
    state.token = event.target.value;
    console.log(state);
  }
  const getmsgBody=(event)=>{
    state.msgBody = event.target.value;
    console.log(state);
  }
  const handleSendMessage = (event)=>{
    smsApiCall(state);
  }
  const handleSendNotification = (event)=>{
    pushNotificationApiCall(state);
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
                <Button color="primary">Send Message</Button>
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
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Enter Topic"
                  id="topic"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: getTopic
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Enter Token"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 1,
                  onChange: getToken
                }}
              />
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
                <Button color="primary">Send Notfication</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>

  );
}
