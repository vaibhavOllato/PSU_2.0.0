import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    flexDirection: "column",
    backgroundColor: "#fff",
    position: "relative",
    // justifyContent: "space-between",
    // padding: 20,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1, // Send background behind text
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    // width: "100%",
    // height: "100%",
    // marginTop:20,
  },
  backgroundImage: {
    width: "100%",
    height: "90%",
    // objectFit: "cover",
    // opacity: 0.1,
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    // backgroundColor:"#ececec",
    borderRadius: 5, // Rounded edges for a softer look
  },

  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    position: "relative",
    textAlign: "center",
    padding: 20,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "#5F1854",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Shadow for better visibility
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    color: "brown",
  },
  logo: {
    width: 180,
    height: 130,
  },
  cover: {
    width: 450,
    height: 440,
  },
  listItem: {
    marginBottom: 5,
  },
  firstFooter: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Light background for the footer
    padding: 15,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 535,
  },
  firstContact: {
    fontSize: 12,
    color: "#333", // Dark text color for better contrast
    textAlign: "center",
  },
  contact: {
    fontSize: 12,
    textAlign: "center",
    // marginBottom: 20,
    color: "#fff", // White text for readability
    lineHeight: 2,
  },
  details: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 2,
  },
  headers: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
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
    backgroundColor: "#247291",
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "Helvetica",
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
  graphContainer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#155263",
    marginTop: "15",
  },
  messageSection: {
    marginTop: 20,
    textAlign: "left",
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "brown",
  },
  message: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 10,
    marginTop: 10,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#83580b",
  },
  closingContainer: {
    marginTop: 20,
  },
  closing: {
    fontSize: 12,
    marginTop: 15,
    textAlign: "right",
  },
  signature: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "right",
  },
  second: {
    width: 450,
    height: 300,
  },
  qrCode: {
    width: 160,
    height: 150,
  },
  summaryTable: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    marginBottom: 20,
    marginTop: 10,
  },
  summaryTableRow: {
    flexDirection: "row",
  },
  summaryTableCell: {
    flex: 1,
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    textAlign: "center",
  },
  summaryTableHeader: {
    backgroundColor: "#247291",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
    width: 80,
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
    paddingRight: 10,
    // paddingLeft: 12,
    marginTop: -20,
  },
  contentBoxText: {
    fontSize: 12,
    // paddingRight: 12,
    // paddingLeft: 12,
    lineHeight: 1.3,
    marginTop: 1,
  },
  contentBoxFinding: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingLeft: 2,
    gap: 30,
    // backgroundColor:'red',
    marginLeft: 15,
  },
  reportSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "30",
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
    // backgroundColor: "#f95959",
    backgroundColor: "#247291",
    padding: 5,
    color: "white",
    width: 260,
  },
  keyFindingTitle: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    color: "purple",
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
    // border: 2,
    backgroundColor: "#eaf6f6",
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
  contactDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 10,
    backgroundColor: "brown",
    padding: "5",
  },
  contactItem: {
    marginHorizontal: 10,
    fontSize: 12,
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
    marginTop: 10,
    // width:100,
    // gap: 10, // Space between Domain Name & Score
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
  },
  commonDataTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#132743",
    marginBottom: "8px",
    marginTop: 5,
  },
  commonDataText: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#ff7e67",
    marginBottom: "12px",
  },
  commonDataTextName: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#a55233",
    marginBottom: "12px",
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
    padding: "8",
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
    // border: 2,
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

  scoreBox: {
    backgroundColor: "#e7eaf6", // Light grey background (Adjust color if needed)
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8, // Rounded corners
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    // marginTop:1,
    textAlign: "center",
  },
  container: {
    flexDirection: "row", // Ensures left and right are side by side
    justifyContent: "space-between", // Space between left & right
    alignItems: "center",
    padding: 10,
    width: "100%", // Ensures full width
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "50%", // Set width to prevent overlap
  },
  reportLogo: {
    width: 60,
    height: 50,
    marginRight: 10,
  },
  titleWrapper: {
    flexDirection: "column",
    textAlign: "left",
  },
  domainName: {
    fontSize: 12,
    color: "purple",
    textTransform: "capitalize",
  },
  rightSection: {
    width: "50%", // Ensures it stays visible
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  scoreBox: {
    backgroundColor: "#e7eaf6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  reportSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch", // Ensures both columns stretch equally
    flexWrap: "wrap", // Prevents overlapping when content is large
    width: "100%",
    gap: 10,
    // marginBottom: 5,
  },
  leftColumn: {
    flex: 1, // Takes equal space
    padding: 3,
    borderRadius: 8,
    alignItems: "stretch", // Ensures content stretches properly
  },
  rightColumn: {
    flex: 1, // Takes equal space
    padding: 3,
    borderRadius: 8,
    alignItems: "stretch", // Ensures content stretches properly
  },
  keyContentBox: {
    padding: 8,
    marginVertical: 3,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "red",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#eaf6f6",
    width: "100%", // Prevents overlap by forcing full width
    flexGrow: 1, // Ensures all boxes grow equally
  },
  keyFindingTitle: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    color: "purple",
    marginBottom: 3,
  },
  keyFindingDescription: {
    fontSize: 11,
    textAlign: "justify",
    // lineHeight: 14,
    color: "#000",
  },

  // last page of report styles sheet
  finalMessage: {
    marginTop: 12,
    fontSize: 14,
    color: "#333",
    // lineHeight: 20,
  },

  finalNoteBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },

  finalNoteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },

  finalNoteText: {
    fontSize: 14,
    color: "#4B5563",
    // lineHeight: 20,
  },

  footerBox: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  barContainer: {
    marginBottom: 10,
  },

  progressBarContainerGraph: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
    height: 20,
  },

  bar: {
    backgroundColor: "#4caf50",
    height: "100%",
  },

  valueText: {
    marginLeft: 5,
    color: "#000",
  },
  barContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBarContainerGraph: {
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row", // ensures horizontal layout
  },
  bar: {
    backgroundColor: "#3b82f6",
    height: "100%",
  },
  valueText: {
    marginTop: 4,
    fontSize: 12,
    color: "#000",
  },
  graphRow: {
    marginBottom: 24,
  },
  graphLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1f2937", // dark gray
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  barBackground: {
    flex: 1,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e5e7eb", // light gray
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#3b82f6", // blue
    // Optional gradient look with two-tone color
    // backgroundColor: 'linear-gradient(to right, #3b82f6, #60a5fa)',
  },
  graphValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 10,
    width: 50,
    textAlign: "right",
  },

  graphContainer: {
    padding: 16,
    backgroundColor: "#f9fafe",
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  graphRow: {
    marginBottom: 20,
  },
  graphLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  barBackground: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  barFill: {
    height: "100%",
    backgroundColor: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)", // won't work natively, use workaround below
    backgroundColor: "#4facfe", // fallback solid color
    borderRadius: 10,
  },
  graphValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    minWidth: 40,
  },

  headerSection: {
    // marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "brown",
    marginBottom: 6,
  },
  headerDescription: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    maxWidth: 300,
  },
});

export default styles;
