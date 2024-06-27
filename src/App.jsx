import { useState } from "react";
import ContactForm from "./Components/ContactForm";
import SuccessMessage from "./Components/SuccessMessage";
import Footer from "./Components/Footer";

function App() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <main>
        {success && <SuccessMessage />}
        <ContactForm success={success} setSuccess={setSuccess} />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
