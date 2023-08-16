import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    // fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
    fontSize: 10,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
});

const InvoiceTableRow = ({ items }) => {
  // console.log(items);
  const rows = items.map((item) => (
    <View style={styles.row} key={item.orderItemID.toString()}>
      <Text style={styles.description}>{item.product.name}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>
        {item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
      <Text style={styles.amount}>
        {(item.quantity * item.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
