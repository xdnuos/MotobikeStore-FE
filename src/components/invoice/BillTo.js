import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>Fullname: {invoice.fullname}</Text>
    <Text>Phone: {invoice.phone}</Text>
    <Text>Address: {invoice.address}</Text>
    <Text>Note: {invoice.note}</Text>
    <Text>Payment: {invoice.payment}</Text>
  </View>
);

export default BillTo;
