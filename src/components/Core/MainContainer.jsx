export default function MainContainer({ children }) {
  return (
    <main
      style={{
        width: '100%',
        height: '100vh',
        marginTop: '80px',
      }}
    >
      {children}
    </main>
  )
}
