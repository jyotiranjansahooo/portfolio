// This component will automatically be shown while the data for the route's 
// page.js is being fetched/rendered.

export default function Loading() {
  return (
    // The container should cover the area where content is loading
    <div style={styles.container}>
      <div style={styles.spinnerContainer}>
        {/* The Animated Ring Spinner */}
        <div style={styles.spinner}></div>
        <p style={styles.text}>Loading Content...</p>
      </div>

      {/* --- CSS Keyframes for Animation --- */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// Inline Styles for simplicity in a quick example
const styles = {
  container: {
    // Center the content on the entire screen/view
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    backgroundColor: '#f9fafb', // Light grey background
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  spinner: {
    // The ring shape
    width: '50px',
    height: '50px',
    border: '5px solid #e5e7eb', // Light grey border (the base)
    borderTopColor: '#10b981', // Green border (the animated part)
    borderRadius: '50%',
    animation: 'spin 1s linear infinite', // Apply the spin animation
  },
  text: {
    marginTop: '15px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'system-ui, sans-serif',
  }
};