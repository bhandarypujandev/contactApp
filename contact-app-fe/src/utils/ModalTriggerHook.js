import { useState } from 'react';

export const useModalTrigger = () => {
  const [show, setShow] = useState(false);
  const handleModalTrigger = value => setShow(value);

  return { show, handleModalTrigger };
};
