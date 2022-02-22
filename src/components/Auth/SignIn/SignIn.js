import { useState } from 'react';
import AuthLayout from 'components/Auth/AuthLayout';
import SignInEmail from 'components/Auth/SignIn/SignInEmail';
import SignInPassword from 'components/Auth/SignIn/SignInPassword';
import { signInTemplates } from 'constants/constants';

function PageSignIn() {
  const [template, setTemplate] = useState(signInTemplates.signInEmail);
  const [email, setEmail] = useState(null);

  const renderTemplate = (template) => {
    switch (template) {
      case signInTemplates.signInEmail:
        return <SignInEmail email={email} setEmail={setEmail} setTemplate={setTemplate} />;
      case signInTemplates.signInPassword:
        return <SignInPassword email={email} setEmail={setEmail} setTemplate={setTemplate} />;
      default:
        return <SignInEmail email={email} setEmail={setEmail} setTemplate={setTemplate} />;
    }
  };

  return <AuthLayout>{renderTemplate(template)}</AuthLayout>;
}

export default PageSignIn;
