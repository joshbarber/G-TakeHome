import React from "react";
import { Image, Text, View, Page, Document } from "@react-pdf/renderer";
import wave from "../wave.png";
import { getFormattedDate, styles } from "../utils";

const PDFInvoice = ({ data, billTo }) => {
  const { result } = data || {};
  const { listing } = result || {};
  console.log(data);

  let amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(listing?.sellingPrice);

  const equipmentImage = listing?.imageUrls[0];

  const todayDate = getFormattedDate();

  function generateRandomFiveDigitNumber() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const randomNumber = generateRandomFiveDigitNumber();

  const Header = () => (
    <View style={styles.titleContainer}>
      <View style={styles.headerText}>
        <View>
          <Image style={styles.logo} src={wave} />
          <Text style={styles.reportTitle}>Garage Technologies, Inc.</Text>
        </View>
        <View>
          <Text style={styles.invoice}>Invoice </Text>
          <Text style={styles.invoiceNumber}>Invoice #: {randomNumber}</Text>
          <Text style={styles.addressTitle}>Date: {todayDate} </Text>
          <Text style={styles.addressTitle}>Balance Due: {amount} </Text>
        </View>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.headerText}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Bill to: </Text>
          <Text style={styles.address}>{listing?.billTo}</Text>
        </View>
        <Text style={styles.addressTitle}>{todayDate}</Text>
      </View>
    </View>
  );

  const Columns = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Item</Text>
      </View>
      <View style={styles.theader}>
        <Text>Quantity</Text>
      </View>
      <View style={styles.theader}>
        <Text>Price</Text>
      </View>
    </View>
  );

  const Rows = () => (
    <React.Fragment>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{listing?.listingTitle}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{1}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{amount} </Text>
        </View>
      </View>
    </React.Fragment>
  );

  const Total = () => (
    <View style={styles.titleContainer}>
      <View style={styles.totalContainer}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Subtotal: {amount} </Text>
          <Text style={styles.addressTitle}>Tax: $0.00 </Text>
          <Text style={styles.addressTitle}>Total: {amount} </Text>
        </View>
      </View>
    </View>
  );

  const InvoiceDesc = () => (
    <View style={styles.titleContainer}>
      <View style={styles.headerText}>
        <View style={{ maxWidth: 400 }}>
          <Text style={styles.addressTitle}>Details: </Text>
          <Text style={styles.desc}>{listing?.listingDescription} </Text>
          {equipmentImage && <Image style={styles.logo} src={equipmentImage} />}
        </View>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Address />
        <Columns />
        <Rows />
        <Total />
        <InvoiceDesc />
      </Page>
    </Document>
  );
};

export default React.memo(PDFInvoice);
