import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const InvoiceNo = ({ invoice }) => {
  const dateString = new Date(invoice.orderTime).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.invoiceDate}>Invoice No: {invoice.orderID}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text>Date: {dateString}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text>
          Staff:{" "}
          {invoice.staffUsers
            ? invoice.staffUsers.firstName + " " + invoice.staffUsers.lastName
            : "Unconfirmed"}
        </Text>
      </View>
    </Fragment>
  );
};
export default InvoiceNo;
