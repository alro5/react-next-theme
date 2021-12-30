import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  onCloseRequest: () => void
}

export function Modal(props: PropsWithChildren<ModalProps>): JSX.Element {

  const { children, onCloseRequest } = props;

  return <ReactModal
    isOpen
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    appElement={document.body}>
    <button onClick={onCloseRequest}>Close</button>
    {children}
  </ReactModal>
}