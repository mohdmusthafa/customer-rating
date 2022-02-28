import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API } from "aws-amplify";
import { nanoid } from "nanoid";
import styles from "../../styles/Admin.module.css";
import { Form, Input, Button } from "semantic-ui-react";
import getOperatingSystem from "../../utils/getOS";
function AddCustomer() {
  const [vehicle_no, setVehicleNo] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("")
  const [addedToDB, setAddedToDB] = useState(false);
  const [id, setId] = useState(nanoid(10));

  const router = useRouter();
  const apiName = "review";

  useEffect(() => {
    setOperatingSystem(getOperatingSystem())
  }, [])

  const addCustomerToDB = async () => {
    const body = {
      vehicle_no,
      phone_no,
    };

    if (!addedToDB) {
      const response = await API.post(apiName, `/review/${id}`, {
        body: body
      })

      if (response.success) {
        setAddedToDB(true);
      }
    }

    return `http:/%2f21.21.21.160:3000/review/${id}`;
  };


  const generateSMS = (messageBody, phone, os) => {
    if (os == 'ios') {
      return `sms:${phone}&body=${messageBody}`;
    }

    if (os == 'android') {
      return `sms:${phone};body=${messageBody}`;
    }
  }

  const createMessage = async () => {
    const link = await addCustomerToDB();
    const processedLink = link.replace("//", "/%2f");
    const messageBody = `Thank you for servicing your vehicle ${vehicle_no} with us, Please rate our service using the link. %0aThankyou%0a${processedLink}`;
    return messageBody;
  }

  const handleSMSClick = async () => {
    const message = await createMessage();
    const smsStringPath = generateSMS(message, phone_no, operatingSystem)
    console.log(smsStringPath)
    router.replace(smsStringPath);
  };


  const handleWhatsApp = async () => {
    const message = await createMessage();
    const whatsappStringPath = `https://wa.me/91${phone_no}?text=${message}`;
    router.replace(whatsappStringPath)
  }

  return (
    <div className={styles.container}>
      <h1>Add Customer</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Field>
          <label>Vehicle Number</label>
          <Input
            value={vehicle_no}
            onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
            placeholder="KLXXAXXXX"
          />
        </Form.Field>

        <Form.Field>
          <label>Phone Number</label>
          <Input
            type="tel"
            value={phone_no}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Phone Number"
          />
        </Form.Field>
        <div className={styles.share_btns}>
          <Button
            content="Share via SMS"
            icon="chat"
            labelPosition="left"
            onClick={handleSMSClick}
          />
          <Button
            content="Share via WhatsApp"
            icon="whatsapp"
            labelPosition="left"
            onClick={handleWhatsApp}
          />
        </div>
      </Form>
    </div>
  );
}

export default withAuthenticator(AddCustomer);
