import emailjs from '@emailjs/browser';

const mail_sender = async (recipientEmail, subject, text) => {
  const data = {
    service_id: 'service_sbucwll',
    template_id: 'template_h91nzbj',
    user_id: 'lZilIs5DgZwqdjJjQ',
    template_params: {
      to_name: recipientEmail.split('@')[0],
      to_email: recipientEmail,
      subject: subject,
      message: text
    }
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost:3000'
      },
      body: JSON.stringify(data)
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (response.ok) {
      console.log('ईमेल सफलतापूर्वक भेजा गया');
      return true;
    } else {
      throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
    }
  } catch (error) {
    console.error('ईमेल भेजने में त्रुटि:', error);
    throw error;
  }
};

export default mail_sender;