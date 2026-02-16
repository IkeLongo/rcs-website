import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  url: {
    fontSize: 12,
    marginBottom: 24,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scoreRow: {
    fontSize: 11,
    marginBottom: 4,
  },
  issueContainer: {
    marginBottom: 12,
  },
  issueTitle: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  issueFix: {
    fontSize: 10,
    color: '#444',
    marginLeft: 12,
  },
});

// Clean PDF for v1
export function SeoReportPdf({ scan }: { scan: any }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>SEO Fix Report</Text>
        <Text style={styles.url}>{scan.url}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.scoreRow}>Overall Grade: {scan.grade}</Text>
          <Text style={styles.scoreRow}>SEO Score: {scan.scores?.seo ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Performance Score: {scan.scores?.performance ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Best Practices: {scan.scores?.bestPractices ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Accessibility: {scan.scores?.accessibility ?? "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Issues to Fix</Text>
          {(scan.issues || []).map((issue: any, idx: number) => (
            <View key={idx} style={styles.issueContainer}>
              <Text style={styles.issueTitle}>
                {idx + 1}. {issue.title}
              </Text>
              <Text style={styles.issueFix}>Why it matters: {issue.why}</Text>

              {(issue.fix || []).map((s: string, i: number) => (
                <Text key={i} style={styles.issueFix}>• {s}</Text>
              ))}

              {(issue.verify || []).length ? (
                <>
                  <Text style={[styles.issueFix, { marginTop: 6 }]}>Verify:</Text>
                  {issue.verify.map((v: string, i: number) => (
                    <Text key={i} style={styles.issueFix}>• {v}</Text>
                  ))}
                </>
              ) : null}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}