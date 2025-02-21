// ContactForm.js
import React, { useEffect } from 'react';
import "./Contact.css";
import withCursor from '../Cursor/Cursor';

const ContactForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="visme_d" 
         data-title="Classic Contact Form" 
         data-url="rxwkxv4n-classic-contact-form" 
         data-domain="forms" 
         data-full-page="false" 
         data-min-height="500px" 
         data-form-id="116028">
    </div>
  );
};

export default withCursor(ContactForm);
