import * as React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []); 

  if (!isVisible) return null;

  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
    Please do not hit the API repeatedly. Excessive requests may lead to rate limiting or temporary suspension of access.
    </Alert>
  );
}