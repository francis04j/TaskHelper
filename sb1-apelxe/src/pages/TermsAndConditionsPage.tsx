import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>Welcome to TaskMaster. These Terms and Conditions govern your use of our website and services. By using TaskMaster, you agree to these terms. Please read them carefully.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
        <p>"TaskMaster" refers to our company, website, and services.</p>
        <p>"Users" refers to both Taskers (service providers) and Taskees (service seekers).</p>
        <p>"Tasks" refers to the services listed and performed through our platform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
        <p>To use TaskMaster, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
        <p>Users agree to use TaskMaster in compliance with all applicable laws and these Terms. Users must not engage in any unlawful or harmful activities on our platform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Tasks and Payments</h2>
        <p>Taskers are responsible for accurately describing their services and completing tasks as agreed. Taskees are responsible for providing accurate task details and making timely payments.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Fees and Payments</h2>
        <p>TaskMaster charges a service fee for each completed task. All payments are processed through our secure payment system.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Dispute Resolution</h2>
        <p>In case of disputes between users, TaskMaster will provide a resolution process. Users agree to cooperate in good faith to resolve any conflicts.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Liability Limitations</h2>
        <p>TaskMaster is not responsible for the quality, safety, or legality of listed tasks or the ability of users to complete tasks or make payments.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
        <p>TaskMaster reserves the right to terminate or suspend any user account for violations of these Terms or for any other reason at our discretion.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p>TaskMaster may modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the new Terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at support@taskmaster.com.</p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;