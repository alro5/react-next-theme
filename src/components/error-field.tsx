import React from 'react';

interface ErrorFieldProps {
  errorType: string;
  fieldName: string;
}

function getErrorMessage(fieldName: string, type: string) {
  switch (type) {
    case 'required':
      return `${fieldName} is required`
    case 'pattern':
      return `Invalid ${fieldName}`
  }
}

export function ErrorField(props: ErrorFieldProps): JSX.Element {

  const { fieldName, errorType } = props;
  const errorMessage = getErrorMessage(fieldName, errorType);

  return <div className="form__msg form__msg--error">
    {errorMessage}
  </div>
}