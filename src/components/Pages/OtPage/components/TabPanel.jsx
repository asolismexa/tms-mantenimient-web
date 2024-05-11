export default function TabPanel({ children, tab, index }) {
  return <div hidden={tab !== index}>{children}</div>
}
