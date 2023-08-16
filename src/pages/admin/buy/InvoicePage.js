import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import InvoiceTitle from "src/components/invoice/InvoiceTitle";
import BillTo from "src/components/invoice/BillTo";
import InvoiceNo from "src/components/invoice/InvoiceNo";
import InvoiceItemsTable from "src/components/invoice/InvoiceItemsTable";
import InvoiceThankYouMsg from "src/components/invoice/InvoiceThankYouMsg";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { orderService } from "src/services/orderService";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
// import logo from "../../../src/logo.png";
import Roboto from "../../../assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "../../../assets/fonts/Roboto/Roboto-Bold.ttf";
import RobotoItalic from "../../../assets/fonts/Roboto/Roboto-Italic.ttf";
import RobotoBoldItalic from "../../../assets/fonts/Roboto/Roboto-BoldItalic.ttf";
import RobotoLight from "../../../assets/fonts/Roboto/Roboto-Light.ttf";
import { setIn } from "formik";
import { useDispatch, useSelector } from "react-redux";
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: Roboto,
    },
    {
      src: RobotoBold,
      fontWeight: "bold",
    },
    {
      src: RobotoItalic,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: RobotoBoldItalic,
      fontWeight: "bold",
      fontStyle: "italic",
    },
    {
      src: RobotoLight,
      fontWeight: "light",
    },
  ],
  format: "truetype",
});
const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 15,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function Invoice() {
  const { orderID } = useParams();
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await orderService.getOrdersID(orderID);
        setInvoice(response); // Assuming response contains the order detail data
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };
    getOrderDetail();
  }, [orderID]);
  if (invoice?.orderID === undefined) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  console.log(invoice);
  return (
    <Fragment>
      <PDFViewer
        style={{
          width: "100%",
          height: "100%",
          display: "table",
          margin: "0 auto",
        }}
      >
        <Document>
          <Page size="A4" style={styles.text}>
            <Image style={styles.logo} src="{logo}" />
            <InvoiceTitle title="Invoice" />
            <InvoiceNo invoice={invoice} />
            <BillTo invoice={invoice} />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceThankYouMsg />
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
}
export default Invoice;
