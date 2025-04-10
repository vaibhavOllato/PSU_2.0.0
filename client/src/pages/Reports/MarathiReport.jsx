import React, { useState, useEffect } from "react";
import reportData from "../../public/marathiReport.json"; 
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import axios from "axios";

import NotoSansDevanagari from "../../assets/font/static/NotoSansDevanagari-Regular.ttf";
import companyLogo from "../../assets/companyLogo.png";
import coverImg from "../../assets/Cover-Student.jpeg";
import { Image } from "@react-pdf/renderer";
import secondImg from "../../assets/secondImg.png";
import FirstPage from "../../constant/FirstPage";


// Register the font
Font.register({
  family: "Noto Sans Devanagari",
  src: NotoSansDevanagari,
});

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 18,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "Noto Sans Devanagari",
    textAlign: "center",
  },
  logo: {
    width: 180,
    height: 130,
  },
  cover: {
    width: 450,
    height: 440,
  },
  section: {
    marginBottom: 15,
    fontFamily: "Noto Sans Devanagari",
  },
  title: {
    // fontSize: 16,
    fontFamily: "Noto Sans Devanagari",
    // marginBottom: 5,
    fontSize: 24,
    // fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "purple",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Noto Sans Devanagari",
    // fontFamily: "Noto Sans Devanagari", 
  },
  contact: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
    lineHeight: 2,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    textAlign: "left",
  },
  tableHeader: {
    backgroundColor: "#f95959",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    fontFamily: "Noto Sans Devanagari",
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    // fontSize: 10,
    // fontFamily: "Helvetica",
    color: "#fcfefe",
    backgroundColor: "#155263",
    padding: 10,
  },
  footerLeft: {
    flex: 1,
    textAlign: "left",
  },
  footerCenter: {
    flex: 1,
    textAlign: "center",
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
  listItem: {
    marginBottom: 5,
  },
   messageSection: {
    marginTop: 20,
    textAlign: "left",
    fontFamily: "Noto Sans Devanagari", // Ensure you're applying your registered font
  },
  greeting: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
    color: "blue",
  },
  second: {
    width: 250,
    height: 200,
  },
  message: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "Noto Sans Devanagari",
  },
  summeryTable: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    marginBottom: 20,
    marginTop: 10,
  },
  summeryTableRow: {
    flexDirection: "row",
  },
  summeryTableCell: {
    flex: 1,
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    textAlign: "center",
  },
  summeryTableHeader: {
    backgroundColor: "#f95959",
    fontWeight: "bold",
    textAlign: "center",
  },
  reportDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  detailedDiscussion: {
    fontSize: 12,
    marginTop: 10,
  },
  ReportHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  reportLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  domainName: {
    fontSize: 12,
    color: "purple",
    textTransform: "capitalize",
  },
  chartContainerBar: {
    marginTop: 30,
  },
  clientName: {
    fontSize: 14,
    color: "blue",
    marginBottom: 5,
  },
  contentBox: {
    paddingTop: 0,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: -20,
  },
  contentBoxText: {
    fontSize: 12,
    paddingRight: 12,
    paddingLeft: 12,
    lineHeight: 1.3,
  },
  contentBoxFinding: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingLeft: 2,
    gap: 20,
  },
  reportSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
    marginRight: 2,
    padding: 5,
    borderRadius: 8,
  },
  domainTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#f95959",
    padding: 5,
    color: "white",
    width: 260,
  },
  keyFindingTitle: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  keyFindingDescription: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 1.3,
  },
  rightColumn: {
    flex: 1,
    marginRight: 2,
    padding: 5,
    borderRadius: 8,
  },
  keycontentBox: {
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    borderColor: "red",
    height: 100,
    width: 250,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    border: 2,
  },
  improvementBox: {
    padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    borderColor: "red",
    height: 150,
    width: 260,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    border: 2,
  },
  improvementTitle: {
    fontWeight: "bolder",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 5,
    marginTop: 8,
    color: "red",
  },
  improvementDescription: {
    fontSize: 15,
    marginTop: 5,
    textAlign: "justify",
  },
  domainBottomTitle: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  
  contactItem: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "Noto Sans Devanagari",
  },
  contactDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 10,
    backgroundColor: "brown",
    padding: "5",
  },
  ReportFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#155263",
    color: "#fcfefe",
    borderTop: "1px solid #ddd",
  },
  reportFooterLeft: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  reportFooterCenter: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  reportFooterRight: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 10,
  },
  progressBarContainerGraph: {
    width: "100%",
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 10,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 10,
  },
  progressPercentage: {
    marginTop: 5,
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  contactSection: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#e0ffcd",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactInfo: {
    fontSize: 12,
    color: "#333",
  },
  contactLink: {
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  commonData: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Noto Sans Devanagari",
  },
  commonDataTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#132743",
    marginBottom: "8px",
    marginTop: "5",
    fontFamily: "Noto Sans Devanagari",
  },
  commonDataText: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#ff7e67",
    marginBottom: "12px",
    fontFamily: "Noto Sans Devanagari",
  },
  commonDataTextName: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#a55233",
    marginBottom: "12px",
    fontFamily: "Noto Sans Devanagari",
  },
  contactLastSection: {
    marginVertical: 10,
    backgroundColor: "#e0ffcd",
    padding: "5",
  },
  contactLastRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  contactLastInfo: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },
  contactLastLink: {
    color: "#007BFF",
    textDecoration: "underline",
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "10px",
  },
  signatureBox: {
    flex: "1 1 calc(33.33% - 15px)",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "30px",
    backgroundColor: "#fefefe",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  signatureText: {
    fontSize: "12px",
    color: "#333",
    lineHeight: "1.4",
  },
  signatureName: {
    fontWeight: "bold",
    color: "#000",
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    position: "relative",
    fontFamily: "Noto Sans Devanagari",
  },
  label: {
    width: 124,
    fontSize: 10,
    textAlign: "right",
    marginRight: 10,
    marginTop: 12,
    color: "#1f246e",
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  bar: {
    backgroundColor: "#8DCBE6",
    borderColor: "red",
    borderRadius: 20,
    border: 2,
    height: 15,
  },
  value: {
    width: 1,
    fontSize: 2,
    textAlign: "center",
    color: "black",
  },
  valueText: {
    position: "relative",
    left: 5,
    color: "#fff",
    fontSize: 4,
  },
  
});

const {
  reportPDF,
  message,
  assessmentSummary,
  detailedMindMappingReport,
  commonData,
} = reportData;


const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust the age if the current month is before the birth month, or it's the same month but the day hasn't occurred yet
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
// Create the PDF document
const MarathiReport= () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const dateOfBirth = userData?.dateOfBirth; // Assuming dateOfBirth is saved in this key

  const age = calculateAge(dateOfBirth);
  
  const [contentData, setContentData] = useState([]);
  const [completedTest, setCompletedTest] = useState(0);
  const [examDate, setExamDate] = useState([]);

  const [adjustmentPercentage, setAdjustmentPercentage] = useState(10); // Example percentage
  const [attentionPercentage, setAttentionPercentage] = useState(70); // Example percentage
  const [percentageSelf, setPercentageSelf] = useState(60);
  const [percentageStudy, setPercentageStudy] = useState(70);
  const [percentageDEP, setPercentageDEP] = useState(80);
  const [percentageANX, setPercentageANX] = useState(50);
  const [percentageSTRESS, setPercentageSTRESS] = useState(40);
  const [percentageTIME, setPercentageTIME] = useState();
  const [percentageSLEEP, setPercentageSLEEP] = useState(75);
  const [percentageCOPING, setPercentageCOPING] = useState(85);

  const [adjustmentContent, setAdjustmentContent] = useState([]);
  const [attentionContent, setAttentionContent] = useState([]);
  const [Financial, setSelfContent] = useState([]);
  const [genderEquality, setStudyContent] = useState([]);
  const [depContent, setDepContent] = useState([]);
  const [anxContent, setAnxContent] = useState([]);
  const [stressContent, setStressContent] = useState([]);
  const [timeContent, setTimeContent] = useState([]);
  const [UpskillGrowth, setSleepContent] = useState([]);
  const [copingContent, setCopingContent] = useState([]);

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch content data
    axios 
      .get(`${apiUrl}/reportContent/get-reportContent`)
      .then((response) => {
        setContentData(response.data);
      });

    // const userId = "OLLATOPSU2827";
    const userId = userData.userId;
    const baseUrl = `${apiUrl}/reports/get-detailed-report`;

    // Concatenate the base URL with the user ID
    const url = `${baseUrl}${userId}`;
    // Fetch advertisements  OLLATOPSU2827

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setPercentageTIME(response.data[0].time_management);
          setAttentionPercentage(response.data[0].work_life_balance);
          setPercentageSTRESS(response.data[0].stress);
          setPercentageANX(response.data[0].anxiety);
          setPercentageDEP(response.data[0].depression);
          setPercentageCOPING(response.data[0].coping_mechanisms);
          setAdjustmentPercentage(response.data[0].health_issues);
          setPercentageSelf(response.data[0].financial_stress);
          setPercentageStudy(response.data[0].gender_equality);
          setPercentageSLEEP(response.data[0].upskilling);
          setCompletedTest(response.data[0].completedTest);
          setExamDate(response.data[0].exam_date);
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          // alert();
        }
      });

    axios.get(url).then((response) => {
      if (response.status === 200 && response.data) {
        setPercentageTIME(response.data[0].time_management);
        setAttentionPercentage(response.data[0].work_life_balance);
        setPercentageSTRESS(response.data[0].stress);
        setPercentageANX(response.data[0].anxiety);
        setPercentageDEP(response.data[0].depression);
        setPercentageCOPING(response.data[0].coping_mechanisms);
        setAdjustmentPercentage(response.data[0].health_issues);
        setPercentageSelf(response.data[0].financial_stress);
        setPercentageStudy(response.data[0].gender_equality);
        setPercentageSLEEP(response.data[0].upskilling);
        setCompletedTest(response.data[0].completedTest);
      }
    });
  }, []);

  const processData = (percentage, domain) => {
    return contentData.filter((item) => {
      // console.log(`Filtered data for domain: ${domain}, percentage: ${percentage}`);
      if (percentage >= 81 && percentage <= 100) {
        return item.domain === domain && item.response === "excellent";
      }
      if (percentage >= 51 && percentage <= 80) {
        return item.domain === domain && item.response === "good";
      }
      if (percentage >= 41 && percentage <= 50) {
        return item.domain === domain && item.response === "moderate";
      }
      if (percentage >= 21 && percentage <= 40) {
        return item.domain === domain && item.response === "concern";
      }
      if (percentage >= 1 && percentage <= 20) {
        return item.domain === domain && item.response === "serious";
      }
      return item.domain === domain && item.response === "no Data";
    });
  };

  useEffect(() => {
    // Process data for each category
    setAdjustmentContent(processData(adjustmentPercentage, "adjustment"));
    setAttentionContent(processData(attentionPercentage, "attention"));
    setSelfContent(processData(percentageSelf, "self"));
    setStudyContent(processData(percentageStudy, "study"));
    setDepContent(processData(percentageDEP, "depression"));
    setAnxContent(processData(percentageANX, "anxiety"));
    setStressContent(processData(percentageSTRESS, "stress"));
    setTimeContent(processData(percentageTIME, "time"));
    setSleepContent(processData(percentageSLEEP, "sleep"));
    setCopingContent(processData(percentageCOPING, "coping"));
  }, [
    contentData,
    adjustmentPercentage,
    attentionPercentage,
    percentageSelf,
    percentageStudy,
    percentageDEP,
    percentageANX,
    percentageSTRESS,
    percentageTIME,
    percentageSLEEP,
    percentageCOPING,
  ]);

  // Data for the bar graph
  const data = [
    { label: "वेळ व्यवस्थापन", value: percentageTIME },
    { label: "काम-जीवन संतुलन", value: attentionPercentage },
    { label: "ताण व्यवस्थापन", value: percentageSTRESS },
    { label: "आत्मसंतोष", value: percentageANX },
    { label: "उदासी", value: percentageDEP },
    { label: "समायोजन यंत्रणा", value: percentageCOPING },
    { label: "शारीरिक आरोग्य समस्या", value: adjustmentPercentage },
    { label: "आर्थिक ताण", value: percentageSelf },
    { label: "लिंग समानता", value: percentageStudy },
    { label: "कौशल्य विकास", value: percentageSLEEP },
];

  // Max value for scaling
  const maxValue = Math.max(...data.map((d) => d.value));

  const result = completedTest;
  console.log("Completed Test ", result);
// const [examDate, setExamDate] = useState([]);

  return (
    <Document>
       {result === 0 ? (
        <FirstPage />
      ) : (
        <>
       <Page style={styles.page} size={"A4"}>
            {/* Header Section */}
            <View style={styles.header}>
              <Image source={companyLogo} style={styles.logo} />
              <Text style={styles.title}>{reportPDF.headerTitle}</Text>
            </View>

            <View style={styles.header}>
              <Image source={coverImg} style={styles.cover} />
              <Text style={styles.title}>Ollato Eduversity</Text>
              <Text style={styles.contact}>
                618, Nirmal Corporate Centre, LBS Road, Mulund West{"\n"}
                Email: info@ollato.com / info@seracedu.com{"\n"}
                Contact: 9967153285. Website: ollato.com
              </Text>
            </View>
          </Page>

           {/*----------------------------- Second Page ---------------------------------*/}
           <Page size="A4" style={styles.page}>
            <View style={styles.headers}>
              <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Field</Text>
                  <Text style={styles.tableCell}>Details</Text>
                </View>
                {/* Table Rows */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Client ID</Text>
                  <Text style={styles.tableCell}>
                    {userData ? userData.userId : "userId is not available"}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Name</Text>

                  <Text style={styles.tableCell}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Age</Text>
                  <Text style={styles.tableCell}>{age}</Text>
                </View>
                {/* <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Gender</Text>
                  <Text style={styles.tableCell}>
                    {userData ? userData.gender : "gender is not available"}
                  </Text>
                </View> */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Date of Assessment</Text>
                  <Text style={styles.tableCell}>
                    {examDate || "Date Not Available"}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Email</Text>
                  <Text style={styles.tableCell}>
                    {userData ? userData.email : "email is not available"}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Phone</Text>
                  <Text style={styles.tableCell}>
                    {userData ? userData.phone : "phone is not available"}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Role</Text>
                  <Text style={styles.tableCell}>
                    {userData ? userData.role : "phone is not available"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 01
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>

          {/*---------------------------- Third Page -----------------------------------*/}
          <Page size="A4" style={styles.page}>
            {/* Message Section */}
            <View style={styles.messageSection}>
              <Text style={[styles.greeting, { textAlign: "left" }]}>
                Dear {userData ? userData.name : "name is not available"},
              </Text>

              <Text style={styles.message}>{message.congratulations}</Text>
              <Text style={styles.message}>{message.programIntroduction}</Text>
              <Text style={styles.message}>{message.comprehensivePathway}</Text>
              <View style={styles.header}>
                <Image source={secondImg} style={styles.second} />
              </View>
              <View style={[styles.closingContainer, { textAlign: "right" }]}>
                <Text style={styles.closing}>{message.closing}</Text>
                <Text style={styles.signature}>{message.signature}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 02
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>

            {/*---------------------------------- Page 04 -----------------------------------*/}
            <Page size="A4" style={styles.page}>
            {/* Message Section */}
            <View style={styles.messageSection}>
              <Text style={[styles.greeting, { textAlign: "left" }]}>
                Dear {userData ? userData.name : "name is not available"},
              </Text>

              <Text style={styles.message}>
                {assessmentSummary.introduction}
              </Text>
              <Text style={styles.reportTitle}>मूल्यांकनाचे परिणाम:</Text>

              {/* Table Header */}
              <View style={styles.summeryTable}>
                <View style={styles.summeryTableRow}>
                  <Text
                    style={[styles.summeryTableCell, styles.summeryTableHeader]}
                  >
                    Sr. No.
                  </Text>
                  <Text
                    style={[styles.summeryTableCell, styles.summeryTableHeader]}
                  >
                    Domains
                  </Text>
                  <Text
                    style={[styles.summeryTableCell, styles.summeryTableHeader]}
                  >
                    Score
                  </Text>
                </View>

                {/* Table Rows */}
                {data.map((item, index) => (
                  <View style={styles.summeryTableRow} key={index}>
                    <Text style={styles.summeryTableCell}>{index + 1}</Text>
                    <Text style={styles.summeryTableCell}>{item.label}</Text>
                    <Text style={styles.summeryTableCell}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 03
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>

             {/*---------------------------------- Page 04  -----------------------------------*/}
             <Page style={styles.page}>
            <View style={styles.graphContainer}>
              <Text style={styles.message}>{detailedMindMappingReport.title} </Text>

              <Text style={styles.message}>
                {detailedMindMappingReport.description}
              </Text>
            </View>

            <View>
              <Text style={styles.message}>{detailedMindMappingReport.detailedDiscussion}</Text>
            </View>

            <View style={styles.chartContainerBar}>
              <Text style={styles.title}>PSU Client Score - ग्राफ</Text>
              {data.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                  {/* Label */}
                  <Text style={styles.label}>{item.label}</Text>
                  {/* Bar */}
                  <View style={styles.progressBarContainerGraph}>
                    <View
                      style={[
                        styles.bar,
                        {
                          width: `${(item.value / maxValue) * 100}%`, // Scale width
                        },
                      ]}
                    />
                    {/* Value */}
                    <Text
                      style={{
                        position: "absolute",
                        marginLeft: "10px",
                        marginTop: "2px",
                        color: "red",
                        fontSize: "9px",
                      }}
                    >
                      {item.value}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 04
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>

          {/*------------------------------Page  05 -------------------------------------*/}
          <Page size="A4" style={styles.page}>
            {/* Message Section */}
            <View style={styles.messageSection}>
              <Text style={[styles.greeting, { textAlign: "left" }]}>
                Note:
              </Text>
              <Text style={styles.message}>{message.note}</Text>
              <Text style={styles.message}>{message.reportUsage}</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 05
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>

            {/*----------------- Page 05 Time Management Seventh Page ---------------------*/}
            {timeContent && timeContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {timeContent[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {timeContent[0].welcomeNote || "Domain Name Not Available"}
                  </Text>
                </View>

                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {timeContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 06
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>Time Management Data Not Available</Text>
          )}

           {/* ========================= Page 06  Work Life Balance ================================ */}

           {attentionContent && attentionContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {attentionContent[0].domain ||
                        "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {attentionContent[0].welcomeNote ||
                      "Domain Name Not Available"}
                  </Text>
                </View>

                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {attentionContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 07
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>Adjustment Data Not Available</Text>
          )}


          {/* ================================= Page 06  Work Life Balance ====================================================== */}

          {attentionContent && attentionContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {attentionContent[0].domain ||
                        "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {attentionContent[0].welcomeNote ||
                      "Domain Name Not Available"}
                  </Text>
                </View>

                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {attentionContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 07
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>Adjustment Data Not Available</Text>
          )}

           {/* ================================= Page 8  Anxiety  Management ====================================================== */}

           {anxContent && anxContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {anxContent[0].domain || "Domain Name Not Available"}
                    </Text>
                    {/* <Text style={styles.domainName}>
                      {anxContent[0].reponse || "response Name Not Available"}
                    </Text> */}
                  </View>
                </View>
              </View>

              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {anxContent[0].welcomeNote || "Domain Name Not Available"}
                  </Text>
                </View>

                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {anxContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 09
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>AnxContent Data Not Available</Text>
          )}


            {/* ================================== Page 9  Depression Management          =============================================== */}

            {depContent && depContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {depContent[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {depContent[0].welcomeNote || "Domain Name Not Available"}
                  </Text>
                </View>
                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {depContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 10
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>DepContent Data Not Available</Text>
          )}

          {/* =====================================  Page 10  Coping Mechanism  ============================== */}

          {copingContent && copingContent.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {copingContent[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {copingContent[0].welcomeNote ||
                      "Domain Name Not Available"}
                  </Text>
                </View>
                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {copingContent.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 11
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>DepContent Data Not Available</Text>
          )}

            {/* ===================================== Page 12    Financial Stress   ============================== */}

            {Financial && Financial.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {Financial[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {Financial[0].welcomeNote || "Domain Name Not Available"}
                  </Text>
                </View>
                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {Financial.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 13
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>Financial Stress Data Not Available</Text>
          )}

          {/* ===================================== Page 13   Gender Equality   ============================== */}

          {genderEquality && genderEquality.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {genderEquality[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {genderEquality[0].welcomeNote ||
                      "Domain Name Not Available"}
                  </Text>
                </View>
                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {genderEquality.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 14
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>Gender Equality Data Not Available</Text>
          )}

          {/* ===================================== Page 14   UpskillGrowth Equality   ============================== */}

          {UpskillGrowth && UpskillGrowth.length > 0 ? (
            <Page style={styles.page} size="A4">
              {/* Render the header */}
              <View style={styles.ReportHeader}>
                <View style={styles.leftSection}>
                  <Image source={companyLogo} style={styles.reportLogo} />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.reportTitle}>
                      {reportPDF.headerTitle}
                    </Text>
                    <Text style={styles.domainName}>
                      {UpskillGrowth[0].domain || "Domain Name Not Available"}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Render all content */}
              <View style={styles.contentBox}>
                <View style={styles.contentBoxText}>
                  <Text style={styles.clientName}>
                    {userData ? userData.name : "name is not available"}
                  </Text>
                  <Text>
                    {UpskillGrowth[0].welcomeNote ||
                      "Domain Name Not Available"}
                  </Text>
                </View>
                <View style={styles.contentBoxFinding}>
                  <Text style={styles.domainTitle}>Key Findings</Text>
                  <Text style={styles.domainTitle}>Way Findings</Text>
                </View>

                {UpskillGrowth.map((item, index) => (
                  <View key={index} style={styles.reportSection}>
                    <View style={styles.leftColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.keyHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.keyContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.keycontentBox}>
                        <Text style={styles.keyFindingTitle}>
                          {item.wayHeading || "Key Heading Not Available"}
                        </Text>
                        <Text style={styles.keyFindingDescription}>
                          {item.wayContent || "Content Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - 15
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ) : (
            <Text>UpskillGrowth Data Not Available</Text>
          )}



           {/*---------------------------Page 15 Last Page  Common Data Section -----------------------------*/}
           <Page style={styles.page}>
            <View style={styles.commonData}>
              {/* Note Section */}
              {commonData.note && (
                <>
                  <Text style={styles.commonDataTitle}>Note:</Text>
                  <Text style={styles.commonDataText}>{commonData.note}</Text>
                </>
              )}
              {/* Letter Section */}
              <Text style={styles.commonDataTitle}>Letter:</Text>

              {
                <Text style={styles.clientName}>
                  {userData ? userData.name : "name is not available"}
                </Text>
              }

              {commonData.letter.content && (
                <Text style={styles.commonDataText}>
                  {commonData.letter.content}
                </Text>
              )}
              {/* Signatures Section */}
              <Text style={styles.commonDataTitle}>Signatures:</Text>
              <View style={styles.signatureContainer}>
                {commonData.signatures.map((signature, index) => (
                  <View key={index} style={styles.signatureBox}>
                    <Text style={styles.signatureName}>{signature.name}</Text>
                    <Text style={styles.signatureText}>{signature.title}</Text>
                    {signature.qualification && (
                      <Text style={styles.signatureText}>
                        {signature.qualification}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
              {/* Important Section */}
              <Text style={styles.commonDataTitle}>Important:</Text>
              <Text style={styles.commonDataText}>
                {commonData.important.note}
              </Text>
              <Text style={styles.commonDataText}>
                {commonData.important.disclaimer}
              </Text>
              <Text style={styles.commonDataText}>
                Email for Complaints: {commonData.important.complaintEmail}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text fixed style={styles.footerLeft}>
                {reportPDF.CompanyWebsite}
              </Text>
              <Text fixed style={styles.footerCenter}>
                Page - 16
              </Text>
              <Text fixed style={styles.footerRight}>
                {reportPDF.CompanyName}
              </Text>
            </View>
          </Page>
          </>
      )}
    </Document>
  );
};


export default MarathiReport;

