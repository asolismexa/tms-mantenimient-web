export default function MainContainer ({ children }) {
  return (
    <main
      style={{
        flex: 1,
        overflow: 'auto',
        padding: '.6rem'
      }}
    >
      {children}
    </main>
  )
}
