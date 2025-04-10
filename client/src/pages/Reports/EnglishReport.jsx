import React, { useState, useEffect } from "react";
import companyLogo from "../../assets/companyLogo.png";
import coverImg from "../../assets/cover.png";
// import qrImg from "../../assets/qr-code.png";
import secondImg from "../../assets/secondImgs.png";
import reportData from "../../public/reportData.json";
import axios from "axios";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import FirstPage from "../../constant/FirstPage";
import styles from "./reportEnglishStyles";

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

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const EnglishReport = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const dateOfBirth = userData?.dateOfBirth; // Assuming dateOfBirth is saved in this key

  const age = calculateAge(dateOfBirth);

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const [contentData, setContentData] = useState([]);
  const [completedTest, setCompletedTest] = useState(0);
  const [examDate, setExamDate] = useState("");

  const [assessmentScores, setAssessmentScores] = useState(null);
  const [reportContent, setReportContent] = useState([]);

  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0); // Example percentage
  const [attentionPercentage, setAttentionPercentage] = useState(0); // Example percentage
  const [percentageSelf, setPercentageSelf] = useState(0);
  const [percentageStudy, setPercentageStudy] = useState(0);
  const [percentageDEP, setPercentageDEP] = useState(0);
  const [percentageANX, setPercentageANX] = useState(0);
  const [percentageSTRESS, setPercentageSTRESS] = useState(0);
  const [percentageTIME, setPercentageTIME] = useState(0);
  const [percentageSLEEP, setPercentageSLEEP] = useState(0);
  const [percentageCOPING, setPercentageCOPING] = useState(0);

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

  // Fetch data when userData is available
  useEffect(() => {
    if (!userData) return;

    // Fetch assessment scores
    axios
      .post(`${apiUrl}/api/scoring/get-user-score`, {
        user_id: userData.userId,
        panel_name: "psu",
        role: userData.role,
        lang: "en",
      })
      .then((response) => {
        const assessmentData = response.data.results;
        if (!assessmentData || assessmentData.length === 0) {
          console.error("No assessment data found.");
          return;
        }
        const latestAssessment = assessmentData[assessmentData.length - 1];
        console.log("✅ Latest assessment fetched:", latestAssessment);

        // Parse and set all scores
        setPercentageTIME(parseInt(latestAssessment?.time_management ?? "0"));
        setAttentionPercentage(
          parseInt(latestAssessment?.work_life_balance ?? "0")
        );
        setPercentageSTRESS(parseInt(latestAssessment?.stress ?? "0"));
        setPercentageANX(parseInt(latestAssessment?.anxiety ?? "0"));
        setPercentageDEP(parseInt(latestAssessment?.depression ?? "0"));
        setPercentageCOPING(
          parseInt(latestAssessment?.coping_mechanisms ?? "0")
        );
        setAdjustmentPercentage(
          parseInt(latestAssessment?.health_issues ?? "0")
        );
        setPercentageSelf(parseInt(latestAssessment?.financial_stress ?? "0"));
        setPercentageStudy(parseInt(latestAssessment?.gender_equality ?? "0"));
        setPercentageSLEEP(parseInt(latestAssessment?.upskilling ?? "0"));

        setExamDate(latestAssessment.exam_date || "");
        setAssessmentScores(latestAssessment);
      })
      .catch((error) => console.error("Error fetching scores:", error));

    // Fetch report content
    axios
      .get(`${apiUrl}/api/assessment/report/psu/en/${userData.role}`)
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.data)) {
          console.log("Report Content Response:", response.data.data);
          setReportContent([...response.data.data]);
        } else {
          console.error("Invalid data structure:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching report:", error));
  }, []);

  // Debugging reportContent updates
  useEffect(() => {
    console.log(
      "Updated reportContent:",
      JSON.stringify(reportContent, null, 2)
    );
  }, [reportContent]);

  const processData = (percentage, domain) => {
    const numPercentage = Number(percentage); // Convert to number

    return reportContent.filter((item) => {
      if (numPercentage >= 81)
        return item.domain === domain && item.response === "excellent";
      if (numPercentage >= 51)
        return item.domain === domain && item.response === "good";
      if (numPercentage >= 41)
        return item.domain === domain && item.response === "moderate";
      if (numPercentage >= 21)
        return item.domain === domain && item.response === "concern";
      if (numPercentage >= 1)
        return item.domain === domain && item.response === "serious";
      return item.domain === domain && item.response === "no Data";
    });
  };

  // Update content after reportContent is set
  useEffect(() => {
    if (reportContent.length === 0) return;
    console.log("Updating category contents...");
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
    reportContent,
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
    { label: "Time Management", value: percentageTIME },
    { label: "Work-Life Balance", value: attentionPercentage },
    { label: "Stress Management", value: percentageSTRESS },
    { label: "Anxiety", value: percentageANX },
    { label: "Depression", value: percentageDEP },
    { label: "Coping Mechanism", value: percentageCOPING },
    { label: "Physical Health Issue", value: adjustmentPercentage },
    { label: "Financial Stress", value: percentageSelf },
    { label: "Gender Equality", value: percentageStudy },
    { label: "Up-Skilling", value: percentageSLEEP },
  ];

  console.log(
    "Report content domains:",
    reportContent.map((item) => item.domain)
  );
  console.log(
    "Checking responses:",
    reportContent.map((item) => item.response)
  );
  const timeConten = data.map((item) => {
    console.log(item);

    item.label;
  });
  console.log("Time Content:", timeConten);

  console.log("Data Structure:", data);
  console.log("self content", timeContent);
  console.log("motivation", adjustmentContent);
  console.log("stress content", stressContent);
  console.log("focus content", attentionContent);
  console.log("resilience content", Financial);
  console.log("adapati content", genderEquality);
  console.log("emaoti content", depContent);
  console.log("test anxi content", anxContent);
  console.log("test anxi content", stressContent);
  console.log("time content", timeContent);

  console.log("time content", UpskillGrowth);
  console.log("time content", copingContent);

  console.log(
    "Checking percentages:",
    percentageSelf,
    percentageTIME,
    attentionPercentage,
    percentageSTRESS,
    percentageANX,
    percentageDEP,
    percentageCOPING,
    adjustmentPercentage,
    percentageStudy,
    percentageSLEEP
  );

  // const maxValue = Math.max(...(data.map((d) => d.value) || 0));
  // const maxValue = Math.max(...data.map(d => d.value || 0));
  const maxValue = Math.max(...data.map((d) => Number(d.value) || 0));

  // const result = completedTest;
  const result = 1;

  const colors = ["#FFDDC1", "#C1E1C1", "#C1D4E1", "#E1C1D4"];

  return (
    <>
      {result === 0 ? (
        <Document>
          <FirstPage />
        </Document>
      ) : (
        <Document>
          {[...Array(16)].map((_, pageIndex) => (
            <Page key={pageIndex} style={styles.page} size="A4">
              {pageIndex === 0 && (
                <>
                  <View style={styles.backgroundContainer}>
                    <Image source={coverImg} style={styles.backgroundImage} />
                    <View style={styles.overlay} />
                  </View>
                  <View style={styles.content}>
                    <Text style={[styles.title, { fontWeight: "700" }]}>
                      {reportPDF.headerTitle || "Sample Title"}
                    </Text>
                  </View>
                  <View style={styles.firstFooter}>
                    <Text style={styles.firstContact}>
                      618, Nirmal Corporate Centre, LBS Road, Mulund West{"\n"}
                      Email: info@ollato.com / info@seracedu.com{"\n"}
                      Contact: 9967153285. Website: ollato.com
                    </Text>
                  </View>
                </>
              )}

              {pageIndex === 1 && (
                <View style={styles.headers}>
                  <Text style={[styles.greeting, { textAlign: "left" }]}>
                    Client details:
                  </Text>
                  <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <Text style={styles.tableCell}>Field</Text>
                      <Text style={styles.tableCell}>Details</Text>
                    </View>
                    {/* Table Rows */}
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Student ID</Text>
                      <Text style={styles.tableCell}>
                        {userData ? userData.userId : "userId is not available"}
                      </Text>
                    </View>
                    {/* <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Name</Text>

                    <Text style={styles.tableCell}>
                      {userData ? userData.name : "name is not available"}
                    </Text>
                  </View> */}
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Name</Text>
                      <Text style={styles.tableCell}>
                        {userData
                          ? `${userData.first_name} ${userData.last_name}`
                          : "Name is not available"}
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
                      <Text style={styles.tableCell}>Gender</Text>
                      <Text style={styles.tableCell}>
                        {userData ? userData.gender : "gender is not available"}
                      </Text>
                    </View>

                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Phone</Text>
                      <Text style={styles.tableCell}>
                        {userData ? userData.phone : "phone is not available"}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Email</Text>
                      <Text style={styles.tableCell}>
                        {userData ? userData.email : "email is not available"}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Role</Text>
                      <Text style={styles.tableCell}>
                        {userData ? userData.role : "role is not available"}
                      </Text>
                    </View>

                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Date of Assessment</Text>
                      <Text style={styles.tableCell}>
                        {examDate && !isNaN(new Date(examDate).getTime())
                          ? new Date(examDate).toLocaleDateString("en-GB")
                          : "Date Not Available"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {pageIndex === 2 && (
                <View style={styles.messageSection}>
                  <Text style={[styles.greeting, { textAlign: "left" }]}>
                    Dear {userData?.first_name || "Name Not Available"},
                  </Text>
                  <Text style={styles.message}>
                    {message.comprehensivePathway}
                  </Text>
                  <View style={styles.header}>
                    <Image source={secondImg} style={styles.second} />
                  </View>
                  <View
                    style={[styles.closingContainer, { textAlign: "right" }]}
                  >
                    <Text style={styles.closing}>{message.closing}</Text>
                    <Text style={styles.signature}>{message.signature}</Text>
                  </View>
                </View>
              )}

              {pageIndex === 3 && (
                <View style={styles.messageSection}>
                  <Text style={[styles.greeting, { textAlign: "left" }]}>
                    Dear {userData?.first_name || "Name Not Available"},
                  </Text>
                  <Text style={styles.message}>
                    {assessmentSummary.introduction}
                  </Text>
                  <Text style={styles.reportTitle}>Assessment Results</Text>

                  {/* Table Section */}
                  <View style={styles.summaryTable}>
                    {/* Table Header */}
                    <View style={styles.summaryTableRow}>
                      <Text
                        style={[
                          styles.summaryTableCell,
                          styles.summaryTableHeader,
                        ]}
                      >
                        Sr. No.
                      </Text>
                      <Text
                        style={[
                          styles.summaryTableCell,
                          styles.summaryTableHeader,
                        ]}
                      >
                        Domains
                      </Text>
                      <Text
                        style={[
                          styles.summaryTableCell,
                          styles.summaryTableHeader,
                        ]}
                      >
                        Score
                      </Text>
                    </View>

                    {/* Table Data */}
                    {data.map((item, index) => (
                      <View key={index} style={styles.summaryTableRow}>
                        <Text style={styles.summaryTableCell}>{index + 1}</Text>
                        <Text style={styles.summaryTableCell}>
                          {item.label}
                        </Text>
                        <Text style={styles.summaryTableCell}>
                          {item.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* {pageIndex === 4 && (
                <View style={styles.graphContainer}>
                  <Text style={styles.subTitle}>
                    {detailedMindMappingReport.title}
                  </Text>
                  {data.map((item, index) => {
                    const barWidth = `${
                      (Number(item.value) / maxValue) * 100
                    }%`;
                    return (
                      <View key={index} style={styles.graphRow}>
                        <Text style={styles.graphLabel}>{item.label}</Text>
                        <View style={styles.barWrapper}>
                          <View style={styles.barBackground}>
                            <View
                              style={[styles.barFill, { width: barWidth }]}
                            />
                          </View>
                          <Text style={styles.graphValue}>{item.value}%</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )} */}

              {pageIndex === 4 && (
                <View style={styles.graphContainer}>
                  <View style={styles.headerSection}>
                    <Text style={styles.headerTitle}>Mind Mapping Report</Text>
                    <Text style={styles.headerDescription}>
                      Here's a visual breakdown of your performance across
                      different mind-mapping areas.
                    </Text>
                  </View>
                  {/* <Text style={styles.subTitle}>
                    {detailedMindMappingReport.title}
                  </Text> */}
                  {data.map((item, index) => {
                    const barWidth = `${
                      (Number(item.value) / maxValue) * 100
                    }%`;
                    return (
                      <View key={index} style={styles.graphRow}>
                        <Text style={styles.graphLabel}>{item.label}</Text>
                        <View style={styles.barWrapper}>
                          <View style={styles.barBackground}>
                            <View
                              style={[styles.barFill, { width: barWidth }]}
                            />
                          </View>
                          <Text style={styles.graphValue}>{item.value}%</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 5 && timeContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  {/* <View style={styles.leftSection}>
                    <Image source={companyLogo} style={styles.reportLogo} />
                    <View style={styles.titleWrapper}>
                      <Text style={styles.reportTitle}>
                        {reportPDF.headerTitle}
                      </Text>
                      <Text style={styles.domainName}>
                        {selfBeliefContent[0]?.domain ||
                          "Domain Name Not Available"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rightSection}>
                    <View style={styles.scoreBox}>
                      <Text style={styles.scoreText}>
                        Score: {percentageSelf ?? "Not Available"}
                      </Text>
                    </View>
                  </View> */}
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {timeContent[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageTIME ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {timeContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {timeContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 6 && attentionContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {attentionContent[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {attentionPercentage ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {attentionContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {attentionContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 7 && stressContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {stressContent[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageSTRESS ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {stressContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {stressContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 8 && anxContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {anxContent[0]?.domain || "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageANX ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {anxContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {anxContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 9 && depContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {depContent[0]?.domain || "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageDEP ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {depContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {depContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 10 && copingContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {copingContent[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageCOPING ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {copingContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {copingContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 11 && adjustmentContent?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {adjustmentContent[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {adjustmentPercentage ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {adjustmentContent[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {adjustmentContent.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 12 && Financial?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {Financial[0]?.domain || "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageSelf ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {Financial[0].welcomeNote || "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {Financial.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 13 && genderEquality?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {genderEquality[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageStudy ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {genderEquality[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {genderEquality.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {pageIndex === 14 && UpskillGrowth?.length > 0 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    {/* Left Section */}
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          {reportPDF.headerTitle}
                        </Text>
                        <Text style={styles.domainName}>
                          {UpskillGrowth[0]?.domain ||
                            "Domain Name Not Available"}
                        </Text>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View style={styles.rightSection}>
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          Score: {percentageSLEEP ?? "Not Available"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    {/* <Text style={styles.clientName}>
                      {userData ? userData.first_name : "Name Not Available"}
                    </Text> */}
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>

                    <Text>
                      {UpskillGrowth[0].welcomeNote ||
                        "Welcome Note Not Available"}
                    </Text>
                  </View>

                  <View style={styles.contentBoxFinding}>
                    <Text style={styles.domainTitle}>Key Findings</Text>
                    <Text style={styles.domainTitle}>Way of Improvement</Text>
                  </View>

                  {UpskillGrowth.map((item, index) => {
                    const rowColor = colors[index % colors.length]; // Retaining row color logic
                    return (
                      <View key={index} style={styles.reportSection}>
                        <View style={styles.leftColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.keyHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.keyContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rightColumn}>
                          <View
                            style={[
                              styles.keyContentBox,
                              { backgroundColor: rowColor },
                            ]}
                          >
                            <Text style={styles.keyFindingTitle}>
                              {item?.wayHeading || "Key Heading Not Available"}
                            </Text>
                            <Text style={styles.keyFindingDescription}>
                              {item?.wayContent || "Content Not Available"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {/* Last page of report */}
              {pageIndex === 15 && (
                <View style={styles.reportHeader}>
                  <View style={styles.container}>
                    <View style={styles.leftSection}>
                      <Image source={companyLogo} style={styles.reportLogo} />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.reportTitle}>
                          Assessment Summary
                        </Text>
                        <Text style={styles.domainName}>Thank You!</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contentBoxText}>
                    <Text style={styles.clientName}>
                      {userData
                        ? `${userData.first_name || ""} ${
                            userData.last_name || ""
                          }`.trim() || "Name Not Available"
                        : "Name Not Available"}
                    </Text>
                    <Text style={styles.finalMessage}>
                      We appreciate your participation in this assessment. We
                      hope the insights provided will help you in your personal
                      growth journey.
                    </Text>
                  </View>

                  <View style={styles.finalNoteBox}>
                    <Text style={styles.finalNoteTitle}>
                      Need Further Guidance?
                    </Text>
                    <Text style={styles.finalNoteText}>
                      If you’d like to talk to an expert, book a session through
                      our platform. Our team is here to support your
                      development.
                    </Text>
                  </View>

                  <View style={styles.footerBox}>
                    <Text style={styles.footerText}>
                      © {new Date().getFullYear()} Ollato Eduversity PVT,LTD.
                      All rights reserved.
                    </Text>
                  </View>
                </View>
              )}

              {/* FOOTER */}
              <View style={styles.footer}>
                <Text fixed style={styles.footerLeft}>
                  {reportPDF.CompanyWebsite}
                </Text>
                <Text fixed style={styles.footerCenter}>
                  Page - {pageIndex + 1}
                </Text>
                <Text fixed style={styles.footerRight}>
                  {reportPDF.CompanyName}
                </Text>
              </View>
            </Page>
          ))}
        </Document>
      )}
    </>
  );
};

export default EnglishReport;
