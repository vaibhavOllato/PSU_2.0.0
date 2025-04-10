import React from "react";
import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import companyLogo from "../assets/companyLogo.png";
import coverImg from "../assets/cover.png";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#5F1854",
  },
  logo: {
    width: 280,
    height: 190,
  },
  cover: {
    width: 430,
    height: 460,
  },
  section: {
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    color: "black",
    lineHeight: 2,
  },
  notExam:{
    fontSize:15,
    color:'red',
    marginTop:15,
  },
});

function FirstPage() {
  return (
    <Page style={styles.page} size={"A4"}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Ollato's Mind Mapping Assessment Report
        </Text>

        <Text style={styles.notExam}>
          Please complete the test first, and then the report will be generated.
        </Text>
      </View>

      <View style={styles.header}>
        <Image source={coverImg} style={styles.cover} />
        <Text style={styles.title}>Ollato Eduversity </Text>
     
        {/* <button
          style={{
            padding: "10px 20px",
            fontSize: "14px",
            border: "2px",
            borderColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          // onClick={() => navigate("/dashboard")} // Replace with your navigation logic
        >
          Go to Dashboard
        </button> */}
        <Text style={styles.contact}>
          618, Nirmal Corporate Centre, LBS Road, Mulund West{"\n"}
          Email: info@ollato.com / info@seracedu.com{"\n"}
          Contact: 9967153285. Website: ollato.com
        </Text>
      </View>
    </Page>
  );
}

export default FirstPage;
