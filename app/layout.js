export const metadata = {
  title: "HR To Do List",
  description: "간단한 HR 업무용 To Do 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
