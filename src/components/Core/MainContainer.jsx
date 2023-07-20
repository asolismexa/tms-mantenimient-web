export default function MainContainer({ children }) {
  return (
    <main
      style={{
        width: '100%',
        backgroundColor: '#000',
      }}
    >
      {children}
    </main>
  )
}
